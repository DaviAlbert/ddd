import { Notification } from '@/domain/notificaction/enterprise/entities/notification'

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>
}
