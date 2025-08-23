import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useReceivedSolicitudes = () => {
  const { error, solicitudes, loading } = useSelector((state: RootState) => state.receivedSolicitudesSlice)
  return { error, solicitudes, loading }
}