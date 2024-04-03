import { DatabaseServerInfo, ServerInfo } from '@sonolus/core'
import { Localize } from './localization'

export const toServerInfo = (
    serverInfo: DatabaseServerInfo,
    hasAuthentication: boolean,
    hasMultiplayer: boolean,
    localize: Localize,
): ServerInfo => ({
    title: localize(serverInfo.title),
    description: serverInfo.description && localize(serverInfo.description),
    hasAuthentication,
    hasMultiplayer,
    banner: serverInfo.banner,
})
