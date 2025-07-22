import { Type } from '@sinclair/typebox'
import { ServiceUserId, ServiceUserProfile } from '@sonolus/core'
import { Expect } from '../../utils/test.js'
import { SchemaToMatch } from '../test.js'

export const serviceUserProfileSchema = Type.Object({
    id: Type.Unsafe<ServiceUserId>(Type.String()),
    handle: Type.String(),
    name: Type.String(),
    avatarType: Type.String(),
    avatarForegroundType: Type.String(),
    avatarForegroundColor: Type.String(),
    avatarBackgroundType: Type.String(),
    avatarBackgroundColor: Type.String(),
    bannerType: Type.String(),
    aboutMe: Type.String(),
    favorites: Type.Array(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof serviceUserProfileSchema, ServiceUserProfile>]>
