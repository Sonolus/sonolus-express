import { ServerCreateRoomResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerOptionsModel } from '../../models/server/options/option'
import { serverCreateRoomRequestSchema } from '../../schemas/server/multiplayer/createRoom'
import { SonolusMultiplayer } from '../../sonolus/multiplayer'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerCreateRoomHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<ServerCreateRoomResponse | 401>

export const createServerCreateRoomRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TCreates extends ServerFormsModel>(
        multiplayer: SonolusMultiplayer<TConfigurationOptions, TCreates>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, ctx }) => {
        if (!multiplayer.createHandler) {
            res.status(404).end()
            return
        }

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
        if (typeof response === 'number') {
            res.status(response).end()
            return
        }

        res.json(response)
    }
