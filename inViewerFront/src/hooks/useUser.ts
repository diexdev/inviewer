import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useUser = () => {
  const { error, user, loading } = useSelector((state:RootState) => state.userSlice)
  return { error, user, loading}
}