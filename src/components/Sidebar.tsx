import { NavLink } from "react-router";
import logo from '../assets/logo.png'
import { useQuery } from "@apollo/client";
import { LEVELS } from "../queries";

const Sidebar = () => {
  const { data } = useQuery(LEVELS);
  const levels = data?.niveaus?.data
  console.log(data)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/' className="sidebar-brand">
          <img src={logo} alt='logo' width={64} height={64} />
        </NavLink>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-nav-group-header">Lemmas</div>
        {levels?.map((level) => (
          <NavLink
            key={level?.id}
            to={`/groep/${level?.id}`}
            className="app-nav-link"
          >
            {level?.attributes?.titel}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;