import type React from "react"
import { useUser } from "../hooks/useUser"
import { useState } from "react"
import { publishJob } from "../actions/jobActions"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"

export function NewJob () {
  const { user } = useUser()

  const [error, setError] = useState<string | null>(null)
  
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formdata = new FormData(form)
    
    const title = formdata.get('new-job-title') as string
    const description = formdata.get('new-job-description') as string
    const salary = formdata.get('new-job-salary') as string

    if(!title || !description || !salary || !user) {
      console.log('dalys')
      return setError('Complete the data')
    }

    dispatch(publishJob({description, salary, title, setError, setLoading, boss: user?.user_id}))
    form.reset()
  }

  return (
    <div className="new-job-container">
      <form onSubmit={handleSubmit} className="new-job-form">
        <h2>Publish a new job</h2>
        <input type="text" name="new-job-title" className="new-job-title" placeholder="job's title"/>
        <textarea name="new-job-description" className="new-job-description" maxLength={400}/>
        <input step='any' type="number" className="new-job-salary" name="new-job-salary"/>
        <button type='submit'>Publish Job</button>
        {loading && !error && <p>Creating...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}