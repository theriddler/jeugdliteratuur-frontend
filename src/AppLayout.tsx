import { useQuery } from "@apollo/client";
import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { LEVELS } from "./queries";

export const AppLayout = () => {
  const { data } = useQuery(LEVELS);

  return (
    <main>
      <div>
        <Navbar color='dark'>
          <NavbarBrand>
            <Link to='/'>
              Jeugd Literatuur
            </Link>
          </NavbarBrand>
          <Nav className="me-auto flex-row gap-3" navbar>
            {data?.levels?.map((l) => (
              <NavItem>
                <Link to={`/groep/${l?.documentId}`}>
                  {l?.title}
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Navbar>
      </div>
      <Container className="mt-3">
        <Outlet />
      </Container>
    </main>
  )
}