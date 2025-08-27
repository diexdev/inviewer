import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useJobs = () => {
  const { error, jobToWatch, jobs, loading } = useSelector((state:RootState) => state.jobsSlice)
  return { error, jobs, loading, jobToWatch}
}