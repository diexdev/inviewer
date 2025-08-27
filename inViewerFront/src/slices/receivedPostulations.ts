import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Solicitude } from "../types"

type State = {
  solicitudes: Solicitude[] | null,
  error: string | null,
  loading: boolean
}

const initialState:State = {
  solicitudes: null,
  error: null,
  loading: false
}

const receivedSolicitudesSlice = createSlice({
  name:'solicitudes',
  initialState,
  reducers: {
    setPostulationsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setReceivedSolicitudes: (state, action:PayloadAction<Solicitude[] | null>) => {{
      state.solicitudes = action.payload
    }},
    setSolicitudesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    deleteSolicitude: (state, action:PayloadAction<{ user_id: string, work_id: string}>) => {
      if(!state.solicitudes) return
      const { user_id, work_id } = action.payload
      const newState = state.solicitudes?.filter(sol => sol.user_id !== user_id && sol.work_id !== work_id)
      state.solicitudes = newState
    }
  }
})

export default receivedSolicitudesSlice.reducer
export const { setPostulationsError, setReceivedSolicitudes, deleteSolicitude, setSolicitudesLoading } = receivedSolicitudesSlice.actions