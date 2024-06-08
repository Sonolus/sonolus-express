import { SkinItemModel } from '../../../models/items/skin'
import { createFilterItems } from './filter'

export const filterSkins = createFilterItems<SkinItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
