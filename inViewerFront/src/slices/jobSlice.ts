import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Job } from "../types"

interface State {
  jobs: null | Job[],
  error: string | null,
  loading: boolean,
  jobToWatch: null | Job
}

const initialState:State = {
  jobs: null,
  error: null,
  loading: false,
  jobToWatch: null
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setJobError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setJobs: (state, action: PayloadAction<null | Job[]>) => {
      state.error = null
      state.loading = false
      state.jobs = action.payload
    },
    setJobtoWatch: (state, action: PayloadAction<null | Job>) =>  {
      state.jobToWatch = action.payload
    },
        removeOutJob: (state, action:PayloadAction<string>) => {
      if(!state.jobs) return
      state.jobs = state.jobs?.filter(job => job.work_id !== action.payload)
    }
  }
})

export default jobsSlice.reducer
export const { setJobError, setJobLoading, setJobs, setJobtoWatch, removeOutJob } = jobsSlice.actions