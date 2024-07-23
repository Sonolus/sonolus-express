import { LocalizationText } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'

export type ItemModel = {
    name: string
    description?: LocalizationText
}

export type Model<TItem, TOverride> = Omit<TItem, keyof TOverride> & TOverride

export type ToItem<TItemModel, TItem> = (
    sonolus: SonolusBase,
    localize: Localize,
    item: TItemModel,
) => TItem

export const toItems = <TItemModel, TItem>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<TItemModel, TItem>,
    items: TItemModel[],
): TItem[] => items.map((item) => toItem(sonolus, localize, item))

export const getItem = <T extends ItemModel>(
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
