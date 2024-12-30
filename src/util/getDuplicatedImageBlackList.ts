const getDuplicatedBlackList = (array: string[]): string[] => {
  const counts: Record<string, number> = array.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const duplicateArray = Object.keys(counts).filter(
    (key) => counts[key as string] > 2,
  ) as string[];

  return duplicateArray;
};

export { getDuplicatedBlackList };
