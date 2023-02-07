import { User } from "firebase/auth"
import { doc, DocumentReference, getDoc, writeBatch } from "firebase/firestore"
import { StoreUser } from "../types/user"
import { store } from "./config"

// user
export const findCurrentUser = async (
  user: User
): Promise<null | StoreUser> => {
  const userDoc = doc(store, "users", user.uid) as DocumentReference<StoreUser>
  try {
    const username = await getDoc(userDoc)
    if (username.exists()) return username.data()
    return null
  } catch (e) {
    return null
  }
}

export const createCurrentUsername = async (
  user: User,
  username: string,
  onSuccess?: (user: StoreUser) => void
) => {
  const batch = writeBatch(store)

  const userDoc = doc(store, "users", user.uid)
  const usernameDoc = doc(store, "username", username)

  const userObj: StoreUser = {
    username: username.toLowerCase(),
    photoURL: user.photoURL as string,
    displayName: user.displayName as string,
    uid: user.uid,
  }

  try {
    batch.set(userDoc, userObj)

    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
    if (onSuccess) onSuccess(userObj)
  } catch (e) {
    // TODO:
  }
}
