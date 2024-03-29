import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/user"
import { ActionType } from "../context/userReducer"
import { auth } from "./config"
import { findCurrentUser } from "./firestore/user"

export const signUpWithEmail = (email: string, password: string) => {
  toast.promise(createUserWithEmailAndPassword(auth, email, password), {
    error: (e: AuthError) => e.message,
    loading: "Validating",
    success: "Successfully Login",
  })
}

export const signInWithEmail = (email: string, password: string) =>
  toast.promise(signInWithEmailAndPassword(auth, email, password), {
    error: (e: AuthError) => e.message,
    loading: "Validating",
    success: "Successfully Login",
  })

export const authorize = async () => {
  const googleProvider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, googleProvider)
    localStorage.setItem("isLogin", "true")
  } catch (e) {
    // TODO: show an error to end user
    // add toast
    localStorage.removeItem("isLogin")
  }
}

export const logout = () => {
  if (window.confirm("Are you Sure?")) {
    signOut(auth)
  }
}

export const useOnAuthChange = () => {
  const { dispatch } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const storeUser = await findCurrentUser(user)

        if (storeUser) {
          dispatch({ type: ActionType.FoundUser, payload: storeUser })
        } else {
          navigate("/username", { replace: true })
          dispatch({ type: ActionType.SetLogin, payload: true })
        }
      } else dispatch({ type: ActionType.SetLogin, payload: false })
    })
  }, [])
}
