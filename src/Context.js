import { createContext, useReducer } from "react";
import { conversations } from "./utils/utils";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false,
  conversations: conversations,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case "REMOVE_CONVERSATION":
      return {
        ...state,
        conversations: helperFn(state,action)
      };

    default:
      return state;
  }
};

const helperFn = (state, action) => {
  const updatedConversations = state.conversations.filter(
    (conve) => conve.id !== action.payload
  ).map((conve) => ({
    ...conve,
    id: conve.id > action.payload ? conve.id - 1 : conve.id,
  }));

  return updatedConversations;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const addConversation = (conversation) => {
    dispatch({ type: "ADD_CONVERSATION", payload: conversation });
  };

  const removeConversation = (id) => {
    dispatch({ type: "REMOVE_CONVERSATION", payload: id });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, removeConversation, addConversation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };