import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth'
import Home from './pages/home'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
