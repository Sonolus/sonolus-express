import { ParticleItemModel } from '../../../models/items/particle'
import { createFilterItems } from './filter'

export const filterParticles = createFilterItems<ParticleItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
