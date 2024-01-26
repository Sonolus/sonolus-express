import { ParsedMultiOptionQuery, parseMultiQuery } from './option/multi'
import { SearchOptionModel } from './option/option'
import { ParsedSelectOptionQuery, parseSelectQuery } from './option/select'
import { ParsedSliderOptionQuery, parseSliderQuery } from './option/slider'
import { ParsedTextOptionQuery, parseTextQuery } from './option/text'
import { ParsedToggleOptionQuery, parseToggleQuery } from './option/toggle'
import { SearchesModel } from './search'

export type ParsedOptionQuery<T extends SearchOptionModel> = {
    text: ParsedTextOptionQuery
    slider: ParsedSliderOptionQuery
    toggle: ParsedToggleOptionQuery
    select: ParsedSelectOptionQuery
    multi: ParsedMultiOptionQuery
}[T['type']]

export type ParsedQuery<T extends SearchesModel> =
    | {
          type: 'quick'
          keywords: string
      }
    | {
          [K in keyof T]: { type: K } & {
              [P in keyof T[K]['options']]: ParsedOptionQuery<T[K]['options'][P]>
          }
      }[keyof T]

export const parseQuery = <T extends SearchesModel>(
    query: Record<string, unknown>,
    searches: T,
): ParsedQuery<T> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const type = `${query.type}`

    if (type === 'quick')
        return {
            type: 'quick',
            keywords: parseTextQuery(query.keywords),
        }

    const search = searches[type]
    if (!search)
        return {
            type: 'quick',
            keywords: '',
        }

    return {
        type,
        ...Object.fromEntries(
            Object.entries(search.options).map(([key, option]) => {
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
