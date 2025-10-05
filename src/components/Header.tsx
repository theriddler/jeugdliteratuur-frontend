import { NavLink } from "react-router"

const Header = () => {
  return (
    <header className="app-header d-flex justify-content-between align-items-end">
      <div>
        <div className="app-header-brand">
          STERBOEKEN
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-end gap-3">
        <div className="app-header-link-container">
          <NavLink to="/over-het-project" className="app-nav-link">Over het project</NavLink>
        </div>
        <div className="app-header-link-container">
          <NavLink to="/samenwerken" className="app-nav-link">Samenwerken?</NavLink>
        </div>
        <div className="app-header-link-container">
          <NavLink to="/colofon" className="app-nav-link">Colofon</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header;