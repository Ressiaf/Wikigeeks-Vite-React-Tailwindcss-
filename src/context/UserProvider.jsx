import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { createContext, useState , useEffect} from "react";
import { auth } from "../firebase";

export const UserContext = createContext( );

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false);

    useEffect( ( ) => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                const { uid, email, photoURL, displayName } = user;
                setUser({ uid, email, photoURL, displayName });
            } else {
                setUser(null);
            }
        });
        return ( ) => unsuscribe( );
    }, [ ] );

    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const singOutUser = () => signOut(auth);

    return (
        <UserContext.Provider
        value={{ user, setUser, registerUser, loginUser, singOutUser}}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;