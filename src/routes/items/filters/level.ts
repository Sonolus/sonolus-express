import { LevelItemModel } from '../../../models/items/level'
import { createFilterItems } from './filter'

export const filterLevels = createFilterItems<LevelItemModel>([
    'name',
    'rating',
    'title',
    'artists',
    'author',
    'tags',
    'description',
])
