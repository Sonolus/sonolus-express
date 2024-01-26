import { DatabasePostItem } from 'sonolus-core'
import { toPostItem } from '../../../api/post-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultPostDetailsHandler: DefaultItemDetailsHandler<DatabasePostItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.posts, name)

export const postDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.posts, toPostItem, session, req, res)
