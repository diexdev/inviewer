import { useState } from "react"
import { useJobs } from "../hooks/useJobs"
import { sendApplication } from "../actions/solicitudesActions"
import { useUser } from "../hooks/useUser"

export function SendApplication () {
  const { jobToWatch } = useJobs()
  // const dispatch = useDispatch<AppDispatch>()
  const { user } = useUser()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [ok, setOk] = useState<boolean>(false)

  const handleApplication = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if(!jobToWatch) return setError('No job Selected, please go back')

    const form = e.currentTarget
    const formdata = new FormData(form)
    const cv = formdata.get('file') as File
    const user_id = user?.user_id
    const work_id = jobToWatch?.work_id

    if(!cv) return setError('Please enter your resume')
    if(!cv.name.endsWith('pdf')) return setError('File must be pdf format')
      if(cv.name.includes(' ')) return setError('Filename must not contain spaces')
    if(!user_id || !work_id ) return
    
    sendApplication({ user_id, work_id, file: cv, setError, setLoading, setOk })
  }

  return (
    <>
      {loading && <div className="stopper"></div> }
      {!jobToWatch && <h2>No Job selected</h2>}
      {jobToWatch && (
        <form className="apply-form" onSubmit={handleApplication}>
          <strong>Job to applicate:</strong>
          <span>- {jobToWatch?.title}</span>
          <span><strong>Salary</strong>: {jobToWatch?.salary}</span>
          <span><strong>Boss</strong>: {jobToWatch?.username}</span>
          <input type="file" name="file"/>
          <button disabled={loading || ok} type="submit" className="send-solicitation">Send</button>
          {error && <p>{error}</p>}
          {loading && <p>Applying...</p>}
          {ok && <p>Application sent</p>}
        </form>
      )}
    </>
  )
}