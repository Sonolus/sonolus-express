import {
    getSignaturePublicKey,
    ServerAuthenticateResponse,
    ServiceUserProfile,
} from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { ServerOptionsModel } from '../models/server/options/option.js'
import { authenticateServerRequestSchema } from '../schemas/server/authenticate.js'
import { SonolusBase } from '../sonolus/base.js'
import { Sonolus } from '../sonolus/sonolus.js'
import { parse } from '../utils/json.js'
import { SonolusCtx } from './ctx.js'
import { handleError } from './error.js'
import { HandlerResponse, SonolusRouteHandler } from './handler.js'

export type ServerAuthenticateHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        userProfile: ServiceUserProfile
    },
) => HandlerResponse<ServerAuthenticateResponse, 401>

export const createServerAuthenticateRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase & Pick<Sonolus<TConfigurationOptions>, 'authenticateHandler'>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!sonolus.authenticateHandler) {
            res.status(404).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, authenticateServerRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        if (request.address !== sonolus.address) {
            res.status(400).end()
            return
        }

        if (request.time + 60 * 1000 < Date.now()) {
            res.status(400).end()
            return
        }

        const signature = req.headers['sonolus-signature']
        if (typeof signature !== 'string') {
            res.status(400).end()
            return
        }

        const signaturePublicKey = await getSignaturePublicKey()

        const result = await webcrypto.subtle.verify(
            { name: 'ECDSA', hash: 'SHA-256' },
            signaturePublicKey,
            Buffer.from(signature, 'base64'),
            body,
        )
        if (!result) {
            res.status(400).end()
            return
        }

        const response = await sonolus.authenticateHandler({
            ...ctx,
            userProfile: request.userProfile,
        })
        if (handleError(response, res, localize)) return

        res.json(response)
    }
