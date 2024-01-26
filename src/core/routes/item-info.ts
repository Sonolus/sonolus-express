import { Request, Response } from 'express'
import { Text } from 'sonolus-core'
import { ToItem } from '../../api/item'
import { ItemInfoModel, toItemInfo } from '../../api/item-info'
import { Promisable } from '../../utils/types'
import { ItemsConfig, SonolusBase, SonolusCallback, SonolusItemsConfig } from '../sonolus'

export type ItemInfoHandler<TSonolus extends SonolusBase, TDatabaseItem> = (
    sonolus: TSonolus,
    session: string | undefined,
) => Promisable<ItemInfoModel<TDatabaseItem>>

export type DefaultItemInfoHandler<T> = SonolusCallback<[], Promisable<ItemInfoModel<T>>>

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
    TConfig extends ItemsConfig,
    TDatabaseItem,
    TItem,
>(
    sonolus: TSonolus,
    { searches, infoHandler }: SonolusItemsConfig<TSonolus, TConfig, TDatabaseItem>,
    toItem: ToItem<TDatabaseItem, TItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    res.json(
        toItemInfo(sonolus, req.localize, toItem, await infoHandler(sonolus, session), searches),
    )
}
