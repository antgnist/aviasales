export const inc = () => ({ type: 'INC' });

export const dec = () => ({ type: 'DEC' });

export const rnd = () => ({
  type: 'RND',
  payload: Math.floor(Math.random() * 10),
});

export const test = () => ({ type: 'TEST' });

export const setVisibleCount = (payload: number) => ({
  type: 'SET_VISIBLE_COUNT',
  payload,
});

export const setFastSort = () => ({ type: 'SET_FAST_SORT' });
export const setPriceSort = () => ({ type: 'SET_PRICE_SORT' });
export const setOptimalSort = () => ({ type: 'SET_OPTIMAL_SORT' });

export const changeAnyFilter = (payload: string) => ({
  type: 'CHANGE_ANY_FILTER',
  payload,
});
