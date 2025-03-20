import Homepage from './pages/Homepage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Details from './pages/Details';


function App() {
  
  return (

    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Homepage />} />s
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>

    </Router>
    
  )

}

export default App
