import { Icon, LocalizationText, ServerForm } from '@sonolus/core'
import { Localize } from '../../../utils/localization'
import { ServerOptionsModel, toServerOption } from '../options/option'

export type ServerFormsModel = Record<string, ServerFormModel>

export type PickForms<T extends ServerFormsModel> = {
    [K in keyof T]?: boolean | T[K]
}

export type ServerFormModel = {
    title: LocalizationText
    icon?: Icon
    description?: LocalizationText
    help?: LocalizationText
    requireConfirmation: boolean
    options: ServerOptionsModel
}

export const toServerForm = (
    localize: Localize,
    type: string,
    form: ServerFormModel,
): ServerForm => ({
    type,
    title: localize(form.title),
    icon: form.icon,
    description: form.description && localize(form.description),
    help: form.help && localize(form.help),
    requireConfirmation: form.requireConfirmation,
    options: Object.entries(form.options).map(([query, option]) =>
        toServerOption(localize, query, option),
    ),
})

export const toServerForms = <T extends ServerFormsModel>(
    localize: Localize,
    pick: PickForms<T>,
    forms: T,
): ServerForm[] =>
    Object.entries(pick as Partial<Record<string, boolean | ServerFormModel>>)
        .map(
            ([type, value]) =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                value && toServerForm(localize, type, value === true ? forms[type]! : value),
        )
        .filter((form) => !!form)
