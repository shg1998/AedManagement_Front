import { createContext, useMemo } from "react";
import React from "react";

interface PermissionType {
  create_access: number;
  delete_access: number;
  get_access: number;
  update_access: number;
  id: string | null;
  module_name: string;
  section_name: string;
}

interface CurrentUserContextType {
  image_url: string;
  id: number;
  username: string;
  permissions: PermissionType[];
}

const initCurrentUser = {
  image_url: "",
  id: 0,
  username: "",
  permissions: [],
};
const CurrentUserContext = createContext<CurrentUserContextType>(
  initCurrentUser as CurrentUserContextType
);
const CurrentUserDispatchContext = React.createContext<React.Dispatch<any>>(
  () => null
);

function userReducer(state: CurrentUserContextType, action: any) {
  switch (action.type) {
    case "INFO":
      return {
        ...state,
        image_url: action.payload?.image_url,
        id: action.payload?.id,
        username: action.payload?.username,
        permissions: action.payload ? (action.payload.permissions ? [...action.payload.permissions] : []) : [] ,
      };
    case "CLEAR":
      return {
        ...initCurrentUser,
        id: state?.id,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const CurrentUserProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initCurrentUser);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <CurrentUserContext.Provider value={value.state}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
};

function useCurrentUserState() {
  const context = React.useContext(CurrentUserContext);

  if (context === undefined) {
    throw new Error("CurrentUserState must be used within a UserProvider");
  }
  return context;
}

function useCurrentUserDispatch() {
  const context = React.useContext(CurrentUserDispatchContext);
  if (context === undefined) {
    throw new Error("CurrentUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { CurrentUserProvider, useCurrentUserState, useCurrentUserDispatch };
