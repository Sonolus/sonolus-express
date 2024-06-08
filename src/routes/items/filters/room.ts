import { RoomItemModel } from '../../../models/items/room'
import { createFilterItems } from './filter'

export const filterRooms = createFilterItems<RoomItemModel>([
    'name',
    'title',
    'subtitle',
    'master',
    'tags',
])
