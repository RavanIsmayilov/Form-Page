import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


// İstifadəçi qeydiyyatı funksiyası
export const registerWithEmail = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firebase istifadəçi adını (displayName) təyin edir
    await updateProfile(user, { displayName: username });

    return user;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

// İstifadəçi login
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout (çıxış)
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
