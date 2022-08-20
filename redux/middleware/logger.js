const logger = (store) => (next) => (action) => {
  console.groupCollapsed(action.type);
  // console.log("prevState: ", store.getState());
  //console.log("action: ", action);
  const result = next(action);
  //console.log("newState: ", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
