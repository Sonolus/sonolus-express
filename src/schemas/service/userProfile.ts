import { Type } from '@sinclair/typebox'
import { ServiceUserId, ServiceUserProfile } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const serviceUserProfileSchema = Type.Object({
    id: Type.Unsafe<ServiceUserId>(Type.String()),
    handle: Type.String(),
    name: Type.String(),
    avatarForegroundColor: Type.String(),
    avatarBackgroundColor: Type.String(),
    aboutMe: Type.String(),
    favorites: Type.Array(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof serviceUserProfileSchema, ServiceUserProfile>]>
