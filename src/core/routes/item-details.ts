import { Request, Response } from 'express'
import { Icon, LocalizationText, Text } from 'sonolus-core'
import { ToItem } from '../../api/item'
import { ItemDetailsModel, toItemDetails } from '../../api/item-details'
import { SectionsModel } from '../../api/section/section'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemDetailsHandler<TSonolus extends SonolusBase, TDatabaseItem> = (
    sonolus: TSonolus,
    session: string | undefined,
    name: string,
) => Promisable<ItemDetailsModel<TDatabaseItem> | undefined>

export type DefaultItemDetailsHandler<T> = (
    sonolus: SonolusBase,
    session: string | undefined,
    name: string,
) => Promisable<ItemDetailsModel<T> | undefined>

export const defaultItemDetailsHandler = <
    T extends {
        name: string
        description: LocalizationText
    },
>(
    items: T[],
    name: string,
): ItemDetailsModel<T> | undefined => {
    const item = items.find((item) => item.name === name)
    if (!item) return undefined

    const index = items.indexOf(item)
    return {
        item,
        description: item.description,
        sections: [
            {
                title: { en: Text.Recommended },
                icon: Icon.Star,
                items: items.slice(index + 1, index + 6),
            },
        ],
    }
}

export const itemDetailsRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends SectionsModel,
    TDatabaseItem,
    TItem,
>(
    sonolus: TSonolus,
    { detailsHandler }: SonolusItemsConfig<TSonolus, TSearches, TDatabaseItem>,
    toItem: ToItem<TDatabaseItem, TItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    const name = req.params.name
    if (!name) {
        res.status(404).end()
        return
    }

    const details = await detailsHandler(sonolus, session, name)
    if (!details) {
        res.status(404).end()
        return
    }

    res.json(toItemDetails(sonolus, req.localize, toItem, details))
}
