import { ServerCreateRoomResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/forms/form'
import { ServerOptionsModel } from '../../models/options/option'
import { serverCreateRoomRequestSchema } from '../../schemas/server/multiplayer/createRoom'
import { SonolusMultiplayer } from '../../sonolus/multiplayer'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from '../handler'

export type MultiplayerCreateHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<ServerCreateRoomResponse | undefined>

export const defaultMultiplayerCreateHandler = (): undefined => undefined

export const createMultiplayerCreateRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TCreates extends ServerFormsModel | undefined,
    >(
        multiplayer: SonolusMultiplayer<TConfigurationOptions, TCreates>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, ctx }) => {
        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverCreateRoomRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const response = await multiplayer.createHandler(ctx)
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
