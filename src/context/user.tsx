import { createContext, Dispatch, useContext, useReducer } from "react"
import userReducer, { Action, InitialStateType } from "./userReducer"

const initialState: InitialStateType = {
  isLogin: false,
  checkingUserInfo: true,
  user: null,
}

const UserContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export const useUser = () => {
  return useContext(UserContext)
}

type Props = {
  children: React.ReactNode
}

const UserContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
