import type React from "react"
import { deleteMySolicitude, setMyPostulationsError, setMySolicitudes, setMySolicitudesLoading } from "../slices/mySolicitudes"
import { deleteSolicitude, setPostulationsError, setReceivedSolicitudes } from "../slices/receivedPostulations"
import type { AppDispatch } from "../store/store"
import { toast } from "sonner"
import { setSolicitudes, setSolicitudesError, setSolicitudesLoading } from "../slices/solicitudes"
import { getMySolicitudesApi, getSolicitudesApi, getSolicitudesByWorkApi, removeSolicitudeApi, sendSolicitudeApi } from "../consts"

export const getSolicitudesByWork = ({ id }:{ id:string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSolicitudesLoading(true))
    dispatch(setSolicitudesLoading(true))
    const res = await fetch(`${getSolicitudesByWorkApi}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type':'application/json'}
    })

    const data = await res.json()

    if(!res.ok) {
      return dispatch(setPostulationsError(data.message))
    }

    dispatch(setReceivedSolicitudes(data.data))
  } catch (e) {
    const error = e as Error
    dispatch(setPostulationsError(error.message))
  } finally {
    dispatch(setSolicitudesLoading(false))
  }
}

export const getMySolicitudes = ({ id }:{ id:string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setMySolicitudesLoading(true))
      const res = await fetch(`${getMySolicitudesApi}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type':'application/json'}
    })

    const data = await res.json()
    if(!res.ok) {
      return dispatch(setMyPostulationsError(data.message))
    }

    dispatch(setMySolicitudes(data.data))
  } catch (e) {
    const error = e as Error
    dispatch(setMyPostulationsError(error.message))
  } finally {
    dispatch(setMySolicitudesLoading(false))
  }
}

export const getSolicitudes = () => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(getSolicitudesApi, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type':'application/json'}
    })

    const data = await res.json()
    if(!res.ok) {
      return dispatch(setSolicitudesError(data.message))
    }

    dispatch(setSolicitudes(data.data))
  } catch (e) {
    const error = e as Error
    dispatch(setSolicitudesError(error.message))
  }
}

export const removeSolicitude = ({ user_id, work_id }: { user_id: string, work_id: string }) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(removeSolicitudeApi, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        user_id, work_id
      })
    })

    if(!res.ok) {
      return console.error('error in the fetch')
    }

    dispatch(deleteSolicitude({ user_id, work_id }))
    dispatch(getSolicitudesByWork({id: work_id}))
  } catch (e){
    const error = e as Error
    console.log(error)
  }
}     

export const removeMySolicitude = ({ user_id, work_id }: { user_id: string, work_id: string }) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(removeSolicitudeApi, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        user_id, work_id
      })
    })

    if(!res.ok) {
      return console.error('error in the fetch')
    }

    dispatch(deleteMySolicitude({ user_id, work_id }))
    dispatch(deleteSolicitude({ user_id, work_id }))
    dispatch(getSolicitudes())
  } catch (e){
    const error = e as Error
    console.log(error)
  }
}

interface SendApplicationProps {
  file: File,
  user_id: string,
  work_id: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setOk: React.Dispatch<React.SetStateAction<boolean>>
}

export const sendApplication = async ({ setOk, user_id, work_id, file, setError, setLoading }:SendApplicationProps) => {
  try {
    setLoading(true)
    setError(null)

    const formdata = new FormData()

    formdata.append('user_id', user_id)
    formdata.append('work_id', work_id)
    formdata.append('file', file)

    const res = await fetch(sendSolicitudeApi, {
      method: 'POST',
      credentials: 'include',
      headers: {'enc-Type':'multipart/form-data'},
      body: formdata
    })

    const data = await res.json()
    if(!res.ok) {
      if(data.message.includes('unexpected error')) {
        return setError('Error, try later')
      }
      return setError(data.message)
    }

    setOk(true)
    return toast.success(data.message)
  } catch (e) {
    const error = e as Error
    setError(error.message)
  } finally {
    setLoading(false)
  }
}