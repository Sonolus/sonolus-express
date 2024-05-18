import { ParsedMultiOptionQuery, parseMultiQuery } from '../option/multi'
import { ServerOptionModel } from '../option/option'
import { ParsedSelectOptionQuery, parseSelectQuery } from '../option/select'
import { ParsedSliderOptionQuery, parseSliderQuery } from '../option/slider'
import { ParsedTextOptionQuery, parseTextQuery } from '../option/text'
import { ParsedToggleOptionQuery, parseToggleQuery } from '../option/toggle'
import { ServerFormModel, ServerFormsModel } from './form'

export type ParsedOptionQuery<T extends ServerOptionModel> = {
    text: ParsedTextOptionQuery
    slider: ParsedSliderOptionQuery
    toggle: ParsedToggleOptionQuery
    select: ParsedSelectOptionQuery
    multi: ParsedMultiOptionQuery
}[T['type']]

export type ParsedQuery<T extends ServerFormsModel> = {
    [K in keyof T]: { type: K } & {
        [P in keyof T[K]['options']]: ParsedOptionQuery<T[K]['options'][P]>
    }
}[keyof T]

const parseQueryByForm = (query: Record<string, unknown>, form: ServerFormModel) =>
    Object.fromEntries(
        Object.entries(form.options).map(([key, option]) => {
            switch (option.type) {
                case 'text':
                    return [key, parseTextQuery(query[key])]
                case 'slider':
                    return [key, parseSliderQuery(query[key], option)]
                case 'toggle':
                    return [key, parseToggleQuery(query[key], option)]
                case 'select':
                    return [key, parseSelectQuery(query[key], option)]
                case 'multi':
                    return [key, parseMultiQuery(query[key], option)]
            }
        }),
    ) as object

export const parseQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    forms: T,
): ParsedQuery<T> | undefined => {
    const type = `${query.type}`

    const form = forms[type]
    if (!form) return

    return {
        type,
        ...parseQueryByForm(query, form),
    } as never
}

export type ParsedSearchQuery<T extends ServerFormsModel> =
    | ParsedQuery<T>
    | {
          type: 'quick'
          keywords: string
      }

export const parseSearchQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    searches: T,
): ParsedSearchQuery<T> => {
    const type = `${query.type}`

    if (type === 'quick')
        return {
            type: 'quick',
            keywords: parseTextQuery(query.keywords),
        }

    return (
        parseQuery(query, searches) ?? {
            type: 'quick',
            keywords: '',
        }
    )
}

export type ParsedActionQuery<T extends ServerFormsModel> = {
    id: string
    query: ParsedQuery<T>
}

export const parseActionQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    forms: T,
): ParsedActionQuery<T> | undefined => {
    const typeWithId = `${query.type}`

    const result = Object.entries(forms).find(([type]) => typeWithId.startsWith(`${type}:`))
    if (!result) return

    const [type, form] = result
    return {
        id: typeWithId.slice(type.length + 1),
        query: {
            type,
            ...parseQueryByForm(query, form),
        },
    } as never
}
