import { ServerCreateRoomResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../models/server/forms/form.js'
import { ServerOptionsModel } from '../../models/server/options/option.js'
import { serverCreateRoomRequestSchema } from '../../schemas/server/multiplayer/createRoom.js'
import { SonolusMultiplayer } from '../../sonolus/multiplayer.js'
import { parse } from '../../utils/json.js'
import { SonolusCtx } from '../ctx.js'
import { handleError } from '../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../handler.js'

export type ServerCreateRoomHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<ServerCreateRoomResponse, 401>

export const createServerCreateRoomRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TCreates extends ServerFormsModel>(
        multiplayer: SonolusMultiplayer<TConfigurationOptions, TCreates>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
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
        if (handleError(response, res, localize)) return

        res.json(response)
    }
