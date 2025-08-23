import { useNavigate } from "react-router-dom";
import { Back, LogoutIcon } from "./Icons";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { logoutApi } from "../consts";

export function SendSolicitudesHeader () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

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

  return (
    <>
      <header className="solicitude-header">
        <nav className="header-nav">
          <img src="../../img.png" className="logo"/>
          <ul className="header-nav-list">
            <li onClick={() => navigate('/dashboard')}>Back <Back /> </li>
            <li>
              <button onClick={log_out}>Logout <LogoutIcon /> </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}