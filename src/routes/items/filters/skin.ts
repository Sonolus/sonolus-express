import { SkinItemModel } from '../../../models/items/skin.js'
import { createFilterItems } from './filter.js'

export const filterSkins = createFilterItems<SkinItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
