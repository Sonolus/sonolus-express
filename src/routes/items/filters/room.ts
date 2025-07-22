import { RoomItemModel } from '../../../models/items/room.js'
import { createFilterItems } from './filter.js'

export const filterRooms = createFilterItems<RoomItemModel>([
    'name',
    'title',
    'subtitle',
    'master',
    'tags',
])
