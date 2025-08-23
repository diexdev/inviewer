import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { Link, useNavigate } from "react-router-dom"
import type React from "react"
import { register } from "../actions/authActions"
import { useEffect, useState } from "react"
import { deleteFromLocal } from "../consts"
import { setError, setLoading } from "../slices/userSlice"

export function RegisterForm () {
  const navigate = useNavigate()
  const [errorRegister, setState] = useState<string |  null>(null)
  const [local, setLocal] = useState<boolean>(false)
  const [saved, setSaved] = useState<string | null>(null)
  const { error, loading } = useSelector((state:RootState) => state.userSlice)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(setError(null))
    dispatch(setLoading(false))
  })

  const localEmail = localStorage.getItem('registerEmail')
  const localCode = localStorage.getItem('registerCode')

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState(null)

    const formdata = new FormData(e.currentTarget)

    const username = formdata.get('username') as string
    const name = formdata.get('name') as string
    const password = formdata.get('password') as string
    const birthdate = formdata.get('birthdate') as string
    
    if(!localCode || !localEmail) {
      setLocal(true)
      return setState('Error, please go back and try again')
    }

    if(!username || !name || !password || !birthdate) {
      return setState('Enter all the data')
    }

    dispatch(register({ setSaved, username, name, password, email:localEmail, birthdate, code:localCode }))
  }

  return (
    <form className="register-form" onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Register</h2>
      <div className="register-data">
        <input type="text" name="username" placeholder="username"/>
        <input id="name" type="text" name="name"placeholder="name"/>
        <input id="password" type="password" name="password"placeholder="password"/>
        <input type="date" name="birthdate" />
      </div>
      <div className="send-options">
        <button onClick={() => {
          deleteFromLocal()
          navigate('/receiveEmailCode')
        }}>Back</button>
        <button type="submit" disabled={loading || local || saved !== null}>{loading ? 'Saving' : 'Register'}</button>
      </div>
      {loading && <p style={{ color: '#fff', marginTop: 10 }}>Saving</p>}
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {errorRegister && <p style={{ color: 'red', marginTop: 10 }}>{errorRegister}</p>}
      {saved && <p>{saved}</p>}
      <Link to={'/'}>Log in</Link>
    </form>
  )
}