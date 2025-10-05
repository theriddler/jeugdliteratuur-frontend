import { NavLink } from "react-router";
import logo from '../assets/logo.png'
import { useQuery } from "@apollo/client";
import { LEVELS } from "../queries";
import { useMemo } from "react";

const Sidebar = () => {
  const { data } = useQuery(LEVELS);
  const levels = useMemo(() => {
    const output = [ ...(data?.niveaus?.data ?? []) ]
    output.sort((a,) => a.attributes?.titel?.includes('Kind') ? 1 : 0)// put kindergarden first
    return output;
  }, [ data?.niveaus?.data ])

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/' className="sidebar-brand">
          <img src={logo} alt='logo' width={64} height={64} />
        </NavLink>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-nav-group-header">Lemma's</div>
        <div className="text-end">
          {levels?.map((level) => (
            <NavLink
              key={level?.id}
              to={`/groep/${level?.id}`}
              className="app-nav-link"
            >
              {level?.attributes?.titel}
            </NavLink>
          ))}
        </div>
        <div className="sidebar-nav-group-header">Gebruik van de lijst</div>
        <NavLink
          to={`/gebruik-van-de-lijst`}
          className="app-nav-link"
        >
          Gebruik van de lijst
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;