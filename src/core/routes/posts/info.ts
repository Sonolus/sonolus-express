import { DatabasePostItem } from 'sonolus-core'
import { toPostItem } from '../../../api/post-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultPostInfoHandler: DefaultItemInfoHandler<DatabasePostItem> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.posts)

export const postInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.postConfig, toPostItem, session, req, res)
