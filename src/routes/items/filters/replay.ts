import { ReplayItemModel } from '../../../models/items/replay.js'
import { createFilterItems } from './filter.js'

export const filterReplays = createFilterItems<ReplayItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
