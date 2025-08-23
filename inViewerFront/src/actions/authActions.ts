import type React from "react"
import { setError, setLoading, setUser, updateProfile } from "../slices/userSlice"
import type { AppDispatch } from "../store/store"
import { loginApi, registerApi, updateProfileApi } from "../consts"

interface Register {
  username: string,
  name: string,
  birthdate: string,
  email: string,
  code: string,
  password: string,
  setSaved: React.Dispatch<React.SetStateAction<string | null>>
}

export const login = ({ username, password }:{ username:string, password: string }) => async (dispatch:AppDispatch) => {
    dispatch(setLoading(true))
    try {
      const res = await fetch(loginApi, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username, 
          password
        }),
        credentials: 'include'
      }) 

      const data = await res.json()

      if(!res.ok) {
        return dispatch(setError(data.message))
      }

      return dispatch(setUser(data.user))
    } catch (e) {
      const error = e as Error
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
}

export const register = ({ setSaved, username, password, email, birthdate, name, code }:Register) => async (dispatch:AppDispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await fetch(registerApi, {
      method: 'POST',
      headers:{ 'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        username,
        name,
        password,
        email,
        birthdate,
        code
      })
    })

    const data = await res.json()

    if(!res.ok) {
      return dispatch(setError(data.message))
    }

    dispatch(setError(null))
    setSaved(data.message)
  } catch (e) {
    const error = e as Error
    dispatch(setError(error.message))
  } finally {
    setLoading(false)
  }
}

interface Update {
  name:string,
  username:string,
  user_id:string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const updateMyProfile = ({name, username, user_id, setError, setLoading}:Update) => async (dispatch:AppDispatch) => {
  setLoading(true)
  try {
    console.log('zzz')
    const res = await fetch(updateProfileApi, {
      method: 'POST',
      headers:{ 'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        username,
        name,
        user_id
      })
    })

    const data = await res.json()
    if(!res.ok) {
      return setError(data.message)
    }

    setError(null)
    dispatch(updateProfile({ name, username }))
  } catch (e) {
    const error = e as Error
    setError(error.message)
  } finally {
    setLoading(false)
  }
}