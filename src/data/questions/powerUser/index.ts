import type { Question } from '../../../types'
import { powerUserChunk1 } from './chunk1'
import { powerUserChunk2 } from './chunk2'

export const powerUserQuestions: Question[] = [
  ...powerUserChunk1,
  ...powerUserChunk2,
]
