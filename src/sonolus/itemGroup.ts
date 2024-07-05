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
    ItemCommunityCommentPreUploadHandler,
    createItemCommunityCommentPreUploadRouteHandler,
    defaultItemCommunityCommentPreUploadHandler,
} from '../routes/items/community/comments/preUpload'
import {
    ItemCommunityCommentSubmitHandler,
    createItemCommunityCommentSubmitRouteHandler,
    defaultItemCommunityCommentSubmitHandler,
} from '../routes/items/community/comments/submit'
import {
    ItemCommunityCommentUploadHandler,
    createItemCommunityCommentUploadRouteHandler,
    defaultItemCommunityCommentUploadHandler,
} from '../routes/items/community/comments/upload'
import {
    ItemCommunityInfoHandler,
    createItemCommunityInfoRouteHandler,
    defaultItemCommunityInfoHandler,
} from '../routes/items/community/info'
import {
    ItemCommunityPreUploadHandler,
    createItemCommunityPreUploadRouteHandler,
    defaultItemCommunityPreUploadHandler,
} from '../routes/items/community/preUpload'
import {
    ItemCommunitySubmitHandler,
    createItemCommunitySubmitRouteHandler,
    defaultItemCommunitySubmitHandler,
} from '../routes/items/community/submit'
import {
    ItemCommunityUploadHandler,
    createItemCommunityUploadRouteHandler,
    defaultItemCommunityUploadHandler,
} from '../routes/items/community/upload'
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
    ItemPreUploadActionHandler,
    createItemPreUploadActionRouteHandler,
    defaultItemPreUploadActionHandler,
} from '../routes/items/preUploadAction'
import {
    ItemSubmitActionHandler,
    createItemSubmitActionRouteHandler,
    defaultItemSubmitActionHandler,
} from '../routes/items/submitAction'
import {
    ItemUploadHandler,
    createItemUploadRouteHandler,
    defaultItemUploadHandler,
} from '../routes/items/upload'
import {
    ItemUploadActionHandler,
    createItemUploadActionRouteHandler,
    defaultItemUploadActionHandler,
} from '../routes/items/uploadAction'
import { SonolusBase } from './base'

export type SonolusItemGroupOptions<
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
> = {
    creates?: TCreates
    searches?: TSearches
    actions?: TActions
    community?: {
        actions?: TCommunityActions
    }
}

