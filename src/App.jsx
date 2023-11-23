import { useAuth } from './auth/Auth'
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import DiscoverSongs from './pages/DiscoverSongs/DiscoverSongs'
import AddSongs from './pages/AddSongs/AddSongs'
import ReportSongs from './pages/ReportSongs/ReportSongs'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={user ? <Navbar /> : <Login/>}>
        <Route index element={<PrivateRoute user={user}><DiscoverSongs /></PrivateRoute>} />
        <Route path="AddSongs" element={<PrivateRoute user={user}><AddSongs /></PrivateRoute>} /> 
        <Route path="ReportSongs" element={<PrivateRoute user={user}><ReportSongs /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
