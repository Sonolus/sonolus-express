import { CreateRoomResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { createRoomRequestSchema } from '../../schemas/server/createRoomRequest'
import { SonolusMultiplayer } from '../../sonolus/multiplayer'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type MultiplayerCreateHandler = (ctx: {
    session: string | undefined
}) => MaybePromise<CreateRoomResponse | undefined>

export const defaultMultiplayerCreateHandler = (): undefined => undefined

export const createMultiplayerCreateRouteHandler =
    <TCreates extends ServerFormsModel | undefined>(
        multiplayer: SonolusMultiplayer<TCreates>,
    ): SonolusRouteHandler =>
    async ({ req, res, session }) => {
        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, createRoomRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const response = await multiplayer.createHandler({ session })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
