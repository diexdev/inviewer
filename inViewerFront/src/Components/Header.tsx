import { useNavigate } from "react-router-dom";
import { LogoutIcon, SearchIcon, SolicitudesIcon, UserIcon, XIcon } from "./Icons";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import React, { useEffect, useState } from "react";
import { getJobs, getJobsBySearch } from "../actions/jobActions";
import { logoutApi } from "../consts";

export function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [search, setSearch] = useState<string>(() => {
    const local = localStorage.getItem('search')
    return local ? local : ''
  })

  useEffect(() => {
    setSearch('')
    dispatch(getJobs())
  }, [])

  const log_out = async () => {
    fetch(logoutApi, {
      method:'POST',
      credentials: 'include',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(res => res.json())
    .catch(e => console.log(e)) 
    dispatch(logout())
  }

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search.trim() === '') return dispatch(getJobs())
    dispatch(getJobsBySearch(search))
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    if(newValue.startsWith(' ')) return
    setSearch(e.currentTarget.value)
  }

  const clean = () => {
    if(search !== '') {
      setSearch('')
      dispatch(getJobs())
    }
  } 

  return (
    <>
      <header>
        <nav className="header-nav">
          <img src="../../img.png" className="logo"/>
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <input value={search} onChange={handleChange} type="text" name="search" placeholder="Web developer, Analist, ..."/>
              <div className="stop-search"></div>
              <button className="clean" onClick={clean}><XIcon /></button>
              <button className="search-button"><SearchIcon /></button>
            </form>
          </div>
          <ul className="header-nav-list">
            <li onClick={() => navigate('/dashboard/profile')}>Profile <UserIcon /> </li>
            <li onClick={() => navigate('/dashboard/mySolicitudes')}>My Solicitudes <SolicitudesIcon /> </li>
            <li>
              <button onClick={log_out}>Logout <LogoutIcon /> </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}