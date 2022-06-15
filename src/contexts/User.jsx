import { createContext, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedLIstener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// Actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'setCurrentUser',
};

const reducerFunctions = {
  setCurrentUser: (state, payload) => {
    return {
      ...state,
      currentUser: payload,
    };
  },
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  const functionToExecute = reducerFunctions[type];
  if (!functionToExecute)
    throw new Error(`Unhandled type ${type} in userReducer`);
  return functionToExecute(state, payload);
};

const INITIAL_STATE = {
  currentUser: null,
};

// for components to access this context, it is necessary to set a provider. Then we should wrap the components that need access to the context with it. This provider is in fact a functional component.

/**
 *Returns a UserContext.Provider that let other components access UserContext info.
 *
 * @param {*} children - the components that needs access to the context
 */
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedLIstener((user) => {
      setCurrentUser(user);
      if (user) createUserDocumentFromAuth(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
