import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

// In summary, the useAuthContext custom hook allows components
// to conveniently access the authentication context's state and
//  dispatch functions without having to manually retrieve them
// from the context each time. It also includes error handling to
// ensure that the hook is used within the appropriate context provider.
