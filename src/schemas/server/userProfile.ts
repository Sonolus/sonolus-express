import { Type } from '@sinclair/typebox'
import { UserProfile } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const userProfileSchema = Type.Object({
    id: Type.String(),
    handle: Type.String(),
    name: Type.String(),
    avatarForegroundColor: Type.String(),
    avatarBackgroundColor: Type.String(),
    aboutMe: Type.String(),
    socialLinks: Type.Array(
        Type.Object({
            title: Type.String(),
            address: Type.String(),
        }),
    ),
    favorites: Type.Array(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof userProfileSchema, UserProfile>]>
