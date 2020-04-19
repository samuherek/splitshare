import equal from 'fast-deep-equal';

type ValueMap = {
  [key: string]: any;
};

function missingRequired(fields: string[], valueMap: ValueMap): boolean {
  return (
    fields.filter((f) => {
      const val = valueMap[f];
      return val === '' || val === null || val === undefined;
    }).length > 0
  );
}

// TODO: this was really quickly implemented. Instead let's use something like "fast-equals"
export default function useAllowSubmit(
  initialMap: ValueMap,
  nextMap: ValueMap,
  required: string[] = []
): boolean {
  const hasMissingField = missingRequired(required, nextMap);
  const hasSameValues = equal(initialMap, nextMap);

  return !hasMissingField && !hasSameValues;
}
