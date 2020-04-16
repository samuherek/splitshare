import gql from 'graphql-tag';

export default gql`
  enum NotificationType {
    BILL
    BILL_INVITE
    RECEIPT
  }

  enum NotificationAction {
    CREATED
    UPDATED
    DELETED
    ARCHIVED
  }

  enum ClearType {
    SEEN
    READ
  }

  union NotificationEntity = BillInvite

  type Notification {
    id: ID!
    isRead: Boolean!
    isSeen: Boolean!
    createdAt: DateTime!
    action: NotificationAction!
    entityType: NotificationType!
    actor: User!
    entity: NotificationEntity!
  }

  type NotificationEdges {
    node: Notification!
    cursor: String!
  }

  type NotificationConnection {
    edges: [NotificationEdges!]!
    pageInfo: PageInfo!
  }

  input NotificationsFilter {
    isRead: Boolean
    isSeen: Boolean
  }

  input ClearNotificationsInput {
    type: ClearType!
  }

  input UpdateNotificationInput {
    isRead: Boolean
    isSeen: Boolean
  }

  extend type Query {
    notifications(pagination: PaginationInput): NotificationConnection!
    notificationsCount(filter: NotificationsFilter): Int!
  }

  extend type Mutation {
    updateNotification(id: ID!, input: UpdateNotificationInput!): Notification!
    clearNotifications(input: ClearNotificationsInput!): Boolean!
  }
`;
