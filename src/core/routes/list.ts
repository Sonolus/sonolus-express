import { Request, Response } from 'express'
import { Query, SearchInfo } from '../..'
import { ToItem } from '../../api/item'
import { toList } from '../../api/list'
import { parseTextQuery } from '../../api/search/option/text'
import { parseQuery } from '../../api/search/query'
import { Promisable } from '../../utils/types'
import { ItemsConfig, Sonolus } from '../sonolus'

export type ListHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
    U
> = (
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
    query: T,
    page: number
) => Promisable<{
    pageCount: number
    infos: U[]
}>

export function defaultListHandler<T>(
    infos: T[],
    filter: (infos: T[], keywords: string) => T[],
    query: Record<string, unknown>,
    page: number
): {
    pageCount: number
    infos: T[]
} {
    const keywords = parseTextQuery(query.keywords)
    const filteredInfos = filter(infos, keywords)

    return paginateInfos(filteredInfos, page)
}

export async function listRouteHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T extends ItemsConfig,
    U,
    V
>(
    sonolus: Sonolus<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines
    >,
    handler: ListHandler<
        TLevels,
        TSkins,
        TBackgrounds,
        TEffects,
        TParticles,
        TEngines,
        Query<T['search']>,
        U
    >,
    toItem: ToItem<U, V>,
    search: SearchInfo,
    req: Request,
    res: Response
): Promise<void> {
    res.json(
        toList(
            sonolus.db,
            req.localize,
            await handler(
                sonolus,
                parseQuery(req.query, search),
                +(req.query.page || '') || 0
            ),
            toItem,
            search
        )
    )
}

export function paginateInfos<T>(
    infos: T[],
    page: number,
    perPage = 20
): {
    pageCount: number
    infos: T[]
} {
    return {
        pageCount: Math.ceil(infos.length / perPage),
        infos: infos.slice(page * perPage, (page + 1) * perPage),
    }
}

export function filterInfosByKeywords<T>(
    infos: T[],
    props: (keyof T)[],
    keywords: string
): T[] {
    const terms = keywords.trim().toLowerCase().split(' ')
    if (terms.length === 0) return infos

    return infos
        .map((info) => ({
            info,
            results: terms.map((term) => matchTerm(info, props, term)),
        }))
        .filter(({ results }) => results.every((result) => result > 0))
        .map(({ info, results }) => ({
            info,
            sum: results.reduce((sum, result) => sum + result, 0),
        }))
        .sort((a, b) => b.sum - a.sum)
        .map(({ info }) => info)
}

function matchTerm<T>(info: T, keywordProps: (keyof T)[], term: string) {
    let result = 0
    for (const prop of keywordProps) {
        const value = info[prop]

        let texts: string[]
        switch (typeof value) {
            case 'number':
                texts = [value.toString()]
                break
            case 'string':
                texts = [value.toLowerCase()]
                break
            case 'object':
                if (value) {
                    texts = Object.values(value).map((text) =>
                        text.toLowerCase()
                    )
                } else {
                    texts = []
                }
                break
            default:
                continue
        }

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
