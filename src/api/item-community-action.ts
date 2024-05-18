import { ServerForm } from '@sonolus/core'
import { ServerFormsModel, toServerForm as _toServerForm } from './form/form'
import { Localize } from './localization'

export type ItemCommunityAction<T extends ServerFormsModel | undefined> = keyof T

export const toServerForm = <T extends ServerFormsModel>(
    localize: Localize,
    id: string,
    action: ItemCommunityAction<T>,
    actions: T,
): ServerForm =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    _toServerForm(localize, `${action as never}:${id}`, actions[action]!)
