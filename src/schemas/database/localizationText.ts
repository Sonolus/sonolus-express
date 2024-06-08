import { Type } from '@sinclair/typebox'
import { LocalizationText } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const localizationTextSchema = Type.Record(Type.String(), Type.String())

type _Tests = Expect<[SchemaToMatch<typeof localizationTextSchema, LocalizationText>]>
