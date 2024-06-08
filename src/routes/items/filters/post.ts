import { PostItemModel } from '../../../models/items/post'
import { createFilterItems } from './filter'

export const filterPosts = createFilterItems<PostItemModel>([
    'name',
    'title',
    'author',
    'tags',
    'description',
])
