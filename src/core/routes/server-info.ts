import { DatabaseServerInfo } from '@sonolus/core'
import { toServerInfo } from '../../api/server-info'
import { Promisable } from '../../utils/types'
import { SonolusBase, SonolusRouteHandler } from '../sonolus'

export type ServerInfoHandler<TSonolus extends SonolusBase> = (
    sonolus: TSonolus,
    session: string | undefined,
) => Promisable<DatabaseServerInfo>

export const defaultServerInfoHandler: ServerInfoHandler<SonolusBase> = (sonolus) => sonolus.db.info

export const serverInfoRouteHandler: SonolusRouteHandler = async (sonolus, session, req, res) => {
    res.json(
        toServerInfo(
            await sonolus.serverInfoHandler(sonolus, session),
            sonolus.authentication,
            sonolus.multiplayer,
            req.localize,
        ),
    )
}
