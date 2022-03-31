import createDataContext from "./createDataContext";

const reducer = (state, action) => {
<<<<<<< HEAD
    switch(action.type) {
        case 'addNote': 
            return ([...state, { title: `Note #${state.length + 1}`}])

        default:
            return (state)
    }
};
const addNotes = dispatch => {
    return () => {
        dispatch({type: 'addNote'})
    }
     
=======
  switch (action.type) {
    case "addNote":
      return [...state, { title: `Note #${state.length + 1}` }];

    default:
      return state;
  }
};
const addNotes = (dispatch) => {
  return () => {
    dispatch({ type: "addNote" });
  };
>>>>>>> production
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addNotes },
  []
);
