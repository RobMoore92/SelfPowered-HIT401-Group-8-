import React from "react";
import firebase from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log('logged in')
    })
}

export const logout = () => {
    firebase.auth().signOut();
}

export const signUpWithEmail = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log('signed up');
    })
}
