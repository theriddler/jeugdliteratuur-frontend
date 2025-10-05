import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { NavLink } from "react-router";
import logo from '../assets/logo.png';
import { sortKinderFirst } from "../funcs/sortKinderFirst";
import { LEVELS } from "../queries";

const Sidebar = () => {
  const { data } = useQuery(LEVELS);
  const levels = useMemo(() => {
    const output = [ ...(data?.niveaus?.data ?? []) ]
    output.sort(sortKinderFirst)// put kindergarden first
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