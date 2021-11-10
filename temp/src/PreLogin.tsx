import React, { ReactElement, Suspense } from 'react'
import { checkToken } from './services/session'
import { RouteComponentProps } from 'react-router-dom'
import Loading from './components/loading'
import { useContext } from './hooks/context'
import { ActionType } from './hooks/reducer'
import { websocket } from './services/websocket'

const PostLogin = React.lazy(() => import('./PostLogin'))
const Login = React.lazy(() => import('./pages/Login'))

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps): ReactElement => {
  const [store, dispatch] = useContext()
  React.useEffect(() => {
    checkToken()
      .then((res: any) => {
        if (res && res.data && res.data.user && res.data.user._id) {
          const { user, context } = res.data
          dispatch({ type: ActionType.SET_USER, data: { user } })
          dispatch({ type: ActionType.SET_CONTEXT, data: { context } })
        } else {
          props.history.push('/')
        }
      })
      .catch(() => undefined)
  }, [])
  React.useEffect(() => {
    if (store.csrf) websocket(store, dispatch)
  }, [store.csrf])


  if (!store.csrf) return (<Loading />)

  return (
    <Suspense fallback={<Loading />}>
      {
        store.user && store.user._id ?
          <PostLogin {...props} />
          :
          <Login />
      }
    </Suspense>
  )
}

export default App
