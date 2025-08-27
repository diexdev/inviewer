import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export type User = {
  user_id: string,
  name: string,
  username: string,
  email: string,
  birthdate: Date
}

interface State {
  user: User | null,
  error: string | null,
  loading: boolean
}

const initialState: State = {
  user: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setUser: (state, action: PayloadAction<User | null>)  => {
      state.error = null
      state.loading = false
      state.user = action.payload
    },
    updateProfile: (state, action:PayloadAction<{ name:string, username:string}>) => {
      const { name, username } = action.payload
      if(!state.user) return

      const old = state.user

      const newUser:User = {
        ...old,
        name,
        username
      }

      state.user = newUser
    },
    logout: (state) => {
      state.user = null
    }
  }
})

export const { setError, setLoading, setUser, logout, updateProfile } = userSlice.actions
export default userSlice.reducer