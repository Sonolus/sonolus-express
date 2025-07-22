import { PostItemModel } from '../../../models/items/post.js'
import { createFilterItems } from './filter.js'

export const filterPosts = createFilterItems<PostItemModel>([
    'name',
    'title',
    'author',
    'tags',
    'description',
])
