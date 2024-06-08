import { EffectItemModel } from '../../../models/items/effect'
import { createFilterItems } from './filter'

export const filterEffects = createFilterItems<EffectItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
