import type { Question } from '../../../types'
import { cloudAdminChunk1 } from './chunk1'
import { cloudAdminChunk2 } from './chunk2'

export const cloudAdminQuestions: Question[] = [
  ...cloudAdminChunk1,
  ...cloudAdminChunk2,
]
