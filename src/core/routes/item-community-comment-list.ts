import { Request, Response } from 'express'
import { ServerFormsModel } from '../../api/form/form'
import {
    ItemCommunityCommentListModel,
    toItemCommunityCommentList,
} from '../../api/item-community-comment-list'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemCommunityCommentListHandler<
    TSonolus extends SonolusBase,
    TCommunityActions extends ServerFormsModel | undefined,
> = (
    sonolus: TSonolus,
    session: string | undefined,
    name: string,
    page: number,
) => Promisable<ItemCommunityCommentListModel<TCommunityActions> | undefined>

export const defaultItemCommunityCommentListHandler: ItemCommunityCommentListHandler<
    SonolusBase,
    ServerFormsModel | undefined
> = () => undefined

export const itemCommunityCommentListRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel | undefined,
    TDatabaseItem,
>(
    sonolus: TSonolus,
    {
        communityActions,
        communityCommentListHandler,
    }: SonolusItemsConfig<TSonolus, TSearches, TCommunityActions, TDatabaseItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    if (!communityActions) {
        res.status(404).end()
        return
    }

    const name = req.params.name
    if (!name) {
        res.status(404).end()
        return
    }

    const list = await communityCommentListHandler(
        sonolus,
        session,
        name,
        +(req.query.page ?? '') || 0,
    )
    if (!list) {
        res.status(404).end()
        return
    }

    res.json(toItemCommunityCommentList(req.localize, list, communityActions))
}
