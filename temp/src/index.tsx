import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from './theme'
import Provider from './hooks/context'
import Loading from './components/loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
const App = React.lazy(() => import('./App'))

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider>
      <Suspense fallback={<Loading />}>
        <Router >
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
