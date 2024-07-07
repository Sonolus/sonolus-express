import { ServerJoinRoomResponse, ServiceUserProfile, getSignaturePublicKey } from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { ServerFormsModel } from '../../models/server/forms/form'
import { ServerFormsValue, parseServerFormsValue } from '../../models/server/forms/value'
import { ServerOptionsModel } from '../../models/server/options/option'
import { serverJoinRoomRequestSchema } from '../../schemas/server/multiplayer/joinRoom'
import { SonolusBase } from '../../sonolus'
import { SonolusMultiplayer } from '../../sonolus/multiplayer'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusCtx } from '../ctx'
import { SonolusRouteHandler } from '../handler'

export type ServerJoinRoomHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        itemName: string
        userProfile: ServiceUserProfile
        authentication: Buffer
        signature: Buffer
        create?: {
            key: string
            value: ServerFormsValue<NonNullable<TCreates>>
        }
    },
) => MaybePromise<ServerJoinRoomResponse | undefined>

export const defaultServerJoinRoomHandler = (): undefined => undefined

export const createServerJoinRoomRouteHandler =
    <
        TConfigurationOptions extends ServerOptionsModel,
        TCreates extends ServerFormsModel | undefined,
    >(
        sonolus: SonolusBase,
        multiplayer: SonolusMultiplayer<TConfigurationOptions, TCreates>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, ctx }) => {
        const itemName = req.params.itemName
        if (!itemName) {
            res.status(400).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverJoinRoomRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        if (request.address !== sonolus.address) {
            res.status(400).end()
            return
        }

        if (request.room !== itemName) {
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
        const signatureBuffer = Buffer.from(signature, 'base64')

        const result = await webcrypto.subtle.verify(
            { name: 'ECDSA', hash: 'SHA-256' },
            signaturePublicKey,
            signatureBuffer,
            body,
        )
        if (!result) {
            res.status(400).end()
            return
        }

        const key = req.headers['sonolus-room-key']
        const value = multiplayer.creates && parseServerFormsValue(req.query, multiplayer.creates)

        const response = await multiplayer.joinHandler({
            ...ctx,
            itemName,
            userProfile: request.userProfile,
            authentication: body,
            signature: signatureBuffer,
            create: typeof key === 'string' && value ? { key, value } : undefined,
        })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
