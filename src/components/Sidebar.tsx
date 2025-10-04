import { NavLink } from "react-router";
import logo from '../assets/logo.png'

const Sidebar = () => {
  // const { data } = useQuery(LEVELS);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/' className="sidebar-brand">
          <img src={logo} alt='logo' width={64} height={64} />
        </NavLink>
      </div>
      <nav className="sidebar-nav">
        {/* {data?.levels.map((level) => (
          <NavLink
            key={level?.documentId}
            to={`/groep/${level?.documentId}`}
            className="sidebar-app-nav-link"
          >
            {level?.title}
          </NavLink>
        ))} */}
        <div className="sidebar-nav-group-header">Lemmas</div>
        <NavLink to='/' className="app-nav-link">Groep 1</NavLink>
        <NavLink to='/' className="app-nav-link">Groep 2</NavLink>
        <NavLink to='/' className="app-nav-link">Groep 3</NavLink>
        <NavLink to='/' className="app-nav-link">Groep 4</NavLink>
        <NavLink to='/' className="app-nav-link">Groep 5</NavLink>
        <NavLink to='/' className="app-nav-link">Groep 6</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;