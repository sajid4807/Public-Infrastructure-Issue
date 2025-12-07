import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { auth } from "../../firebase/Firebase.init";
import { useState } from "react";
import { useEffect } from "react";
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] =useState(null)
    const [loading,setLoading] =useState(true)

    const registerUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIN = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const singInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const profileUpdate = (profile) => {
        return updateProfile(auth.currentUser,profile)
    }
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return() => {
            unsubscribe()
        }
    },[loading])

    const authInfo ={
        user,
        loading,
        registerUser,
        signIN,
        logOut,
        singInGoogle,
        profileUpdate

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;