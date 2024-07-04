import { ItemType } from '@sonolus/core'
import { ServerFormsModel } from '../models/forms/form'
import { ItemModel, ToItem } from '../models/items/item'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ItemCommunityCommentListHandler,
    createItemCommunityCommentListRouteHandler,
    defaultItemCommunityCommentListHandler,
} from '../routes/items/community/comments/list'
import {
    ItemCommunityCommentSubmitHandler,
    createItemCommunityCommentSubmitRouteHandler,
    defaultItemCommunityCommentSubmitHandler,
} from '../routes/items/community/comments/submit'
import {
    ItemCommunityInfoHandler,
    createItemCommunityInfoRouteHandler,
    defaultItemCommunityInfoHandler,
} from '../routes/items/community/info'
import {
    ItemCommunitySubmitHandler,
    createItemCommunitySubmitRouteHandler,
    defaultItemCommunitySubmitHandler,
} from '../routes/items/community/submit'
import {
    ItemCreateHandler,
    createItemCreateRouteHandler,
    defaultItemCreateHandler,
} from '../routes/items/create'
import {
    ItemDetailsHandler,
    createDefaultItemDetailsHandler,
    createItemDetailsRouteHandler,
} from '../routes/items/details'
import { FilterItems } from '../routes/items/filters/filter'
import {
    ItemInfoHandler,
    createDefaultItemInfoHandler,
    createItemInfoRouteHandler,
} from '../routes/items/info'
import {
    ItemLeaderboardDetailsHandler,
    createItemLeaderboardDetailsRouteHandler,
    defaultItemLeaderboardDetailsHandler,
} from '../routes/items/leaderboards/details'
import {
    ItemLeaderboardRecordDetailsHandler,
    createItemLeaderboardRecordDetailsRouteHandler,
    defaultItemLeaderboardRecordDetailsHandler,
} from '../routes/items/leaderboards/records/details'
import {
    ItemLeaderboardRecordListHandler,
    createItemLeaderboardRecordListRouteHandler,
    defaultItemLeaderboardRecordListHandler,
} from '../routes/items/leaderboards/records/list'
import {
    ItemListHandler,
    createDefaultItemListHandler,
    createItemListRouteHandler,
} from '../routes/items/list'
import {
    ItemPreUploadHandler,
    createItemPreUploadRouteHandler,
    defaultItemPreUploadHandler,
} from '../routes/items/preUpload'
import {
    ItemUploadHandler,
    createItemUploadRouteHandler,
    defaultItemUploadHandler,
} from '../routes/items/upload'
import { SonolusBase } from './base'

export type SonolusItemGroupOptions<
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
> = {
    creates?: TCreates
    searches?: TSearches
    community?: {
        actions?: TCommunityActions
    }
}

export class SonolusItemGroup<
    TItemModel extends ItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
> {
    readonly type: ItemType
    items: TItemModel[]

    creates: TCreates
    searches: TSearches

    infoHandler: ItemInfoHandler<TCreates, TSearches>
    listHandler: ItemListHandler<TItemModel, TSearches>
    createHandler: ItemCreateHandler<TCreates>
    preUploadHandler: ItemPreUploadHandler
    uploadHandler: ItemUploadHandler
    detailsHandler: ItemDetailsHandler<TItemModel>

    community: {
        actions: TCommunityActions

        infoHandler: ItemCommunityInfoHandler<TCommunityActions>
        submitHandler: ItemCommunitySubmitHandler<TCommunityActions>

        comment: {
            listHandler: ItemCommunityCommentListHandler<TCommunityActions>
            submitHandler: ItemCommunityCommentSubmitHandler<TCommunityActions>
        }
    }

    leaderboard: {
        detailsHandler: ItemLeaderboardDetailsHandler

        record: {
            listHandler: ItemLeaderboardRecordListHandler
            detailsHandler: ItemLeaderboardRecordDetailsHandler
        }
    }

    private readonly _infoRouteHandler: SonolusRouteHandler
    private readonly _listRouteHandler: SonolusRouteHandler
    private readonly _createRouteHandler: SonolusRouteHandler
    private readonly _preUploadRouteHandler: SonolusRouteHandler
    private readonly _uploadRouteHandler: SonolusRouteHandler
    private readonly _detailsRouteHandler: SonolusRouteHandler
    private readonly _communityInfoRouteHandler: SonolusRouteHandler
    private readonly _communitySubmitRouteHandler: SonolusRouteHandler
    private readonly _communityCommentListRouteHandler: SonolusRouteHandler
    private readonly _communityCommentSubmitRouteHandler: SonolusRouteHandler
    private readonly _leaderboardDetailsRouteHandler: SonolusRouteHandler
    private readonly _leaderboardRecordListRouteHandler: SonolusRouteHandler
    private readonly _leaderboardRecordDetailsRouteHandler: SonolusRouteHandler

    constructor(
        sonolus: SonolusBase,
        type: ItemType,
        options: SonolusItemGroupOptions<TCreates, TSearches, TCommunityActions> = {},
        toItem: ToItem<TItemModel, unknown>,
        filter: FilterItems<TItemModel>,
    ) {
        this.type = type
        this.items = []

        this.creates = options.creates as never
        this.searches = options.searches ?? ({} as never)

        this.infoHandler = createDefaultItemInfoHandler(sonolus, this)
        this.listHandler = createDefaultItemListHandler(this, filter)
        this.createHandler = defaultItemCreateHandler
        this.preUploadHandler = defaultItemPreUploadHandler
        this.uploadHandler = defaultItemUploadHandler
        this.detailsHandler = createDefaultItemDetailsHandler(this)

        this.community = {
            actions: options.community?.actions ?? ({} as never),

            infoHandler: defaultItemCommunityInfoHandler,
            submitHandler: defaultItemCommunitySubmitHandler,

            comment: {
                listHandler: defaultItemCommunityCommentListHandler,
                submitHandler: defaultItemCommunityCommentSubmitHandler,
            },
        }

        this.leaderboard = {
            detailsHandler: defaultItemLeaderboardDetailsHandler,

            record: {
                listHandler: defaultItemLeaderboardRecordListHandler,
                detailsHandler: defaultItemLeaderboardRecordDetailsHandler,
            },
        }

        this._infoRouteHandler = createItemInfoRouteHandler(sonolus, this)
        this._listRouteHandler = createItemListRouteHandler(sonolus, this, toItem)
        this._detailsRouteHandler = createItemDetailsRouteHandler(sonolus, this, toItem)
        this._createRouteHandler = createItemCreateRouteHandler(this)
        this._preUploadRouteHandler = createItemPreUploadRouteHandler(this)
        this._uploadRouteHandler = createItemUploadRouteHandler(this)
        this._communityInfoRouteHandler = createItemCommunityInfoRouteHandler(this)
        this._communitySubmitRouteHandler = createItemCommunitySubmitRouteHandler(this)
        this._communityCommentListRouteHandler = createItemCommunityCommentListRouteHandler(this)
        this._communityCommentSubmitRouteHandler =
            createItemCommunityCommentSubmitRouteHandler(this)
        this._leaderboardDetailsRouteHandler = createItemLeaderboardDetailsRouteHandler(this)
        this._leaderboardRecordListRouteHandler = createItemLeaderboardRecordListRouteHandler(this)
        this._leaderboardRecordDetailsRouteHandler = createItemLeaderboardRecordDetailsRouteHandler(
            sonolus,
            this,
        )
    }
}
