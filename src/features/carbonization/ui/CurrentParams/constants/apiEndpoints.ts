// Динамически формирует endpoints на основе числового ID печи
export const getApiEndpoints = (id: number) => {
  return {
    vr: `api/vr${id}-data`,
    notis: `api/notis${id}-data`,
  };
};

