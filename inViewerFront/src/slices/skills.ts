import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type Skill = {
  skill : string,
  skill_id : number
}

interface State {
  skills: null | Skill[],
  error: string | null,
  loading: boolean
}

const initialState:State = {
  skills: null,
  error: null,
  loading: false
}

const mySkillsSlice = createSlice({
  name: 'myskills',
  initialState,
  reducers: {
    setMySkillsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setMySkillsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setMyskills: (state, action: PayloadAction<null | Skill[]>) => {
      state.error = null
      state.loading = false
      state.skills = action.payload
    },
    removeMySkill: (state, action:PayloadAction<number>) => {
      if(!state.skills) return
      state.skills = state.skills?.filter(skill => skill.skill_id !== action.payload)
    }
  }
})

export default mySkillsSlice.reducer
export const { setMySkillsError, setMySkillsLoading, setMyskills, removeMySkill } = mySkillsSlice.actions