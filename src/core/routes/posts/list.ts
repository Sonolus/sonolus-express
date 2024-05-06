import { PostItemModel, toPostItem } from '../../../api/post-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultPostListHandler: DefaultItemListHandler<PostItemModel> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.posts, filterPostItemsByKeywords, query, page)

export const filterPostItemsByKeywords: FilterItemsByKeyword<PostItemModel> = (items, keywords) =>
    filterItemsByKeywords(items, ['name', 'title', 'author', 'tags', 'description'], keywords)

export const postListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.postConfig, toPostItem, session, req, res)
