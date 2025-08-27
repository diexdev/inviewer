import { useNavigate } from "react-router-dom";
import { Back, LogoutIcon, NewIcon, SkillIcon } from "./Icons";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { NewJob } from "./NewJob";
import { logoutApi } from "../consts";
import { NewSkill } from "./NewSkill";

export function ProfileHeader () {
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
      <header>
        <nav className="header-nav">
          <img src="../../img.png" className="logo"/>
          <ul className="header-nav-list">
                        <li>
              <label htmlFor="add-skill">Skills <SkillIcon /></label>
            </li>
            <li>
              <label htmlFor="check-new">Offer <NewIcon /></label>
            </li>
            <input type="checkbox"id="check-new" />
            <input type="checkbox"id="add-skill" />
            <NewJob />
            <NewSkill />
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