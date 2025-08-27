import { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { useUser } from "../hooks/useUser";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { getJobsByUser } from "../actions/jobActions";
import { MyJobsList } from "./MyWorkList";
import { MyJobtoWatch } from "./MyJobToWatch";
import { setMyJobs } from "../slices/myJobs";
import { getSkillsByUser } from "../actions/skills";

export function Profile () {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useUser()

  useEffect(() => {
    if(!user) return
    dispatch(setMyJobs(null))
    dispatch(getJobsByUser({ id: user?.user_id}))
    dispatch(getSkillsByUser({ id: user.user_id }))
  }, [])
  
  return (
    <div className="profile-section">
      <ProfileInfo />
      <div className="profile-list">
        <MyJobsList />
        <MyJobtoWatch />
      </div>
    </ div>
  )
}