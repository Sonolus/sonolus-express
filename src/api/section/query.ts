import { ParsedMultiOptionQuery, parseMultiQuery } from '../option/multi'
import { ServerOptionModel } from '../option/option'
import { ParsedSelectOptionQuery, parseSelectQuery } from '../option/select'
import { ParsedSliderOptionQuery, parseSliderQuery } from '../option/slider'
import { ParsedTextOptionQuery, parseTextQuery } from '../option/text'
import { ParsedToggleOptionQuery, parseToggleQuery } from '../option/toggle'
import { SectionsModel } from './section'

export type ParsedOptionQuery<T extends ServerOptionModel> = {
    text: ParsedTextOptionQuery
    slider: ParsedSliderOptionQuery
    toggle: ParsedToggleOptionQuery
    select: ParsedSelectOptionQuery
    multi: ParsedMultiOptionQuery
}[T['type']]

export type ParsedQuery<T extends SectionsModel> = {
    [K in keyof T]: { type: K } & {
        [P in keyof T[K]['options']]: ParsedOptionQuery<T[K]['options'][P]>
    }
}[keyof T]

export const parseQuery = <T extends SectionsModel>(
    query: Record<string, unknown>,
    sections: T,
): ParsedQuery<T> | undefined => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const type = `${query.type}`

    const section = sections[type]
    if (!section) return

    return {
        type,
        ...Object.fromEntries(
            Object.entries(section.options).map(([key, option]) => {
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
        ),
    } as never
}

export type ParsedSearchQuery<T extends SectionsModel> =
    | ParsedQuery<T>
    | {
          type: 'quick'
          keywords: string
      }

export const parseSearchQuery = <T extends SectionsModel>(
    query: Record<string, unknown>,
    searches: T,
): ParsedSearchQuery<T> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
