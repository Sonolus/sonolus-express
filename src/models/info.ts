import { LocalizationText, ServerInfo, ServerInfoButton, Srl } from '@sonolus/core'
import { Localize } from '../utils/localization'

export type ServerInfoModel = {
    title: LocalizationText
    description?: LocalizationText
    buttons: ServerInfoButton[]
    banner?: Srl
}

export const toServerInfo = (serverInfo: ServerInfoModel, localize: Localize): ServerInfo => ({
    title: localize(serverInfo.title),
    description: serverInfo.description && localize(serverInfo.description),
    buttons: serverInfo.buttons,
    configuration: {
        options: [],
    },
    banner: serverInfo.banner,
})
