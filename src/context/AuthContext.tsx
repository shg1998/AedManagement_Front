import React from "react";
import {getItemSecure} from "../utils/AESCrypto";

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    isAuthenticated: false,
    isAdmin: false,
    isSuperAdmin: false,
} as AuthContextType);
const AuthDispatchContext = React.createContext<React.Dispatch<any>>(
    () => null
);

function userReducer(state: AuthContextType, action: any) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state, isAuthenticated: true,
                isAdmin: action.payload?.isAdmin ?? false,
                isSuperAdmin: action.payload?.isSuperAdmin ?? false,
            };
        case "SIGN_OUT_SUCCESS":
            return {...state, isAuthenticated: false, isAdmin: false, isSuperAdmin: false};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const AuthProvider: React.FC<any> = ({children}) => {
    const userToken = getItemSecure("mainToken");
    const role = getItemSecure("userRoleName") ?? "";
    const [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: Boolean(userToken),
        isSuperAdmin: role === 'SuperAdmin',
        isAdmin: role === 'Admin',
    });

    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
};

function useAuthState() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a UserProvider");
    }
    return context;
}

function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a UserProvider");
    }
    return context;
}

export {AuthProvider, useAuthState, useAuthDispatch};
