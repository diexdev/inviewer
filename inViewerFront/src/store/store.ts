import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../slices/userSlice.js"
import jobsSlice from '../slices/jobSlice.js'
import myJobsSlice from '../slices/myJobs.js'
import receivedSolicitudesSlice from '../slices/receivedPostulations.js'
import mySolicitudesSlice from '../slices/mySolicitudes.js'
import solicitudesSlice from '../slices/solicitudes.js'
import mySkillsSlice from '../slices/skills.js'

export const store = configureStore({
  reducer: { 
    userSlice,
    jobsSlice,
    myJobsSlice,
    receivedSolicitudesSlice,
    mySolicitudesSlice,
    solicitudesSlice,
    mySkillsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch