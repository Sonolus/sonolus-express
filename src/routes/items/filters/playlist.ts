import { PlaylistItemModel } from '../../../models/items/playlist'
import { createFilterItems } from './filter'

export const filterPlaylists = createFilterItems<PlaylistItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
