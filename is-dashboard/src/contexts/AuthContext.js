import React, { useContext, useState, useEffect } from "react";
import { auth } from "../initFirebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    function signup(mail, pass) {
        return auth.createUserWithEmailAndPassword(mail, pass);
    }

    function login(mail, pass) {
        return auth.signInWithEmailAndPassword(mail, pass);
    }

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
