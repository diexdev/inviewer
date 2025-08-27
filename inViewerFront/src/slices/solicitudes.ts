import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Solicitudes {
  solicitude_id: string,
  user_id: string,
  work_id: string
}

type State = {
  solicitudes: Solicitudes[] | null,
  error: string | null,
  loading: boolean
}

const initialState:State = {
  solicitudes: null,
  error: null,
  loading: false
}

const SolicitudesSlice = createSlice({
  name:'solicitudes',
  initialState,
  reducers: {
    setSolicitudesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSolicitudesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSolicitudes: (state, action:PayloadAction<Solicitudes[] | null>) => {{
      state.solicitudes = action.payload
    }}
  }
})

export default SolicitudesSlice.reducer
export const { setSolicitudesError,setSolicitudesLoading, setSolicitudes } = SolicitudesSlice.actions