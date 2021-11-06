import { useState, useEffect, useContext, createContext } from "react";
import { auth, signInWithEmailAndPassword } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props) {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const handleAuthStateChanged = (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => unsub();
  }, []);

  const signIn = async ({ email, password }) => {

    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = async () => {
    return auth.signOut().then(() => setUser(false));
  };

  return {
    user,
    signIn,
    signOut,
  };
};
