import { PlaylistItemModel } from '../../../models/items/playlist.js'
import { createFilterItems } from './filter.js'

export const filterPlaylists = createFilterItems<PlaylistItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
