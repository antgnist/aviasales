export const inc = () => ({ type: 'INC' });

export const dec = () => ({ type: 'DEC' });

export const rnd = (payload: number) => ({ type: 'RND', payload });
