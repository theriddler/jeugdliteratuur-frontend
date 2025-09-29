import { useQuery } from "@apollo/client";
import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { LEVELS } from "./queries";

export const AppLayout = () => {
  const { data } = useQuery(LEVELS);

  return (
    <main>
      <div>
        <Navbar>
          <NavbarBrand>
            <Link to='/'>
              Jeugd Literatuur
            </Link>
          </NavbarBrand>
          <Nav className="me-auto" navbar>
            {data?.levels?.map((l) => (
              <NavItem>
                <Link to={`/groep/${l?.documentId}`}>
                  {l?.Title}
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Navbar>
      </div>
      <Container>
        <Outlet />
      </Container>
    </main>
  )
}