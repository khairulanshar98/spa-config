import React, { ReactElement } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBarComponent from './components/header'
import ErrorSnackbar from './components/snackbar'
import { RouteComponentProps } from 'react-router-dom'
import PreLogin from './PreLogin'

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: '#f5f5f5',
        overflowX: 'hidden'
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    root: {
      overflowX: 'hidden'
    },
  }),
)

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps): ReactElement => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBarComponent {...props} />
      <ErrorSnackbar />
      <PreLogin {...props} />
    </Box>
  )
}

export default App
