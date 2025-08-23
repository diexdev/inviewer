import { Link } from "react-router-dom";
import { useMyJobs } from "../hooks/useMyJobs";
import { ClipBoardIcon } from "./Icons";

export function MyJobtoWatch () {
  const { jobToWatch:job } = useMyJobs()
  return (
    <div className="work-selected">
      { job === null && <h2>Select a job</h2>}
      {job !== null && (
        <div className="job-to-watch">
          <strong className="title">{job?.title}</strong>
          <div className="separator"></div>
          <p><strong>Job Offered by</strong>: {job?.name}</p>
          <p><strong>Description</strong>: {job?.description}</p>
          <p><strong>Salary</strong>: {job?.salary}</p>
          <Link to={'/dashboard/checkSolicitudes'}> <span className="controll-link">Check all the solicitudes <ClipBoardIcon /> </span> </Link>
        </div>
      )}
    </ div>
  )
}