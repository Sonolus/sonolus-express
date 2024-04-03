import { CreateRoomResponse } from '@sonolus/core'
import { Localize } from './localization'
import { SectionsModel, toSections } from './section/section'

export const toCreateRoomResponse = (
    localize: Localize,
    name: string,
    key: string,
    creates: SectionsModel,
): CreateRoomResponse => ({
    name,
    key,
    creates: toSections(localize, creates),
})
