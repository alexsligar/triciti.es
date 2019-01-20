import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Loading from '../universal/Loading';

export default connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.authedUser.user !== undefined,
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: Loading,
});
