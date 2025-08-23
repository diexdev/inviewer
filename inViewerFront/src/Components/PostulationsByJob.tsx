import { useEffect } from "react";
import { useMyJobs } from "../hooks/useMyJobs";
import { useReceivedSolicitudes } from "../hooks/useReceivedSolicitudes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { getSolicitudesByWork, removeSolicitude } from "../actions/solicitudesActions";
import { setPostulationsError, setReceivedSolicitudes } from "../slices/receivedPostulations";
import { MinusIcon } from "./Icons";

export function PostulationsByJob () {
  const { jobToWatch } = useMyJobs()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(setReceivedSolicitudes(null))
    dispatch(setPostulationsError(null))
    if(!jobToWatch) return
    dispatch(getSolicitudesByWork({id: jobToWatch.work_id}))
  }, [jobToWatch])

  const { error, solicitudes, loading } =  useReceivedSolicitudes()

  const handleDeleteSolicitude = (user_id: string, work_id: string) => {
    if(!user_id || !work_id) return
    dispatch(removeSolicitude({ user_id, work_id }))
  }

  return (
    <>
      {error && !loading && <h2>{error}</h2>}
      {loading && <p>loading...</p>}
      {jobToWatch === null && ( <h2>There isn't a selected job</h2> )}
      {solicitudes && solicitudes?.length > 0 && (
        <ul className="received-solicitudes">
          {solicitudes.map(sol => {
            return (
              <li className="solicitude" key={sol.solicitude_id}>
                <span className="solicitant"><strong>{sol.name} </strong> ({sol.username})</span>
                <strong className="created-at">{new Date(sol.created_at).toLocaleString()}</strong>
                <a className="download-resume" href={sol.resume_url}>Donwload resume</a>
                <button className="delete-received-solicitude" onClick={() => handleDeleteSolicitude(sol.user_id,sol.work_id)}><MinusIcon /></button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}