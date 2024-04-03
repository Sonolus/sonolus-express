import { DatabaseBackgroundItem } from '@sonolus/core'
import { toBackgroundItem } from '../../../api/background-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultBackgroundListHandler: DefaultItemListHandler<DatabaseBackgroundItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.backgrounds, filterBackgroundItemsByKeywords, query, page)

export const filterBackgroundItemsByKeywords: FilterItemsByKeyword<DatabaseBackgroundItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const backgroundListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.backgroundConfig, toBackgroundItem, session, req, res)
