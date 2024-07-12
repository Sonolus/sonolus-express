import { LocalizationText, ServerInfo, ServerInfoButton, Srl } from '@sonolus/core'
import { Localize } from '../../utils/localization'
import { PickOptions, ServerOptionsModel, toServerOptions } from './options/option'

export type ServerInfoModel<T extends ServerOptionsModel> = {
    title: LocalizationText
    description?: LocalizationText
    buttons: ServerInfoButton[]
    configuration: {
        options: PickOptions<T>
    }
    banner?: Srl
}

export const toServerInfo = <T extends ServerOptionsModel>(
    localize: Localize,
    serverInfo: ServerInfoModel<T>,
    options: T,
): ServerInfo => ({
    title: localize(serverInfo.title),
    description: serverInfo.description && localize(serverInfo.description),
    buttons: serverInfo.buttons,
    configuration: {
        options: toServerOptions(localize, serverInfo.configuration.options, options),
    },
    banner: serverInfo.banner,
})
