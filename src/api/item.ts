import { SonolusBase } from '../core/sonolus'
import { Localize } from './localization'

export type ToItem<T, U> = (sonolus: SonolusBase, localize: Localize, item: T) => U

export const toItems = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    items: T[],
): U[] => items.map((item) => toItem(sonolus, localize, item))

export const getByName = <T extends { name: string }>(
    items: T[],
    name: string,
    parent: string,
    path: string,
): T => {
    const item = items.find((item) => item.name === name)
    if (!item) throw new Error(`${parent}: ${name} not found (${path})`)

    return item
}
