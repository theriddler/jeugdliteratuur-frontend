import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

export const AppLayout = () => {

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
            <NavItem>
              <NavLink href="/lemmas/">Lemmas</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
      <Container>
        <Outlet />
      </Container>
    </main>
  )
}