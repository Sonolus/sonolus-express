import { Text } from '@sonolus/core'
import { Request, Response } from 'express'
import { ServerFormsModel } from '../../api/form/form'
import { ToItem } from '../../api/item'
import { ItemInfoModel, toItemInfo } from '../../api/item-info'
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
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel | undefined,
    TDatabaseItem,
    TItem,
>(
    sonolus: TSonolus,
    {
        searches,
        infoHandler,
    }: SonolusItemsConfig<TSonolus, TSearches, TCommunityActions, TDatabaseItem>,
    toItem: ToItem<TDatabaseItem, TItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    res.json(
        toItemInfo(sonolus, req.localize, toItem, await infoHandler(sonolus, session), searches),
    )
}
