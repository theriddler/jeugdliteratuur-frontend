import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { NavLink } from "react-router";
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
    <aside className={`sidebar`}>
      <nav className="sidebar-nav">
        <div>
          {levels?.map((level) => (
            <NavLink
              key={level?.id}
              to={`/groep/${level?.id}`}
              className="sidebar-nav-link"
            >
              {level?.attributes?.titel}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;