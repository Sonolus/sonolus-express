import { AuthenticateServerResponse, UserProfile, getSignaturePublicKey } from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { authenticateServerRequestSchema } from '../schemas/server/authenticateServerRequest'
import { SonolusBase } from '../sonolus/base'
import { parse } from '../utils/json'
import { MaybePromise } from '../utils/promise'
import { SonolusRouteHandler } from './handler'

export type AuthenticateHandler = (ctx: {
    session: string | undefined
    userProfile: UserProfile
}) => MaybePromise<AuthenticateServerResponse | undefined>

export const defaultAuthenticateHandler = (): undefined => undefined

export const createAuthenticateRouteHandler =
    (sonolus: SonolusBase): SonolusRouteHandler =>
    async ({ req, res, session }) => {
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
            session,
            userProfile: request.userProfile,
        })
        if (!response) {
            res.status(401).end()
            return
        }

        res.json(response)
    }
