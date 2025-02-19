import { Either, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/aplication/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface fetchRecentQuestionsRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: fetchRecentQuestionsRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
