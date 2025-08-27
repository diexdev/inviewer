import { toast } from "sonner";
import { setJobError, setJobLoading, setJobs } from "../slices/jobSlice";
import { setMyJobError, setMyJobLoading, setMyJobs } from "../slices/myJobs";
import type { AppDispatch } from "../store/store";
import type { NewWork } from "../types";
import { getJobsApi, getJobsBySearchApi, getJobsByUserApi, publishJobApi } from "../consts";

export const getJobs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setJobLoading(true))
    const res = await fetch(getJobsApi, {
      method:'GET',
      credentials: 'include',
      headers: {
        'Content-Type':'application/json'
      }
    })

    const data = await res.json()

    if(!res.ok) {
      return dispatch(setJobError(data.message))
    }

    dispatch(setJobs(data.data))
  } catch (e) {
    const error = e as Error
    dispatch(setJobError(error.message))
  } finally {
    dispatch(setJobLoading(false))
  }
}

export const getJobsByUser = ({id}:{id:string}) => async (dispatch:AppDispatch) => {
  try {
    dispatch(setMyJobLoading(true))
    const res = await fetch(`${getJobsByUserApi}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type':'application/json'
      }
    })

    const data = await res.json()

    if(!res.ok) {
      return dispatch(setMyJobError(data.message))
    }

    dispatch(setMyJobs(data.data))
  } catch (e) {
    const error = e as Error
    dispatch(setMyJobError(error.message))
  } finally {
    dispatch(setMyJobLoading(false))
  }
}

export const publishJob = ({description, title, boss, salary, setError, setLoading}:NewWork) => async (dispatch:AppDispatch) => {
  try {
    setLoading(true)
    const res = await fetch(publishJobApi, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        description, title, boss, salary
      })
    })

    const data = await res.json()
    if(!res.ok) return setError(data.message)

    setError(null)
    dispatch(getJobsByUser({ id: boss}))
    dispatch(getJobs())
    const check = document.getElementById('check-new') as HTMLInputElement

    if(check) check.checked = false
  } catch (e) {
    const error = e as Error
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

export const getJobsBySearch = (search:string) => async (dispatch:AppDispatch) => {
  try {
    dispatch(setJobLoading(true))
    const res = await fetch(`${getJobsBySearchApi}/${search}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type':'application/json'
      }
    })

    const data = await res.json()

    if(!res.ok) {
      dispatch(setJobs(null))
      return toast.error(data.message)
    }

    localStorage.setItem('search', search)
    dispatch(setJobs(data.data))
  } catch (e) {
    const error = e as Error
    toast.error(error.message)
  } finally {
    setJobLoading(false)
  }
}