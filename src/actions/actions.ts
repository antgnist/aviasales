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

export const setSortPrice = () => ({ type: 'SET_SORT_PRICE' });

export const setSortFast = () => ({ type: 'SET_SORT_FAST' });
