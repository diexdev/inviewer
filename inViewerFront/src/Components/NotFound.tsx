import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link to={'/'}>Login</Link>
    </>
  )
}