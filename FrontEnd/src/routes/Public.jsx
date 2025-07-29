
import { Navigate } from 'react-router-dom';
export default function PublicOnlyRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("todo-user");
  return isLoggedIn ? <Navigate to="/todo" replace /> : children;
}
