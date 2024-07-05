import { ItemType } from '@sonolus/core'
import { ServerFormsModel } from '../models/forms/form'
import { ItemModel, ToItem } from '../models/items/item'
import { ServerOptionsModel } from '../models/options/option'
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
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel extends ItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
> {
    readonly type: ItemType
    items: TItemModel[]

    creates: TCreates
    searches: TSearches

    infoHandler: ItemInfoHandler<TConfigurationOptions, TCreates, TSearches>
    listHandler: ItemListHandler<TConfigurationOptions, TItemModel, TSearches>
    createHandler: ItemCreateHandler<TConfigurationOptions, TCreates>
    preUploadHandler: ItemPreUploadHandler<TConfigurationOptions>
    uploadHandler: ItemUploadHandler<TConfigurationOptions>
    detailsHandler: ItemDetailsHandler<TConfigurationOptions, TItemModel>

    community: {
        actions: TCommunityActions

        infoHandler: ItemCommunityInfoHandler<TConfigurationOptions, TCommunityActions>
        submitHandler: ItemCommunitySubmitHandler<TConfigurationOptions, TCommunityActions>

        comment: {
            listHandler: ItemCommunityCommentListHandler<TConfigurationOptions, TCommunityActions>
            submitHandler: ItemCommunityCommentSubmitHandler<
                TConfigurationOptions,
                TCommunityActions
            >
        }
    }

    leaderboard: {
        detailsHandler: ItemLeaderboardDetailsHandler<TConfigurationOptions>

        record: {
            listHandler: ItemLeaderboardRecordListHandler<TConfigurationOptions>
            detailsHandler: ItemLeaderboardRecordDetailsHandler<TConfigurationOptions>
        }
    }

    private readonly _infoRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _listRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _createRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _preUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _uploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _detailsRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityInfoRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communitySubmitRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityCommentListRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityCommentSubmitRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _leaderboardDetailsRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _leaderboardRecordListRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _leaderboardRecordDetailsRouteHandler: SonolusRouteHandler<TConfigurationOptions>

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
