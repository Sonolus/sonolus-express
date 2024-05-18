import { CreateRoomResponse } from '@sonolus/core'
import { ServerFormsModel, toServerForms } from './form/form'
import { Localize } from './localization'

export const toCreateRoomResponse = (
    localize: Localize,
    name: string,
    key: string,
    creates: ServerFormsModel,
): CreateRoomResponse => ({
    name,
    key,
    creates: toServerForms(localize, creates),
})
