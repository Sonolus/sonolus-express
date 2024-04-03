import { DatabaseParticleItem } from '@sonolus/core'
import { toParticleItem } from '../../../api/particle-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultParticleListHandler: DefaultItemListHandler<DatabaseParticleItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.particles, filterParticleItemsByKeywords, query, page)

export const filterParticleItemsByKeywords: FilterItemsByKeyword<DatabaseParticleItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const particleListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.particleConfig, toParticleItem, session, req, res)
