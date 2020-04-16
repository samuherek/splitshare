export type EntityTypeId = number;
export type ActionTypeId = number;
export type IdType = number;

export const ENTITY_TYPE = {
  BILL: 1,
  BILL_INVITE: 2,
  RECEIPT: 3,
};

export const ACTION_TYPE = {
  CREATED: 1,
  UPDATED: 2,
  DELETED: 3,
  ARCHIVED: 4,
};

export const NotificationUtils = {
  getEntity: (id: number) => {
    const entry = Object.entries(ENTITY_TYPE).find(
      ([_, value]) => value === id
    );

    if (!entry) {
      throw new Error('Could not find such notification entity');
    }

    return entry[0];
  },
  getAction: (id: number) => {
    const entry = Object.entries(ACTION_TYPE).find(
      ([_, value]) => value === id
    );

    if (!entry) {
      throw new Error('Could not find such notification action');
    }

    return entry[0];
  },
  sameType: (id: number, compare: number) => {
    return id === compare;
  },
};
