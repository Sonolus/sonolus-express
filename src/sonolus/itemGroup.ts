import { ItemType } from '@sonolus/core'
import { ItemModel, ToItem } from '../models/items/item'
import { ServerFormsModel } from '../models/server/forms/form'
import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ServerItemCommunityCommentListHandler,
    createServerItemCommunityCommentListRouteHandler,
    defaultServerItemCommunityCommentListHandler,
} from '../routes/items/community/comments/list'
import {
    ServerPreUploadItemCommunityCommentActionHandler,
    createServerPreUploadItemCommunityCommentActionRouteHandler,
    defaultServerPreUploadItemCommunityCommentActionHandler,
} from '../routes/items/community/comments/preUpload'
import {
    ServerSubmitItemCommunityCommentActionHandler,
    createServerSubmitItemCommunityCommentActionRouteHandler,
    defaultServerSubmitItemCommunityCommentActionHandler,
} from '../routes/items/community/comments/submit'
import {
    ServerUploadItemCommunityCommentActionHandler,
    createServerUploadItemCommunityCommentActionRouteHandler,
    defaultServerUploadItemCommunityCommentActionHandler,
} from '../routes/items/community/comments/upload'
import {
    ServerItemCommunityInfoHandler,
    createServerItemCommunityInfoRouteHandler,
    defaultServerItemCommunityInfoHandler,
} from '../routes/items/community/info'
import {
    ServerPreUploadItemCommunityActionHandler,
    createServerPreUploadItemCommunityActionRouteHandler,
    defaultServerPreUploadItemCommunityActionHandler,
} from '../routes/items/community/preUpload'
import {
    ServerSubmitItemCommunityActionHandler,
    createServerSubmitItemCommunityActionRouteHandler,
    defaultServerSubmitItemCommunityActionHandler,
} from '../routes/items/community/submit'
import {
    ServerUploadItemCommunityActionHandler,
    createServerUploadItemCommunityActionRouteHandler,
    defaultServerUploadItemCommunityActionHandler,
} from '../routes/items/community/upload'
import {
    ServerCreateItemHandler,
    createServerCreateItemRouteHandler,
    defaultServerCreateItemHandler,
} from '../routes/items/create'
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
    defaultServerItemLeaderboardDetailsHandler,
} from '../routes/items/leaderboards/details'
import {
    ServerItemLeaderboardRecordDetailsHandler,
    createServerItemLeaderboardRecordDetailsRouteHandler,
    defaultServerItemLeaderboardRecordDetailsHandler,
} from '../routes/items/leaderboards/records/details'
import {
    ServerItemLeaderboardRecordListHandler,
    createServerItemLeaderboardRecordListRouteHandler,
    defaultServerItemLeaderboardRecordListHandler,
} from '../routes/items/leaderboards/records/list'
import {
    ServerItemListHandler,
    createDefaultServerItemListHandler,
    createServerItemListRouteHandler,
} from '../routes/items/list'
import {
    ServerPreUploadItemHandler,
    createServerPreUploadItemRouteHandler,
    defaultServerPreUploadItemHandler,
} from '../routes/items/preUpload'
import {
    ServerPreUploadItemActionHandler,
    createServerPreUploadItemActionRouteHandler,
    defaultServerPreUploadItemActionHandler,
} from '../routes/items/preUploadAction'
import {
    ServerSubmitItemActionHandler,
    createServerSubmitItemActionRouteHandler,
    defaultServerSubmitItemActionHandler,
} from '../routes/items/submitAction'
import {
    ServerUploadItemHandler,
    createServerUploadItemRouteHandler,
    defaultServerUploadServerHandler,
} from '../routes/items/upload'
import {
    ServerUploadItemActionHandler,
    createServerUploadItemActionRouteHandler,
    defaultServerUploadItemActionHandler,
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

    infoHandler: ServerItemInfoHandler<TConfigurationOptions, TCreates, TSearches>

    listHandler: ServerItemListHandler<TConfigurationOptions, TItemModel, TSearches>

    createHandler: ServerCreateItemHandler<TConfigurationOptions, TCreates>
    preUploadHandler: ServerPreUploadItemHandler<TConfigurationOptions>
    uploadHandler: ServerUploadItemHandler<TConfigurationOptions>

    detailsHandler: ServerItemDetailsHandler<TConfigurationOptions, TSearches, TActions, TItemModel>

    submitActionHandler: ServerSubmitItemActionHandler<TConfigurationOptions, TActions>
    preUploadActionHandler: ServerPreUploadItemActionHandler<TConfigurationOptions>
    uploadActionHandler: ServerUploadItemActionHandler<TConfigurationOptions>

    community: {
        actions: TCommunityActions

        infoHandler: ServerItemCommunityInfoHandler<TConfigurationOptions, TCommunityActions>

        submitHandler: ServerSubmitItemCommunityActionHandler<
            TConfigurationOptions,
            TCommunityActions
        >
        preUploadHandler: ServerPreUploadItemCommunityActionHandler<TConfigurationOptions>
        uploadHandler: ServerUploadItemCommunityActionHandler<TConfigurationOptions>

        comment: {
            listHandler: ServerItemCommunityCommentListHandler<
                TConfigurationOptions,
                TCommunityActions
            >

            submitHandler: ServerSubmitItemCommunityCommentActionHandler<
                TConfigurationOptions,
                TCommunityActions
            >
            preUploadHandler: ServerPreUploadItemCommunityCommentActionHandler<TConfigurationOptions>
            uploadHandler: ServerUploadItemCommunityCommentActionHandler<TConfigurationOptions>
        }
    }

    leaderboard: {
        detailsHandler: ServerItemLeaderboardDetailsHandler<TConfigurationOptions>

        record: {
            listHandler: ServerItemLeaderboardRecordListHandler<TConfigurationOptions>

            detailsHandler: ServerItemLeaderboardRecordDetailsHandler<TConfigurationOptions>
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

        this.infoHandler = createDefaultServerItemInfoHandler(sonolus, this)

        this.listHandler = createDefaultServerItemListHandler(this, filter)

        this.createHandler = defaultServerCreateItemHandler
        this.preUploadHandler = defaultServerPreUploadItemHandler
        this.uploadHandler = defaultServerUploadServerHandler

        this.detailsHandler = createDefaultServerItemDetailsHandler(this)

        this.submitActionHandler = defaultServerSubmitItemActionHandler
        this.preUploadActionHandler = defaultServerPreUploadItemActionHandler
        this.uploadActionHandler = defaultServerUploadItemActionHandler

        this.community = {
            actions: options.community?.actions ?? ({} as never),

            infoHandler: defaultServerItemCommunityInfoHandler,

            submitHandler: defaultServerSubmitItemCommunityActionHandler,
            preUploadHandler: defaultServerPreUploadItemCommunityActionHandler,
            uploadHandler: defaultServerUploadItemCommunityActionHandler,

            comment: {
                listHandler: defaultServerItemCommunityCommentListHandler,

                submitHandler: defaultServerSubmitItemCommunityCommentActionHandler,
                preUploadHandler: defaultServerPreUploadItemCommunityCommentActionHandler,
                uploadHandler: defaultServerUploadItemCommunityCommentActionHandler,
            },
        }

        this.leaderboard = {
            detailsHandler: defaultServerItemLeaderboardDetailsHandler,

            record: {
                listHandler: defaultServerItemLeaderboardRecordListHandler,

                detailsHandler: defaultServerItemLeaderboardRecordDetailsHandler,
            },
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
