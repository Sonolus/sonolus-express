import { LocalizationText, SRL, ServerInfo, ServerInfoButton } from '@sonolus/core'
import { Localize } from '../utils/localization'

export type ServerInfoModel = {
    title: LocalizationText
    description?: LocalizationText
    buttons: ServerInfoButton[]
    banner?: SRL
}

export const toServerInfo = (serverInfo: ServerInfoModel, localize: Localize): ServerInfo => ({
    title: localize(serverInfo.title),
    description: serverInfo.description && localize(serverInfo.description),
    buttons: serverInfo.buttons,
    banner: serverInfo.banner,
})
