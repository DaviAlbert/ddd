import { Answer } from '../../enterprise/entities/answer'
import { PaginationParams } from './pagination-params'

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(question: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
