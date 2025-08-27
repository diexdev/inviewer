import { toast } from "sonner"
import { addSkillApi, getUserSkillsApi, removeSkillApi, searchSkillsApi } from "../consts"
import { removeMySkill, setMyskills, setMySkillsLoading } from "../slices/skills"
import type { AppDispatch } from "../store/store"

export const getSkillsByUser = ({ id }:{ id: string}) => async (dispatch:AppDispatch) => {
  try {
    dispatch(setMySkillsLoading(true))
    const res = await fetch(getUserSkillsApi+`/${id}`, {
      method:'GET',
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })

    const data = await res.json()

    if(!res.ok) {
      return console.error(data.message)
    }

    dispatch(setMyskills(data.data))
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(setMySkillsLoading(false))
  }
}

export const getSkillsBySearch = async (search:string) => {
  if(!search || search.trim() === '') return
  try {
    const res = await fetch(searchSkillsApi+`/${search}`, {
      method:'GET',
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })

    const data = await res.json()

    if(!res.ok) {
      throw new Error(data.message)
    }

    return data.data
  } catch (e) {
    console.error(e)
  }
}

export const removeSkill = (id: number, user_id:string) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(removeSkillApi, {
      method:'DELETE',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({ skill_id: id, user_id })
    })

    const data = await res.json()
    
    if(!res.ok) {
      return console.error(data.message)
    }

    toast.success(data.message.message)
    dispatch(removeMySkill(id))
  } catch (e) {
    console.error(e)
  }
}

export const addSkill = (skill_id: number, user_id:string) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(addSkillApi, {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({ skill_id, user_id })
    })

    const data = await res.json()
    
    if(!res.ok) {
      return toast.error(data.message)
    }

    toast.success(data.message.message)
    dispatch(getSkillsByUser({id: user_id}))
  } catch (e) {
    console.error(e)
  }
}