import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="nav" data-testid="navbar">
      <NavLink to="/" className="nav-mark">
        Arclight
      </NavLink>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
