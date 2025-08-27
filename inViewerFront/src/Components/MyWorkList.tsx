import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { useMyJobs } from "../hooks/useMyJobs"
import { removeJob, setMyJobtoWatch } from "../slices/myJobs"
import { DeleteIcon } from "./Icons"
import { useState } from "react"
import type { Job } from "../types"
import { removeOutJob } from "../slices/jobSlice"
import { removeJobApi } from "../consts"

export function MyJobsList () {
  const { jobs, loading } = useMyJobs()
  const dispatch = useDispatch<AppDispatch>()
  const [offerToDelete, setOfferToDelete] = useState<null | Job>(null)
  const [error, setError] = useState<string | null>(null)
  
  const removeMyJob = async () => {
    if(!offerToDelete) return 
    
    try {
      const res = await fetch(`${removeJobApi}/${offerToDelete.work_id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type':'application/json'}
      })

      const data = await res.json()
      if(!res.ok) return setError(data.message)

      setOfferToDelete(null)
      dispatch(removeJob(offerToDelete.work_id))
      dispatch(removeOutJob(offerToDelete.work_id))
      dispatch(setMyJobtoWatch(null))
    } catch (e) {
      const error = e as Error
      setError(error.message)
    } 
  }

  return (
    <>
    {offerToDelete && (
      <div className="delete-offer-modal">
        <p>Do you wanna remove this offer?</p>
        <div className="delete-offer-options">
          <button onClick={() => setOfferToDelete(null)}>Cancel</button>
          <button onClick={removeMyJob}>Remove</button>
        </div>
        {loading && !error && <p>Deleting...</p>}
        {error && <p>{error}</p>}
      </div>
    )}
      <ul className="works-list">
        {loading && <p>loading...</p>}
        {jobs === null && !loading && (<h2>No jobs offered</h2>)}
        {jobs?.length === 0  && !loading && (<h2>No jobs offered</h2>)}
        {jobs && jobs.length > 0  && !loading && (
          jobs?.map(job => {
            return (
              <li onClick={() => dispatch(setMyJobtoWatch(job))} className="work" key={job.work_id}>
                <button onClick={() => setOfferToDelete(job)} className="delete-offer"><DeleteIcon /></button>
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