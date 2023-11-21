import Discover from './pages/Discover/Discover'
import { useAuth } from './auth/Auth'
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const { user } = useAuth()
  return (
    <>
      <Routes>
        <Route element={user ? <Navbar /> : <Login/>}>
          <Route path="/" element={<PrivateRoute user={user}><Discover /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
