import { EngineItemModel } from '../../../models/items/engine'
import { createFilterItems } from './filter'

export const filterEngines = createFilterItems<EngineItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
