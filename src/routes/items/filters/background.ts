import { BackgroundItemModel } from '../../../models/items/background'
import { createFilterItems } from './filter'

export const filterBackgrounds = createFilterItems<BackgroundItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
