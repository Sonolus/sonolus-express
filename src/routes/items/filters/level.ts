import { LevelItemModel } from '../../../models/items/level.js'
import { createFilterItems } from './filter.js'

export const filterLevels = createFilterItems<LevelItemModel>([
    'name',
    'rating',
    'title',
    'artists',
    'author',
    'tags',
    'description',
])
