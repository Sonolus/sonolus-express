import { SubmitItemCommunityActionResponse } from '@sonolus/core'
import { Request, Response } from 'express'
import { ServerFormsModel } from '../../api/form/form'
import { parseActionQuery } from '../../api/form/query'
import { submitItemCommunityActionRequestSchema } from '../../schemas/submit-item-community-action-response'
import { safeJsonParse } from '../../utils/safe-json-parse'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusItemsConfig } from '../sonolus'

export type ItemCommunityActionHandler<TSonolus extends SonolusBase, TQuery> = (
    sonolus: TSonolus,
    session: string | undefined,
    name: string,
    id: string,
    query: TQuery,
) => Promisable<SubmitItemCommunityActionResponse | undefined>

export const defaultItemCommunityActionHandler: ItemCommunityActionHandler<
    SonolusBase,
    unknown
> = () => undefined

export const itemCommunityActionRouteHandler = async <
    TSonolus extends SonolusBase,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel | undefined,
    TDatabaseItem,
>(
    sonolus: TSonolus,
    {
        communityActions,
        communityActionHandler,
    }: SonolusItemsConfig<TSonolus, TSearches, TCommunityActions, TDatabaseItem>,
    session: string | undefined,
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        if (!communityActions) {
            res.status(404).end()
            return
        }

        const name = req.params.name
        if (!name) {
            res.status(404).end()
            return
        }

        const body = req.body as unknown
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const parseResult = submitItemCommunityActionRequestSchema.safeParse(
            safeJsonParse(body.toString('utf8')),
        )
        if (!parseResult.success) {
            res.status(400).end()
            return
        }

        const actionResult = parseActionQuery(
            Object.fromEntries(new URLSearchParams(parseResult.data.values)),
            communityActions,
        )
        if (!actionResult) {
            res.status(400).end()
            return
        }

        const { id, query } = actionResult
        const handlerResult = await communityActionHandler(sonolus, session, name, id, query)
        if (!handlerResult) {
            res.status(404).end()
            return
        }

        res.json(handlerResult)
    } catch (error) {
        console.error('[ERROR]', error)
        res.status(500).end()
    }
}
