import { useEffect, useState } from "react"
import { addSkill, getSkillsBySearch } from "../actions/skills"
import { PlusIcon } from "./Icons"
import { useUser } from "../hooks/useUser"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"

type SkillSearch = {
  skill: string,
  skill_id: number
}

function useDebounce (search:string) {
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(search)
    }, 500);

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  return value
}

export function NewSkill () {
  const [results, setResults] = useState<null | SkillSearch[]>(null)
  const [error, setError] = useState<null | string>(null)
  const [search, setSearch] = useState<string>('')
  const { user } = useUser()
  const dispatch = useDispatch<AppDispatch>()

  const value = useDebounce(search)

  useEffect(()=> {
    if(value === '') return setResults(null)
    getSkillsBySearch(value)
      .then(data =>{
        if(data === undefined) return setResults(null)
        setResults(data)
      })
      .catch(e => {
        return setError(e)
      })
  }, [value])

  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newSearch = e.currentTarget.value
    if(newSearch.startsWith(' ')) return
    setSearch(e.currentTarget.value)
  }

  const handleAddSkill = (skill_id: number) => {
    if(!skill_id || !user) return
    dispatch(addSkill(skill_id, user.user_id))
  }

  return (
    <>
      <div className="new-skill-form">
        <input placeholder="Search an skill" onChange={handleChange} type="text" />
        <div className="skills-result">
          {results?.length === 0 || results === null && <p>No Skills Found</p>}
          {error && <p>{error}</p>}
          {results && results?.length > 0 && (
            <ul className="skills-results-list">
              {results.map(res => {
                return (
                  <li key={res.skill_id} className="skill-to-add">{res.skill} <button onClick={() => handleAddSkill(res.skill_id)} type="button"><PlusIcon /></button></li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}