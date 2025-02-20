import { AnswersRepository } from '@/domain/forum/aplication/repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, left, right } from '../../../../core/either'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface ChooeseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooeseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooeseQuestionBestAnswerQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooeseQuestionBestAnswerUseCaseRequest): Promise<ChooeseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
