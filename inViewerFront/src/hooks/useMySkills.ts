import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export const useMySkills = () => {
  const { skills, error, loading } = useSelector((state:RootState) => state.mySkillsSlice)
  return { skills, error, loading }
}