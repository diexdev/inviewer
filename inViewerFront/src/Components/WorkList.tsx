import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { setJobtoWatch } from "../slices/jobSlice"
import { useEffect } from "react"
import { useUser } from "../hooks/useUser"

export function JobsList () {
  const { jobs:jobsToFilter, loading } = useSelector((state:RootState) => state.jobsSlice)
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useUser()

  useEffect(() => {
    dispatch(setJobtoWatch(null))
  }, [])

  const jobs = jobsToFilter?.filter(job => job.username !== user?.username)

  return (
    <>
      <ul className="works-list">
        {loading && <p>loading...</p>}
        {!jobs && !loading && (<h2>No jobs found</h2>)}
        {jobs?.length === 0 && !loading && (<h2>No jobs found</h2>)}
        {jobs?.length !== null && !loading && (
          jobs?.map(job => {
            return (
              <li onClick={() => dispatch(setJobtoWatch(job))} className="work" key={job.work_id + Math.random().toString()}>
                <strong className="title">{job.title}</strong>
                <div className="separator"></div>
                <p><strong>Job Offered by</strong>: {job.name} ({job.username})</p>
                <p><strong>Description</strong>: {job.description}</p>
                <p><strong>Salary</strong>: ${job.salary}</p>
              </li>
            )
          })
        )}
      </ul>
    </>
  )
}