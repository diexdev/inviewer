import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface MySolicitude {
  title: string,
  solicitude_id: string,
  user_id: string,
  work_id: string,
  boss_username: string
}

type State = {
  solicitudes: MySolicitude[] | null,
  error: string | null,
  loading: boolean
}

const initialState:State = {
  solicitudes: null,
  error: null,
  loading: false
}

const mySolicitudesSlice = createSlice({
  name:'solicitudes',
  initialState,
  reducers: {
    setMySolicitudesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setMyPostulationsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setMySolicitudes: (state, action:PayloadAction<MySolicitude[] | null>) => {{
      state.solicitudes = action.payload
    }},
    deleteMySolicitude: (state, action:PayloadAction<{ user_id: string, work_id: string}>) => {
      if(!state.solicitudes) return
      const { user_id, work_id } = action.payload
      const newState = state.solicitudes?.filter(sol => sol.user_id !== user_id && sol.work_id !== work_id)
      state.solicitudes = newState
    }
  }
})

export default mySolicitudesSlice.reducer
export const { setMyPostulationsError, setMySolicitudes, deleteMySolicitude, setMySolicitudesLoading } = mySolicitudesSlice.actions