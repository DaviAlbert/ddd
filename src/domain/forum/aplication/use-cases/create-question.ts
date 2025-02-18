import { QuestionsRepository } from '@/domain/forum/aplication/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
      slug: Slug.createFromText(title),
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
