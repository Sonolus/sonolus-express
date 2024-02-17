import { DatabaseServerInfo } from 'sonolus-core'
import { toServerInfo } from '../../api/server-info'
import { Promisable } from '../../utils/types'
import { SonolusCallback, SonolusRouteHandler } from '../sonolus'

export type ServerInfoHandler = SonolusCallback<
    [session: string | undefined],
    Promisable<DatabaseServerInfo>
>

export const defaultServerInfoHandler: ServerInfoHandler = (sonolus) => sonolus.db.info

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
