export type List<T> = {
    pageCount: number
    items: T[]
}

export function toList<T, U>(
    list: {
        pageCount: number
        infos: T[]
    },
    toItem: (info: T) => U
): List<U> {
    return {
        pageCount: list.pageCount,
        items: list.infos.map(toItem),
    }
}
