import { Request, Response } from 'express'
import { ServerFormsModel } from '../../api/form/form'
import { ItemCommunityModel, toItemCommunity } from '../../api/item-community'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemCommunityHandler<
    TSonolus extends SonolusBase,
    TCommunityActions extends ServerFormsModel | undefined,
> = (
    sonolus: TSonolus,
    session: string | undefined,
    name: string,
) => Promisable<ItemCommunityModel<TCommunityActions> | undefined>

export const defaultItemCommunityHandler: ItemCommunityHandler<
    SonolusBase,
    ServerFormsModel | undefined
> = () => undefined

export const itemCommunityRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel | undefined,
    TDatabaseItem,
>(
    sonolus: TSonolus,
    {
        communityActions,
        communityHandler,
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

    const community = await communityHandler(sonolus, session, name)
    if (!community) {
        res.status(404).end()
        return
    }

    res.json(toItemCommunity(req.localize, community, communityActions))
}
