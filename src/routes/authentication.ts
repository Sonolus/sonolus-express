import {
    ServerAuthenticateResponse,
    ServiceUserProfile,
    getSignaturePublicKey,
} from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { ServerOptionsModel } from '../models/options/option'
import { authenticateServerRequestSchema } from '../schemas/server/authenticate'
import { SonolusBase } from '../sonolus/base'
import { Sonolus } from '../sonolus/sonolus'
import { parse } from '../utils/json'
import { MaybePromise } from '../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from './handler'

export type AuthenticateHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        userProfile: ServiceUserProfile
    },
) => MaybePromise<ServerAuthenticateResponse | undefined>

export const defaultAuthenticateHandler = (): undefined => undefined

export const createAuthenticateRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase & Pick<Sonolus<TConfigurationOptions>, 'authenticateHandler'>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, ctx }) => {
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
        if (!response) {
            res.status(401).end()
            return
        }

        res.json(response)
    }
