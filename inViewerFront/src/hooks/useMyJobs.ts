import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useMyJobs = () => {
  const { error, jobs, loading, jobToWatch } = useSelector((state:RootState) => state.myJobsSlice)
  return { error, jobs, loading, jobToWatch}
}