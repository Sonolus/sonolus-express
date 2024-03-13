import { Request, Response } from 'express'
import { Text } from 'sonolus-core'
import { ToItem } from '../../api/item'
import { ItemInfoModel, toItemInfo } from '../../api/item-info'
import { SectionsModel } from '../../api/section/section'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemInfoHandler<TSonolus extends SonolusBase, TDatabaseItem> = (
    sonolus: TSonolus,
    session: string | undefined,
) => Promisable<ItemInfoModel<TDatabaseItem>>

export type DefaultItemInfoHandler<T> = (sonolus: SonolusBase) => Promisable<ItemInfoModel<T>>

export const defaultItemInfoHandler = <T>(sonolus: SonolusBase, items: T[]): ItemInfoModel<T> => ({
    sections: [
        {
            title: { en: Text.Newest },
            items: items.slice(0, 5),
        },
    ],
    banner: sonolus.db.info.banner,
})

export const itemInfoRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends SectionsModel,
    TDatabaseItem,
    TItem,
>(
    sonolus: TSonolus,
    { searches, infoHandler }: SonolusItemsConfig<TSonolus, TSearches, TDatabaseItem>,
    toItem: ToItem<TDatabaseItem, TItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    res.json(
        toItemInfo(sonolus, req.localize, toItem, await infoHandler(sonolus, session), searches),
    )
}
