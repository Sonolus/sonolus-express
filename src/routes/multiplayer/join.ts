import { JoinRoomResponse, UserProfile, getSignaturePublicKey } from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { ServerFormsModel } from '../../models/forms/form'
import { ParsedQuery, parseQuery } from '../../models/forms/query'
import { joinRoomRequestSchema } from '../../schemas/server/joinRoomRequest'
import { SonolusBase } from '../../sonolus'
import { SonolusMultiplayer } from '../../sonolus/multiplayer'
import { parse } from '../../utils/json'
import { MaybePromise } from '../../utils/promise'
import { SonolusRouteHandler } from '../handler'

export type MultiplayerJoinHandler<TCreates extends ServerFormsModel | undefined> = (ctx: {
    session: string | undefined
    localization: string
    itemName: string
    userProfile: UserProfile
    authentication: Buffer
    signature: Buffer
    create?: {
        key: string
        values: ParsedQuery<NonNullable<TCreates>>
    }
}) => MaybePromise<JoinRoomResponse | undefined>

export const defaultMultiplayerJoinHandler = (): undefined => undefined

export const createMultiplayerJoinRouteHandler =
    <TCreates extends ServerFormsModel | undefined>(
        sonolus: SonolusBase,
        multiplayer: SonolusMultiplayer<TCreates>,
    ): SonolusRouteHandler =>
    async ({ req, res, localization, session }) => {
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

        const request = parse(body, joinRoomRequestSchema)
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
        const values = multiplayer.creates && parseQuery(req.query, multiplayer.creates)

        const response = await multiplayer.joinHandler({
            session,
            localization,
            itemName,
            userProfile: request.userProfile,
            authentication: body,
            signature: signatureBuffer,
            create: typeof key === 'string' && values ? { key, values } : undefined,
        })
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    }
