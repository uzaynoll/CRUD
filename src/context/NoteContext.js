import createDataContext from "./createDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "addNote":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "deleteNote":
      return state.filter((Note) => Note.id !== action.payload);
    case "editNote":
      return state.map((Note) => {
        return Note.id === action.payload.id ? action.payload : Note;
      });
    default:
      return state;
  }
};
const addNotes = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: "addNote", payload: { title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteNotes = (dispatch) => {
  return (id) => {
    dispatch({ type: "deleteNote", payload: id });
  };
};

const editNote = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: "editNote", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addNotes, deleteNotes, editNote },
  [{ title: "Test Title", content: "Test Content", id: 1 }]
);
