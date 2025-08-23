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

const myJobsSlice = createSlice({
  name: 'myJobs',
  initialState,
  reducers: {
    setMyJobLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setMyJobError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setMyJobs: (state, action: PayloadAction<null | Job[]>) => {
      state.error = null
      state.loading = false
      state.jobs = action.payload
    },
    setMyJobtoWatch: (state, action: PayloadAction<null | Job>) =>  {
      state.jobToWatch = action.payload
    },
    removeJob: (state, action:PayloadAction<string>) => {
      if(!state.jobs) return
      state.jobs = state.jobs?.filter(job => job.work_id !== action.payload)
    }
  }
})

export default myJobsSlice.reducer
export const { setMyJobError, setMyJobLoading, setMyJobs, setMyJobtoWatch, removeJob } = myJobsSlice.actions