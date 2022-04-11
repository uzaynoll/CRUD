import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const reducer = (state, action) => {
  switch (action.type) {
    case "getGroceries":
      return action.payload;
    case "deleteGroceries":
      return state.filter((Groceries) => Groceries.id !== action.payload);
    case "editGroceries":
      return state.map((Groceries) => {
        return Groceries.id === action.payload.id ? action.payload : Groceries;
      });
    default:
      return state;
  }
};
const addGroceries = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/groceries", { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteGroceries = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/groceries/${id}`);
    dispatch({ type: "deleteGroceries", payload: id });
  };
};

const editGroceries = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/groceries/${id}`, { title, content });
    dispatch({ type: "editGroceries", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

const getGroceries = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/groceries");
    dispatch({ type: "getGroceries", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addGroceries, deleteGroceries, editGroceries, getGroceries },
  []
);
