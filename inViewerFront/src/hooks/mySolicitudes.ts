import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useMySolicitudes = () => {
  const { error, solicitudes, loading } = useSelector((state:RootState) => state.mySolicitudesSlice)
  return { error, solicitudes, loading }
}