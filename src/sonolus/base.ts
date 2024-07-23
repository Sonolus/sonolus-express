import { ItemType } from '@sonolus/core'
import { Sonolus } from './sonolus'

export type SonolusBase = Pick<Sonolus, 'address' | 'title' | 'description' | 'banner'> & {
    [K in ItemType]: Pick<Sonolus[K], 'items'>
}
