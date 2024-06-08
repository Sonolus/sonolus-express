import {
    ParsedCollectionItemOptionQuery,
    ServerCollectionItemOptionModel,
    parseServerCollectionItemOptionQuery,
} from '../options/collectionItem'
import { ParsedFileOptionQuery, parseFileOptionQuery } from '../options/file'
import { ParsedMultiOptionQuery, parseMultiOptionQuery } from '../options/multi'
import { ServerOptionModel } from '../options/option'
import { ParsedSelectOptionQuery, parseSelectOptionQuery } from '../options/select'
import { ParsedServerItemOptionQuery, parseServerItemOptionQuery } from '../options/serverItem'
import { ParsedSliderOptionQuery, parseSliderOptionQuery } from '../options/slider'
import { ParsedTextOptionQuery, parseTextOptionQuery } from '../options/text'
import { ParsedTextAreaOptionQuery, parseTextAreaOptionQuery } from '../options/textArea'
import { ParsedToggleOptionQuery, parseToggleOptionQuery } from '../options/toggle'
import { ServerFormsModel } from './form'

export type ParsedOptionQuery<T extends ServerOptionModel> = {
    text: ParsedTextOptionQuery
    textArea: ParsedTextAreaOptionQuery
    slider: ParsedSliderOptionQuery
    toggle: ParsedToggleOptionQuery
    select: ParsedSelectOptionQuery
    multi: ParsedMultiOptionQuery
    serverItem: ParsedServerItemOptionQuery
    collectionItem: ParsedCollectionItemOptionQuery<T & ServerCollectionItemOptionModel>
    file: ParsedFileOptionQuery
}[T['type']]

export type ParsedQuery<T extends ServerFormsModel> = {
    [K in keyof T]: { type: K } & {
        [P in keyof T[K]['options']]: ParsedOptionQuery<T[K]['options'][P]>
    }
}[keyof T]

export const parseQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    forms: T,
): ParsedQuery<T> | undefined => {
    const type = `${query.type}`

    const form = forms[type]
    if (!form) return

    return {
        type,
        ...Object.fromEntries(
            Object.entries(form.options).map(([key, option]) => {
                switch (option.type) {
                    case 'text':
                        return [key, parseTextOptionQuery(query[key])]
                    case 'textArea':
                        return [key, parseTextAreaOptionQuery(query[key])]
                    case 'slider':
                        return [key, parseSliderOptionQuery(query[key], option)]
                    case 'toggle':
                        return [key, parseToggleOptionQuery(query[key], option)]
                    case 'select':
                        return [key, parseSelectOptionQuery(query[key], option)]
                    case 'multi':
                        return [key, parseMultiOptionQuery(query[key], option)]
                    case 'serverItem':
                        return [key, parseServerItemOptionQuery(query[key])]
                    case 'collectionItem':
                        return [key, parseServerCollectionItemOptionQuery(query[key], option)]
                    case 'file':
                        return [key, parseFileOptionQuery(query[key])]
                }
            }),
        ),
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
            keywords: parseTextOptionQuery(query.keywords),
        }

    return (
        parseQuery(query, searches) ?? {
            type: 'quick',
            keywords: '',
        }
    )
}
