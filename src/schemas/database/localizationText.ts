import { Type } from '@sinclair/typebox'
import { LocalizationText } from '@sonolus/core'
import { Expect } from '../../utils/test.js'
import { SchemaToMatch } from '../test.js'

export const localizationTextSchema = Type.Record(Type.String(), Type.String())

type _Tests = Expect<[SchemaToMatch<typeof localizationTextSchema, LocalizationText>]>
