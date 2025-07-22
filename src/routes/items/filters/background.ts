import { BackgroundItemModel } from '../../../models/items/background.js'
import { createFilterItems } from './filter.js'

export const filterBackgrounds = createFilterItems<BackgroundItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
