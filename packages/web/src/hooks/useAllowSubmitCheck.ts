type ValueMap = {
  [key: string]: {
    isChanged: boolean;
    value: any;
  };
};

function hasMissingRequired(fields: string[], valueMap: ValueMap): boolean {
  return (
    fields.filter((f) => {
      const val = valueMap[f].value;
      return val === '' || val === null || val === undefined;
    }).length > 0
  );
}

export default function useAllowSubmitCheck(
  valueMap: ValueMap,
  requiredKeys: string[] = []
): boolean {
  const hasMissingField = hasMissingRequired(requiredKeys, valueMap);
  const hasSameValues = Object.keys(valueMap).reduce<boolean>(
    (acc, nextKey) => {
      if (!acc) {
        return acc;
      }
      return !valueMap[nextKey].isChanged;
    },
    true
  );

  return !hasMissingField && !hasSameValues;
}
