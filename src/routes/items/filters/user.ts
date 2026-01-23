import { UserItemModel } from '../../../models/index.js'
import { createFilterItems } from './filter.js'

export const filterUsers = createFilterItems<UserItemModel>(['name', 'title', 'handle', 'tags'])
