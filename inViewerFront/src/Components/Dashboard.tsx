import { Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { MainDashboard } from "./MainDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { getJobs } from "../actions/jobActions";
import { NotFound } from "./NotFound";
import { ProfileHeader } from "./ProfileHeader";
import { Profile } from "./Profile";
import { PostulationsByJob } from "./PostulationsByJob";
import { SolicitudesHeader } from "./SolicitudesHeader";
import { MySolicitudes } from "./SentSolicitudes";
import { MySolicitudesHeader } from "./mySolicitudesHeader";
import { SendApplication } from "./SendSolicitude";
import { SendSolicitudesHeader } from "./SendSolicitudeHeader";
import { UpdateProfile } from "./UpdateProfile";

export function Dashboard () {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getJobs())
  }, [])

  return (
    <div className="dashboard">
      <Routes>
        <Route index element={<Header />}/>
        <Route path="checkSolicitudes" element={<SolicitudesHeader />}/>
        <Route path="updateProfile" element={<SolicitudesHeader />}/>
        <Route path="mySolicitudes" element={<MySolicitudesHeader />}/>
        <Route path="sendApplication" element={<SendSolicitudesHeader />}/>
        <Route path="profile" element={<ProfileHeader />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <div className="render-zone">
        <Routes>
          <Route path="mySolicitudes" element={<MySolicitudes />}/>
          <Route index  element={<MainDashboard />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="checkSolicitudes" element={<PostulationsByJob />}/>
          <Route path="sendApplication" element={<SendApplication />}/>
          <Route path="updateProfile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </div>
  )
}


