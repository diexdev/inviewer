import { useDispatch } from "react-redux"
import { useMySkills } from "../hooks/useMySkills"
import { useUser } from "../hooks/useUser"
import { XIcon } from "./Icons"
import type { AppDispatch } from "../store/store"
import { removeSkill } from "../actions/skills"
import { useNavigate } from "react-router-dom"

export function ProfileInfo () {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useUser()
  const { skills, loading } = useMySkills()
  const navigate = useNavigate()

  return (
    <div className="profile-data">
      <div  style={{
        display: 'flex',
        flexDirection: 'column'
      }} className="prof-info">
        <h2 >Profile Info <button className="edit-button" onClick={() => navigate('/dashboard/updateProfile')}>
          <svg width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>  
        </button></h2>
        <span><strong style={{ color: '#00c'}}>Name</strong>: {user?.name}</span>
        <span><strong style={{ color: '#00c'}}>Username</strong>: {user?.username}</span>
        <span><strong style={{ color: '#00c'}}>Email</strong>: {user?.email}</span>
        <span><strong style={{ color: '#00c'}}>Birthday</strong>: {(user?.birthdate)?.toLocaleString().slice(0, 10)}</span>
      </div>
      <div className="skills">
        {loading && <p>Loading...</p>}
        {skills && skills?.length > 0 && (
          skills.map(skill => {
            return (
              <div key={skill.skill_id} className="skill">{skill.skill} 
                <button onClick={() => {
                  if(!user) return 
                  dispatch(removeSkill(skill.skill_id, user?.user_id))
                }}>
                  <XIcon />
                </button>
              </div>
            )
          })
        )}
      </div>
    </ div>
  )
}