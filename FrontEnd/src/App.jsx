import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './components/Pages/Landing/Landing';
import Login from './components/Pages/Auth/Login';
import Signup from './components/Pages/Auth/Signup';
import About from './components/Pages/About/About';
import Todo from './components/Pages/Todo/Todo';
import Navber from './components/Navber';
import ProtectedRoute from './routes/Protected';
import PublicOnlyRoute from './routes/Public';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/todo","/*"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
     {/* <ToastContainer position="top-right" autoClose={3000} /> */}
     <ToastContainer
  position="top-center"
  autoClose={1000}
  hideProgressBar={false}

/>
      {shouldShowNavbar && <Navber />}
      <Routes>
        {/* Public only routes */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Landing />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />

        {/* Protected route (only for logged-in users) */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />

        {/* Optional: About page also protected */}
        <Route
          path="/about"
          element={
            <PublicOnlyRoute>
              <About />
            </PublicOnlyRoute>
          }
        />
      </Routes>
       {shouldShowNavbar && <Footer />}
    </>
  );
}

export default App;
