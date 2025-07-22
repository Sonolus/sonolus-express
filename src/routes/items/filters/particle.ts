import { ParticleItemModel } from '../../../models/items/particle.js'
import { createFilterItems } from './filter.js'

export const filterParticles = createFilterItems<ParticleItemModel>([
    'name',
    'title',
    'subtitle',
    'author',
    'tags',
    'description',
])
