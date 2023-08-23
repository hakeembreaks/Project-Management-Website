import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

// Create a new context
export const AuthContext = createContext();

//Define the authReducer function for handling state changes
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// // AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Use the authReducer to manage the state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // Use useEffect to set up an event listener for auth state changes
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      // Dispatch an action to set the user and auth readiness
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub(); // Unsubscribe to prevent memory leaks
    });
  }, []);

  console.log("AuthContext state:", state);

  // Provide the context value to the wrapped components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// In summary, the AuthContextProvider component sets up the
// authentication context using the useReducer hook to manage
// the authentication state. It listens for authentication
// state changes using Firebase authentication and provides
// the state and dispatch to its descendants through the context.
