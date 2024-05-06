import { BackgroundItemModel, toBackgroundItem } from '../../../api/background-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultBackgroundListHandler: DefaultItemListHandler<BackgroundItemModel> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.backgrounds, filterBackgroundItemsByKeywords, query, page)

export const filterBackgroundItemsByKeywords: FilterItemsByKeyword<BackgroundItemModel> = (
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
