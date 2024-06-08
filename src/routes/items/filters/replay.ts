import { ReplayItemModel } from '../../../models/items/replay'
import { createFilterItems } from './filter'

export const filterReplays = createFilterItems<ReplayItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
