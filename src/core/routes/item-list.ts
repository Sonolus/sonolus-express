import { Request, Response } from 'express'
import { ServerFormsModel } from '../../api/form/form'
import { parseSearchQuery } from '../../api/form/query'
import { ToItem } from '../../api/item'
import { ItemListModel, toItemList } from '../../api/item-list'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemListHandler<TSonolus extends SonolusBase, TQuery, TDatabaseItem> = (
    sonolus: TSonolus,
    session: string | undefined,
    query: TQuery,
    page: number,
) => Promisable<ItemListModel<TDatabaseItem>>

export type DefaultItemListHandler<T> = (
    sonolus: SonolusBase,
    session: string | undefined,
    query: Record<string, unknown>,
    page: number,
) => Promisable<ItemListModel<T>>

export const defaultItemListHandler = <T>(
    items: T[],
    filter: (items: T[], keywords: string) => T[],
    query: Record<string, unknown>,
    page: number,
): ItemListModel<T> => {
    const parsedQuery = parseSearchQuery(query, {})
    const filteredItems = filter(items, parsedQuery.keywords)

    return paginateItems(filteredItems, page)
}

export const itemListRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends ServerFormsModel,
    TDatabaseItem,
    TItem,
>(
    sonolus: TSonolus,
    { searches, listHandler }: SonolusItemsConfig<TSonolus, TSearches, TDatabaseItem>,
    toItem: ToItem<TDatabaseItem, TItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    res.json(
        toItemList(
            sonolus,
            req.localize,
            toItem,
            await listHandler(
                sonolus,
                session,
                parseSearchQuery(req.query, searches),
                +(req.query.page ?? '') || 0,
            ),
            searches,
        ),
    )
}

export const paginateItems = <T>(
    items: T[],
    page: number,
    perPage = 20,
): {
    pageCount: number
    items: T[]
} => ({
    pageCount: Math.ceil(items.length / perPage),
    items: items.slice(page * perPage, (page + 1) * perPage),
})

export type FilterItemsByKeyword<T> = (items: T[], keywords: string) => T[]

export const filterItemsByKeywords = <T>(items: T[], props: (keyof T)[], keywords: string): T[] => {
    const fullTerm = keywords.trim().toLowerCase()
    if (!fullTerm) return items

    const terms = fullTerm.split(' ')
    if (terms.length === 0) return items

    return items
        .map((item) => ({
            item,
            results: terms.map((term) => matchTerm(item, props, term)),
        }))
        .filter(({ results }) => results.every((result) => result > 0))
        .map(({ item, results }) => ({
            item,
            full: matchTerm(item, props, fullTerm),
            exacts: results.filter((result) => result === 2).length,
            partials: results.filter((result) => result === 1).length,
        }))
        .sort((a, b) => b.full - a.full || b.exacts - a.exacts || b.partials - a.partials)
        .map(({ item }) => item)
}

const matchTerm = <T>(item: T, keywordProps: (keyof T)[], term: string) => {
    let result = 0
    for (const prop of keywordProps) {
        const texts = getTexts(item[prop])

        for (const text of texts) {
            if (text === term) {
                result = 2
                break
            } else if (text.includes(term)) {
                result = 1
            }
        }
    }
    return result
}

const getTexts = (value: unknown): string[] => {
    switch (typeof value) {
        case 'number':
        case 'bigint':
        case 'boolean':
            return [`${value}`]
        case 'string':
            return [value.toLowerCase()]
        case 'object':
            if (!value) return []

            if (Array.isArray(value)) {
                return value.flatMap(getTexts)
            } else {
                return Object.values(value).flatMap(getTexts)
            }
        case 'symbol':
        case 'undefined':
        case 'function':
            return []
    }
}
