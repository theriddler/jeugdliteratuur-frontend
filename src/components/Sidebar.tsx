import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { NavLink } from "react-router";
import { sortNievauWithKinderFirst } from "../funcs/sortNievauWithKinderFirst";
import { LEVELS } from "../queries";

const Sidebar = (props: {
  setSidebarOpen: (v: boolean) => void;
}) => {
  const { data } = useQuery(LEVELS);
  const levels = useMemo(() => {
    const output = [ ...(data?.niveaus?.data ?? []) ]
    output.sort(sortNievauWithKinderFirst)// put kindergarden first
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
              onClick={() => props.setSidebarOpen(false)}
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