import { Icon, LocalizationText, ServerForm } from '@sonolus/core'
import { Localize } from '../localization'
import { ServerOptionModel, toServerOption } from '../option/option'

export type ServerFormsModel = Record<string, ServerFormModel>

export type ServerFormModel = {
    title: LocalizationText
    icon?: Icon
    options: Record<string, ServerOptionModel>
}

export const toServerForms = (localize: Localize, forms: ServerFormsModel): ServerForm[] =>
    Object.entries(forms).map(([type, form]) => ({
        type,
        title: localize(form.title),
        icon: form.icon,
        options: Object.entries(form.options).map(([query, option]) =>
            toServerOption(localize, query, option),
        ),
    }))
