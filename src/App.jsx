import Homepage from './pages/Homepage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Details from './pages/Details';
import { Analytics } from '@vercel/analytics/react';

function App() {
  
  return (

    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/details" element={<Details />} />
        </Routes>
        <Analytics />
      </div>

    </Router>
    
  )

}

export default App
