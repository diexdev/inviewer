import { JobtoWatch } from "./JobToWatch";
import { JobsList } from "./WorkList";

export function MainDashboard ()  {
  return (
    <>
      <div className="works-zone">
        <JobsList />
        <JobtoWatch />
      </div>
    </>
  )
}