import { useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { getMySolicitudes, removeMySolicitude } from "../actions/solicitudesActions"
import { useMySolicitudes } from "../hooks/mySolicitudes"
import { MinusIcon } from "./Icons"
import { setMyPostulationsError, setMySolicitudes } from "../slices/mySolicitudes"

export function MySolicitudes () {
  const { user } = useUser()
  const dispatch = useDispatch<AppDispatch>()
  const [visible, setVisible] = useState<boolean>(false)
  const [user_id, setUserId] = useState<string | null>(null)
  const [work_id, setWorkId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(setMySolicitudes(null))
    dispatch(setMyPostulationsError(null))
    if(!user) return
    dispatch(getMySolicitudes({id: user?.user_id}))
  }, [])
  
  const { error, solicitudes, loading } = useMySolicitudes()

  const handleDeleteSolicitude = async (user_id: string, work_id: string) => {
    if(!user_id || !work_id || !user) return
    await dispatch(removeMySolicitude({ user_id, work_id }))
    await dispatch(getMySolicitudes({ id: user?.user_id}))
  }

  return (
    <>
      {visible && (
        <div className="confirm-apply-container">
          <div className="confirm-delete">
            <p>You are gonna cancel this application</p>
            <div className="options">
              <button onClick={() => setVisible(false)}>Close</button>
              <button onClick={() => {
                if(!user_id || !work_id) return 
                handleDeleteSolicitude(user_id, work_id)
                setVisible(false)
              }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
      {error && <h2>{error}</h2>}
      {loading && <p>loading...</p>}
      {solicitudes?.length === 0 && !error && <h2>You haven't send solicitudes</h2>}
      {solicitudes && solicitudes?.length > 0 && (
        <ul className="received-solicitudes">
          {solicitudes.map(sol => {
            return (
              <li className="solicitude" key={sol.solicitude_id}>
                <span className="solicitant"><strong>{sol.boss_username} </strong></span>
                <span className="myTitle">{sol.title}</span>
                <button className="delete-received-solicitude" onClick={() => {
                  setVisible(true)
                  setUserId(sol.user_id)
                  setWorkId(sol.work_id)
                }}><MinusIcon /></button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}