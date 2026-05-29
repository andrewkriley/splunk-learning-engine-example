import type { Question } from '../../../types'
import { advancedPowerUserChunk1 } from './chunk1'
import { advancedPowerUserChunk2 } from './chunk2'
import { advancedPowerUserChunk3 } from './chunk3'

export const advancedPowerUserQuestions: Question[] = [
  ...advancedPowerUserChunk1,
  ...advancedPowerUserChunk2,
  ...advancedPowerUserChunk3,
]
