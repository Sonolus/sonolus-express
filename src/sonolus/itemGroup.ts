import { ItemType } from '@sonolus/core'
import { ItemModel, ToItem } from '../models/items/item'
import { ServerFormsModel } from '../models/server/forms/form'
import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ServerItemCommunityCommentListHandler,
    createServerItemCommunityCommentListRouteHandler,
} from '../routes/items/community/comments/list'
import {
    ServerPreUploadItemCommunityCommentActionHandler,
    createServerPreUploadItemCommunityCommentActionRouteHandler,
} from '../routes/items/community/comments/preUpload'
import {
    ServerSubmitItemCommunityCommentActionHandler,
    createServerSubmitItemCommunityCommentActionRouteHandler,
} from '../routes/items/community/comments/submit'
import {
    ServerUploadItemCommunityCommentActionHandler,
    createServerUploadItemCommunityCommentActionRouteHandler,
} from '../routes/items/community/comments/upload'
import {
    ServerItemCommunityInfoHandler,
    createServerItemCommunityInfoRouteHandler,
} from '../routes/items/community/info'
import {
    ServerPreUploadItemCommunityActionHandler,
    createServerPreUploadItemCommunityActionRouteHandler,
} from '../routes/items/community/preUpload'
import {
    ServerSubmitItemCommunityActionHandler,
    createServerSubmitItemCommunityActionRouteHandler,
} from '../routes/items/community/submit'
import {
    ServerUploadItemCommunityActionHandler,
    createServerUploadItemCommunityActionRouteHandler,
} from '../routes/items/community/upload'
import { ServerCreateItemHandler, createServerCreateItemRouteHandler } from '../routes/items/create'
import {
    ServerItemDetailsHandler,
    createDefaultServerItemDetailsHandler,
    createServerItemDetailsRouteHandler,
} from '../routes/items/details'
import { FilterItems } from '../routes/items/filters/filter'
import {
    ServerItemInfoHandler,
    createDefaultServerItemInfoHandler,
    createServerItemInfoRouteHandler,
} from '../routes/items/info'
import {
    ServerItemLeaderboardDetailsHandler,
    createServerItemLeaderboardDetailsRouteHandler,
} from '../routes/items/leaderboards/details'
import {
    ServerItemLeaderboardRecordDetailsHandler,
    createServerItemLeaderboardRecordDetailsRouteHandler,
} from '../routes/items/leaderboards/records/details'
import {
    ServerItemLeaderboardRecordListHandler,
    createServerItemLeaderboardRecordListRouteHandler,
} from '../routes/items/leaderboards/records/list'
import {
    ServerItemListHandler,
    createDefaultServerItemListHandler,
    createServerItemListRouteHandler,
} from '../routes/items/list'
import {
    ServerPreUploadItemHandler,
    createServerPreUploadItemRouteHandler,
} from '../routes/items/preUpload'
import {
    ServerPreUploadItemActionHandler,
    createServerPreUploadItemActionRouteHandler,
} from '../routes/items/preUploadAction'
import {
    ServerSubmitItemActionHandler,
    createServerSubmitItemActionRouteHandler,
} from '../routes/items/submitAction'
import { ServerUploadItemHandler, createServerUploadItemRouteHandler } from '../routes/items/upload'
import {
    ServerUploadItemActionHandler,
    createServerUploadItemActionRouteHandler,
} from '../routes/items/uploadAction'
import { SonolusBase } from './base'

export type SonolusItemGroupOptions<
    TCreates extends ServerFormsModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
    TCommunityCommentActions extends ServerFormsModel,
> = {
    creates?: TCreates
    searches?: TSearches
    actions?: TActions
    community?: {
        actions?: TCommunityActions
        comment?: {
            actions?: TCommunityCommentActions
        }
    }
}

export class SonolusItemGroup<
    TConfigurationOptions extends ServerOptionsModel,
    TItemModel extends ItemModel,
    TCreates extends ServerFormsModel,
    TSearches extends ServerFormsModel,
    TActions extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel,
    TCommunityCommentActions extends ServerFormsModel,
