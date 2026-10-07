import { useAuth } from "@/_core/hooks/useAuth";
// Home page removed - using Dashboard layout instead
export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return null;
}
