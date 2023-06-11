import { SearchInfo } from '.'
import { parseSelectQuery } from './option/select'
import { parseSliderQuery } from './option/slider'
import { parseTextQuery } from './option/text'
import { parseToggleQuery } from './option/toggle'

type QueryType = {
    text: ReturnType<typeof parseTextQuery>
    slider: ReturnType<typeof parseSliderQuery>
    toggle: ReturnType<typeof parseToggleQuery>
    select: ReturnType<typeof parseSelectQuery>
}

export type Query<T extends SearchInfo> = {
    [P in keyof T['options']]: QueryType[T['options'][P]['type']]
}

export function parseQuery<T extends SearchInfo>(
    query: Record<string, unknown>,
    search: T,
): Query<T> {
    return Object.fromEntries(
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
            }
        }),
    )
}
