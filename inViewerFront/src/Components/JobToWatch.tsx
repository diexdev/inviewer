import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import { CheckIcon, SendIcon } from "./Icons";
import { useSolicitudes } from "../hooks/useSolicitudes";
import { useEffect } from "react";
import { getSolicitudes } from "../actions/solicitudesActions";
import { useUser } from "../hooks/useUser";
import { setSolicitudes } from "../slices/solicitudes";

export function JobtoWatch () {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(setSolicitudes(null))
    dispatch(getSolicitudes())
  }, [])

  const { jobToWatch:job } = useSelector((state:RootState) => state.jobsSlice)
  const { solicitudes, loading } = useSolicitudes()
  const { user } = useUser()

  const isPostulated = solicitudes?.find(sol => sol.user_id === user?.user_id && sol.work_id === job?.work_id)

  return (
    <div className="work-selected">
      {loading && <h2>Preparing...</h2>}
      {job === null && !loading && <h2>Select a job</h2>}
      {job !== null && !loading && (
        <div className="job-to-watch">
          <strong className="title">{job?.title}</strong>
          <div className="separator"></div>
          <p><strong>Job Offered by</strong>: {job?.name}</p>
          <p><strong>Description</strong>: {job?.description}</p>
          <p><strong>Salary</strong>: {job?.salary}</p>
          <div className="check-apply">
            {isPostulated ? <strong className="applied">Applied <CheckIcon /> </strong> : <Link to={'sendApplication'}> <span className="controll-link">Send application <SendIcon /> </span> </Link>}
          </div>
        </div>
      )}
    </ div>
  )
}