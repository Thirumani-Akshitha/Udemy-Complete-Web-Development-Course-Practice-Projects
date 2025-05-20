import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import './App.css'
import FirstPage from './routing/FirstPage'
import SecondPage from './routing/SecondPage'
import ThirdPage from './routing/ThirdPage'

function App() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">MyWebsite</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/first" className="nav-link">Home</Link></li>
            <li><Link to="/second" className="nav-link">About</Link></li>
            <li><Link to="/third" className="nav-link">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/first" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/third" element={<ThirdPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
