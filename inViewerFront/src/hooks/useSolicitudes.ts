import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useSolicitudes = () => {
  const { solicitudes, error, loading } = useSelector((state:RootState) => state.solicitudesSlice)
  return { solicitudes, error, loading }
}