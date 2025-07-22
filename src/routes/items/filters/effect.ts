import { EffectItemModel } from '../../../models/items/effect.js'
import { createFilterItems } from './filter.js'

export const filterEffects = createFilterItems<EffectItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
