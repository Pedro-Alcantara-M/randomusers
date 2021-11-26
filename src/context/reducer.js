const initialState = {
    gender: "",
    nat: ""
  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "Gender" : {
        return { ...state, gender: action.payload };
      }
      case "Nat" : {
        return { ...state, nat: action.payload };
      }
      default:
        return state;
    }
  }
  export { initialState, reducer }