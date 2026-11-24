import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdGatePassed } from '../utils/adGate'

/** 未看完广告门禁则先去 /ad；本会话通过后放行财经页 */
export function RequireAdPass() {
  const location = useLocation()
  if (!isAdGatePassed()) {
    return <Navigate to="/ad" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
