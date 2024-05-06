import { SkinItemModel, toSkinItem } from '../../../api/skin-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultSkinListHandler: DefaultItemListHandler<SkinItemModel> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.skins, filterSkinItemsByKeywords, query, page)

export const filterSkinItemsByKeywords: FilterItemsByKeyword<SkinItemModel> = (items, keywords) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const skinListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.skinConfig, toSkinItem, session, req, res)