> {
    readonly type: ItemType
    items: TItemModel[]

    creates: TCreates
    searches: TSearches
    actions: TActions

    infoHandler: ServerItemInfoHandler<TConfigurationOptions, TCreates, TSearches>

    listHandler: ServerItemListHandler<TConfigurationOptions, TItemModel, TSearches>

    createHandler?: ServerCreateItemHandler<TConfigurationOptions, TCreates>
    preUploadHandler?: ServerPreUploadItemHandler<TConfigurationOptions>
    uploadHandler?: ServerUploadItemHandler<TConfigurationOptions>

    detailsHandler: ServerItemDetailsHandler<TConfigurationOptions, TSearches, TActions, TItemModel>

    submitActionHandler?: ServerSubmitItemActionHandler<TConfigurationOptions, TActions>
    preUploadActionHandler?: ServerPreUploadItemActionHandler<TConfigurationOptions>
    uploadActionHandler?: ServerUploadItemActionHandler<TConfigurationOptions>

    community: {
        actions: TCommunityActions

        infoHandler?: ServerItemCommunityInfoHandler<
            TConfigurationOptions,
            TCommunityActions,
            TCommunityCommentActions
        >

        submitHandler?: ServerSubmitItemCommunityActionHandler<
            TConfigurationOptions,
            TCommunityActions
        >
        preUploadHandler?: ServerPreUploadItemCommunityActionHandler<TConfigurationOptions>
        uploadHandler?: ServerUploadItemCommunityActionHandler<TConfigurationOptions>

        comment: {
            actions: TCommunityCommentActions

            listHandler?: ServerItemCommunityCommentListHandler<
                TConfigurationOptions,
                TCommunityCommentActions
            >

            submitHandler?: ServerSubmitItemCommunityCommentActionHandler<
                TConfigurationOptions,
                TCommunityCommentActions
            >
            preUploadHandler?: ServerPreUploadItemCommunityCommentActionHandler<TConfigurationOptions>
            uploadHandler?: ServerUploadItemCommunityCommentActionHandler<TConfigurationOptions>
        }
    }

    leaderboard: {
        detailsHandler?: ServerItemLeaderboardDetailsHandler<TConfigurationOptions>

        record: {
            listHandler?: ServerItemLeaderboardRecordListHandler<TConfigurationOptions>

            detailsHandler?: ServerItemLeaderboardRecordDetailsHandler<TConfigurationOptions>
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
        options: SonolusItemGroupOptions<
            TCreates,
            TSearches,
            TActions,
            TCommunityActions,
            TCommunityCommentActions
        > = {},
        toItem: ToItem<TItemModel, unknown>,
        filter: FilterItems<TItemModel>,
    ) {
        this.type = type
        this.items = []

        this.creates = options.creates ?? ({} as never)
        this.searches = options.searches ?? ({} as never)
        this.actions = options.actions ?? ({} as never)

        this.infoHandler = createDefaultServerItemInfoHandler(sonolus, this)

        this.listHandler = createDefaultServerItemListHandler(this, filter)

        this.detailsHandler = createDefaultServerItemDetailsHandler(this)

        this.community = {
            actions: options.community?.actions ?? ({} as never),

            comment: {
                actions: options.community?.comment?.actions ?? ({} as never),
            },
        }

        this.leaderboard = {
            record: {},
        }

        this._infoRouteHandler = createServerItemInfoRouteHandler(sonolus, this)

        this._listRouteHandler = createServerItemListRouteHandler(sonolus, this, toItem)

        this._createRouteHandler = createServerCreateItemRouteHandler(this)
        this._preUploadRouteHandler = createServerPreUploadItemRouteHandler(this)
        this._uploadRouteHandler = createServerUploadItemRouteHandler(this)

        this._detailsRouteHandler = createServerItemDetailsRouteHandler(sonolus, this, toItem)

        this._submitActionRouteHandler = createServerSubmitItemActionRouteHandler(this)
        this._preUploadActionRouteHandler = createServerPreUploadItemActionRouteHandler(this)
        this._uploadActionRouteHandler = createServerUploadItemActionRouteHandler(this)

        this._communityInfoRouteHandler = createServerItemCommunityInfoRouteHandler(this)

        this._communitySubmitRouteHandler = createServerSubmitItemCommunityActionRouteHandler(this)
        this._communityPreUploadRouteHandler =
            createServerPreUploadItemCommunityActionRouteHandler(this)
        this._communityUploadRouteHandler = createServerUploadItemCommunityActionRouteHandler(this)

        this._communityCommentListRouteHandler =
            createServerItemCommunityCommentListRouteHandler(this)

        this._communityCommentSubmitRouteHandler =
            createServerSubmitItemCommunityCommentActionRouteHandler(this)
        this._communityCommentPreUploadRouteHandler =
            createServerPreUploadItemCommunityCommentActionRouteHandler(this)
        this._communityCommentUploadRouteHandler =
            createServerUploadItemCommunityCommentActionRouteHandler(this)

        this._leaderboardDetailsRouteHandler = createServerItemLeaderboardDetailsRouteHandler(this)

        this._leaderboardRecordListRouteHandler =
            createServerItemLeaderboardRecordListRouteHandler(this)

        this._leaderboardRecordDetailsRouteHandler =
            createServerItemLeaderboardRecordDetailsRouteHandler(sonolus, this)
    }
}
