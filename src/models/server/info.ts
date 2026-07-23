import { Icon, LocalizationText, ServerInfo, ServerInfoButton, Srl } from '@sonolus/core'

import { Localize } from '../../utils/localization.js'
import { PickOptions, ServerOptionsModel, toServerOptions } from './options/option.js'

export type ServerInfoButtonModel =
    | ServerInfoAuthenticationButtonModel
    | ServerInfoItemButtonModel
    | ServerInfoConfigurationButtonModel

export type ServerInfoAuthenticationButtonModel = {
    type: 'authentication'
}

export type ServerInfoItemButtonModel = {
    type:
        | 'room'
        | 'post'
        | 'playlist'
        | 'level'
        | 'replay'
        | 'skin'
        | 'background'
        | 'effect'
        | 'particle'
        | 'engine'
        | 'user'
    title?: LocalizationText
    icon?: Icon
    badgeCount?: number
    infoType?: string
    itemName?: string
}

export type ServerInfoConfigurationButtonModel = {
    type: 'configuration'
}

const toServerInfoButton = (
    localize: Localize,
    serverInfoButton: ServerInfoButtonModel,
): ServerInfoButton => {
    switch (serverInfoButton.type) {
        case 'authentication':
            return {
                type: 'authentication',
            }
        case 'room':
        case 'post':
        case 'playlist':
        case 'level':
        case 'replay':
        case 'skin':
        case 'background':
        case 'effect':
        case 'particle':
        case 'engine':
        case 'user':
            return {
                type: serverInfoButton.type,
                title: serverInfoButton.title && localize(serverInfoButton.title),
                icon: serverInfoButton.icon,
                badgeCount: serverInfoButton.badgeCount,
                infoType: serverInfoButton.infoType,
                itemName: serverInfoButton.itemName,
            }
        case 'configuration':
            return {
                type: 'configuration',
            }
    }
}

export type ServerInfoModel<T extends ServerOptionsModel> = {
    title: LocalizationText
    description?: LocalizationText
    buttons: ServerInfoButtonModel[]
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
    buttons: serverInfo.buttons.map((button) => toServerInfoButton(localize, button)),
    configuration: {
        options: toServerOptions(localize, serverInfo.configuration.options, options),
    },
    banner: serverInfo.banner,
})
