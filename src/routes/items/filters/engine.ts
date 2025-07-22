import { EngineItemModel } from '../../../models/items/engine.js'
import { createFilterItems } from './filter.js'

export const filterEngines = createFilterItems<EngineItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
