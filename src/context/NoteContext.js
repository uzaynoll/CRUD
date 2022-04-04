import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const reducer = (state, action) => {
  switch (action.type) {
    case "getNotes":
      return action.payload;
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
  return async (title, content, callback) => {
    await jsonServer.post("/notes", { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteNotes = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/notes/${id}`);
    dispatch({ type: "deleteNote", payload: id });
  };
};

const editNote = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/notes/${id}`, {title, content})
    dispatch({ type: "editNote", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

const getNotes = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/notes");
    dispatch({ type: "getNotes", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addNotes, deleteNotes, editNote, getNotes },
  []
);
