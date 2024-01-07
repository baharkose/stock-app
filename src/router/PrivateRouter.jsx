import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {

  const {user} = useSelector((state) => state.auth)
  // + 35 state.authtan userı çıkar user yoksa login varsa dashboarda gir oraya da bakalım. -> dashbaord

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter
