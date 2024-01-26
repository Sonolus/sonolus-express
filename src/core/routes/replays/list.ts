import { DatabaseReplayItem } from 'sonolus-core'
import { toReplayItem } from '../../../api/replay-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultReplayListHandler: DefaultItemListHandler<DatabaseReplayItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.replays, filterReplayItemsByKeywords, query, page)

export const filterReplayItemsByKeywords: FilterItemsByKeyword<DatabaseReplayItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const replayListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.replays, toReplayItem, session, req, res)