export class SonolusItemGroup<
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel extends ItemModel,
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
> {
    readonly type: ItemType
    items: TItemModel[]

    creates: TCreates
    searches: TSearches
    actions: TActions

    infoHandler: ItemInfoHandler<TConfigurationOptions, TCreates, TSearches>

    listHandler: ItemListHandler<TConfigurationOptions, TItemModel, TSearches>

    createHandler: ItemCreateHandler<TConfigurationOptions, TCreates>
    preUploadHandler: ItemPreUploadHandler<TConfigurationOptions>
    uploadHandler: ItemUploadHandler<TConfigurationOptions>

    detailsHandler: ItemDetailsHandler<TConfigurationOptions, TActions, TItemModel>

    submitActionHandler: ItemSubmitActionHandler<TConfigurationOptions, TActions>
    preUploadActionHandler: ItemPreUploadActionHandler<TConfigurationOptions>
    uploadActionHandler: ItemUploadActionHandler<TConfigurationOptions>

    community: {
        actions: TCommunityActions

        infoHandler: ItemCommunityInfoHandler<TConfigurationOptions, TCommunityActions>

        submitHandler: ItemCommunitySubmitHandler<TConfigurationOptions, TCommunityActions>
        preUploadHandler: ItemCommunityPreUploadHandler<TConfigurationOptions>
        uploadHandler: ItemCommunityUploadHandler<TConfigurationOptions>

        comment: {
            listHandler: ItemCommunityCommentListHandler<TConfigurationOptions, TCommunityActions>

            submitHandler: ItemCommunityCommentSubmitHandler<
                TConfigurationOptions,
                TCommunityActions
            >
            preUploadHandler: ItemCommunityCommentPreUploadHandler<TConfigurationOptions>
            uploadHandler: ItemCommunityCommentUploadHandler<TConfigurationOptions>
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

    private readonly _submitActionRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _preUploadActionRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _uploadActionRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _communityInfoRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _communitySubmitRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityPreUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _communityCommentListRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _communityCommentSubmitRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityCommentPreUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _communityCommentUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _leaderboardDetailsRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _leaderboardRecordListRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _leaderboardRecordDetailsRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    constructor(
        sonolus: SonolusBase,
        type: ItemType,
        options: SonolusItemGroupOptions<TCreates, TSearches, TActions, TCommunityActions> = {},
        toItem: ToItem<TItemModel, unknown>,
        filter: FilterItems<TItemModel>,
    ) {
        this.type = type
        this.items = []

        this.creates = options.creates as never
        this.searches = options.searches ?? ({} as never)
        this.actions = options.actions ?? ({} as never)

        this.infoHandler = createDefaultItemInfoHandler(sonolus, this)

        this.listHandler = createDefaultItemListHandler(this, filter)

        this.createHandler = defaultItemCreateHandler
        this.preUploadHandler = defaultItemPreUploadHandler
        this.uploadHandler = defaultItemUploadHandler

        this.detailsHandler = createDefaultItemDetailsHandler(this)

        this.submitActionHandler = defaultItemSubmitActionHandler
        this.preUploadActionHandler = defaultItemPreUploadActionHandler
        this.uploadActionHandler = defaultItemUploadActionHandler

        this.community = {
            actions: options.community?.actions ?? ({} as never),

            infoHandler: defaultItemCommunityInfoHandler,

            submitHandler: defaultItemCommunitySubmitHandler,
            preUploadHandler: defaultItemCommunityPreUploadHandler,
            uploadHandler: defaultItemCommunityUploadHandler,

            comment: {
                listHandler: defaultItemCommunityCommentListHandler,

                submitHandler: defaultItemCommunityCommentSubmitHandler,
                preUploadHandler: defaultItemCommunityCommentPreUploadHandler,
                uploadHandler: defaultItemCommunityCommentUploadHandler,
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

        this._createRouteHandler = createItemCreateRouteHandler(this)
        this._preUploadRouteHandler = createItemPreUploadRouteHandler(this)
        this._uploadRouteHandler = createItemUploadRouteHandler(this)

        this._detailsRouteHandler = createItemDetailsRouteHandler(sonolus, this, toItem)

        this._submitActionRouteHandler = createItemSubmitActionRouteHandler(this)
        this._preUploadActionRouteHandler = createItemPreUploadActionRouteHandler(this)
        this._uploadActionRouteHandler = createItemUploadActionRouteHandler(this)

        this._communityInfoRouteHandler = createItemCommunityInfoRouteHandler(this)

        this._communitySubmitRouteHandler = createItemCommunitySubmitRouteHandler(this)
        this._communityPreUploadRouteHandler = createItemCommunityPreUploadRouteHandler(this)
        this._communityUploadRouteHandler = createItemCommunityUploadRouteHandler(this)

        this._communityCommentListRouteHandler = createItemCommunityCommentListRouteHandler(this)

        this._communityCommentSubmitRouteHandler =
            createItemCommunityCommentSubmitRouteHandler(this)
        this._communityCommentPreUploadRouteHandler =
            createItemCommunityCommentPreUploadRouteHandler(this)
        this._communityCommentUploadRouteHandler =
            createItemCommunityCommentUploadRouteHandler(this)

        this._leaderboardDetailsRouteHandler = createItemLeaderboardDetailsRouteHandler(this)

        this._leaderboardRecordListRouteHandler = createItemLeaderboardRecordListRouteHandler(this)

        this._leaderboardRecordDetailsRouteHandler = createItemLeaderboardRecordDetailsRouteHandler(
            sonolus,
            this,
        )
    }
}
