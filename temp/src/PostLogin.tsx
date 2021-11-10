import React, { ReactElement } from 'react'
import { Route, Switch, RouteComponentProps, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useContext } from './hooks/context'
const Profile = React.lazy(() => import('./pages/Profile'))
const Words = React.lazy(() => import('./pages/Words'))
const Time = React.lazy(() => import('./pages/Time'))
const IpAddress = React.lazy(() => import('./pages/IpAddress'))
const Client = React.lazy(() => import('./pages/Client'))
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'))
const Chat = React.lazy(() => import('./pages/Chat'))

const PostLogin: React.FC<RouteComponentProps> = (props: RouteComponentProps): ReactElement => {
  const [store] = useContext()
  const history = useHistory()
  const location = useLocation()
  React.useEffect(() => {
    if (store.user && store.user.isForceUpdate) {
      history.push('/changepassword')
    }
  }, [location, store.user, store.user && store.user.isForceUpdate])

  return (
    <Switch>
      <Route exact path='/' component={Chat} />
      <Route path='/chat' component={Chat} />
      <Route path='/kata' component={Words} />
      <Route path='/time' component={Time} />
      <Route path='/ip' component={IpAddress} />
      <Route path='/client' component={Client} />
      <Route path='/profile' component={Profile} />
      <Route path='/changepassword' component={ChangePassword} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  )
}

export default PostLogin
