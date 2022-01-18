import { SearchInfo } from '.'

type QueryType = {
    text: string
    slider: number
    toggle: boolean
    select: number
}

export type Query<T extends SearchInfo> = {
    [P in keyof T['options']]: QueryType[T['options'][P]['type']]
}
