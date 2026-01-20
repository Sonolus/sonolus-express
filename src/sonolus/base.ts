import { ItemType } from '@sonolus/core'
import { Sonolus } from './sonolus.js'

export type SonolusBase = Pick<Sonolus, 'address' | 'title' | 'description' | 'banner'> & {
    [K in Exclude<ItemType, 'user'>]: Pick<Sonolus[K], 'items'>
}
