const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  console.log('Middleware:', store.getState());

  return result;
};

export default loggerMiddleware;
