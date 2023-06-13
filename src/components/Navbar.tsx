import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper px1" style={{
      overflow: 'hidden',
      background: '#720074'
    }}>
      <NavLink to="/" style={{fontSize: '2.1rem'}}>
        Het weer in Dourbes
      </NavLink>
      <ul className="right hide-on-med-and-down">
        <li cy-data="home-nav-link">
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            Over
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
)
