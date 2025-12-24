export const reorderObject = <T extends Record<string, unknown>>(
  data: T | undefined,
  order: string[]
): T | undefined => {
  if (!data) return undefined;

  const reordered: Record<string, unknown> = {};
  const existingKeys = new Set(Object.keys(data));

  for (const key of order) {
    if (existingKeys.has(key)) {
      reordered[key] = data[key];
    }
  }

  for (const key of Object.keys(data)) {
    if (!order.includes(key)) {
      reordered[key] = data[key];
    }
  }

  return reordered as T;
};

