// hooks/useAuth.js
export const useAuth = () => {
  const userData = localStorage.getItem("todo-user");
  const isAuthenticated = !!userData;
  const user = userData ? JSON.parse(userData) : null;

  return { isAuthenticated, user };
};
