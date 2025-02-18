import { QuestionsRepository } from '@/domain/forum/aplication/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface fetchRecentQuestionsRequest {
  page: number
}

interface fetchRecentQuestionsUseCaseResponse {
  question: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: fetchRecentQuestionsRequest): Promise<fetchRecentQuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findManyRecent({ page })

    return { question }
  }
}
