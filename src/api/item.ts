import { SonolusBase } from '../core/sonolus'
import { Localize } from './localization'

export type Model<T, U> = Omit<T, keyof U> & U

export type ToItem<T, U> = (sonolus: SonolusBase, localize: Localize, item: T) => U

export const toItems = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    items: T[],
): U[] => items.map((item) => toItem(sonolus, localize, item))

export const getItem = <T extends { name: string }>(
    items: T[],
    nameOrItem: string | T,
    parent: string,
    path: string,
): T => {
    if (typeof nameOrItem !== 'string') return nameOrItem

    const item = items.find(({ name }) => name === nameOrItem)
    if (!item) throw new Error(`${parent}: ${nameOrItem} not found (${path})`)

    return item
}
