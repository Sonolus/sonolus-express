import { Icon, LocalizationText, ServerForm } from '@sonolus/core'
import { Localize } from '../../utils/localization'
import { ServerOptionModel, toServerOption } from '../options/option'

export type ServerFormsModel = Record<string, ServerFormModel>

export type ServerFormModel = {
    title: LocalizationText
    icon?: Icon
    description?: LocalizationText
    requireConfirmation: boolean
    options: Record<string, ServerOptionModel>
}

export const formTypes = <T extends ServerFormsModel>(forms: T): (keyof T & string)[] =>
    Object.keys(forms)

export const toServerForm = (
    localize: Localize,
    type: string,
    form: ServerFormModel,
): ServerForm => ({
    type,
    title: localize(form.title),
    icon: form.icon,
    description: form.description && localize(form.description),
    requireConfirmation: form.requireConfirmation,
    options: Object.entries(form.options).map(([query, option]) =>
        toServerOption(localize, query, option),
    ),
})

export const toServerForms = <T extends ServerFormsModel>(
    localize: Localize,
    types: (keyof T & string)[],
    forms: T,
): ServerForm[] =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    types.map((type) => toServerForm(localize, type, forms[type]!))
