import { SearchOptionInfo } from '.'
import { SearchInfo } from '..'

export type SearchQueryOf<
    T extends SearchInfo,
    U extends SearchOptionInfo,
    V
> = {
    [query in keyof T['options'] as T['options'][query] extends U
        ? query
        : never]: V
}
