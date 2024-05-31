import { JoinRoomResponse, getSignaturePublicKey } from '@sonolus/core'
import { webcrypto } from 'node:crypto'
import { toCreateRoomResponse } from '../api/create-room-response'
import { ServerFormsModel } from '../api/form/form'
import { ParsedQuery, parseQuery } from '../api/form/query'
import { joinRoomRequestSchema } from '../schemas/join-room-request'
import { safeJsonParse } from '../utils/safe-json-parse'
import { Promisable } from '../utils/types'
import { SonolusBase, SonolusRouteHandler } from './sonolus'

export type CreateRoomHandler<TSonolus extends SonolusBase> = (
    sonolus: TSonolus,
    session: string | undefined,
) => Promisable<
    | {
          name: string
          key: string
      }
    | undefined
>

export const defaultCreateRoomHandler: CreateRoomHandler<SonolusBase> = () => undefined

export const createRoomRouteHandler: SonolusRouteHandler = async (sonolus, session, req, res) => {
    const response = await sonolus.multiplayerConfig.createRoomHandler(sonolus, session)
    if (!response) {
        res.status(404).end()
        return
    }

    res.json(
        toCreateRoomResponse(
            req.localize,
            response.name,
            response.key,
            sonolus.multiplayerConfig.creates,
        ),
    )
}

export type JoinRoomHandler<TSonolus extends SonolusBase, TRoomCreates extends ServerFormsModel> = (
    sonolus: TSonolus,
    session: string | undefined,
    localization: string,
    name: string,
    authentication: Buffer,
    signature: Buffer,
    create?: {
        key: string
        query: ParsedQuery<TRoomCreates>
    },
) => Promisable<JoinRoomResponse | undefined>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultJoinRoomHandler: JoinRoomHandler<SonolusBase, any> = () => undefined

export const joinRoomRouteHandler: SonolusRouteHandler = async (sonolus, session, req, res) => {
    try {
        const name = req.params.name
        if (!name) {
            res.status(400).end()
            return
        }

        const body = req.body as unknown
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const parseResult = joinRoomRequestSchema.safeParse(safeJsonParse(body.toString('utf8')))
        if (!parseResult.success) {
            res.status(400).end()
            return
        }

        if (parseResult.data.address !== sonolus.address) {
            res.status(400).end()
            return
        }

        if (parseResult.data.room !== name) {
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

        const verifyResult = await webcrypto.subtle.verify(
            { name: 'ECDSA', hash: 'SHA-256' },
            signaturePublicKey,
            signatureBuffer,
            body,
        )
        if (!verifyResult) {
            res.status(400).end()
            return
        }

        const key = req.headers['sonolus-room-key']
        const query = parseQuery(req.query, sonolus.multiplayerConfig.creates)

        const response = await sonolus.multiplayerConfig.joinRoomHandler(
            sonolus,
            session,
            req.localization,
            name,
            body,
            signatureBuffer,
            typeof key === 'string' && query ? { key, query } : undefined,
        )
        if (!response) {
            res.status(404).end()
            return
        }

        res.json(response)
    } catch (error) {
        console.error('[ERROR]', error)
        res.status(500).end()
    }
}
