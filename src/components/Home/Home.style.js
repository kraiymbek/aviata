import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.aviato.bgColor,
  },
  searchForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '111px',
    marginBottom: 20,
    background: '#fff',
  },
  header: {
    display: 'flex',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    marginBottom: 19,
  },
  headerMessage: {
    fontSize: '2rem',
    margin: 0,
  },
  content: {
    display: 'flex',
    width: 1200,
    minHeight: '100vh',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  topFilterInfo: {
    marginBottom: 23,
    height: 30,
  },
  mainContent: {
    display: 'flex',
  },
  leftFilters: {
    display: 'flex',
    width: 240,
    marginRight: 20,
  },
  rightContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
}));

export default useStyles;
