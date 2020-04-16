import { PaginationArgs } from '../../types';
import { ActionTypeId, EntityTypeId } from './config/entity-types';
import { ClearType } from './model';

export type CreateNotificationInput = {
  actorId: string;
  entityTypeId: EntityTypeId;
  actionTypeId: ActionTypeId;
  entityId: string;
  recipientIds: string[];
};

export type NotificationsArgs = {
  pagination?: PaginationArgs;
};

export type NotificationsFilter = {
  isRead?: boolean;
  isSeen?: boolean;
};

export type NotificationsCountInput = {
  filter?: NotificationsFilter;
};

export type ClearNotificationsInput = {
  type: ClearType;
};

export type ClearNotificationsArgs = {
  input: ClearNotificationsInput;
};

export type UpdateNotificationInput = {
  isRead?: boolean;
  isSeen?: boolean;
};

export type UpdateNotificationArgs = {
  id: string;
  input: UpdateNotificationInput;
};
