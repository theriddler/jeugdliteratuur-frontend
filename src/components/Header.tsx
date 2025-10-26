import { NavLink, useNavigate } from "react-router";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledDropdown } from 'reactstrap';
import logo from '../assets/logo.png';
import partner_logo_1 from '../assets/partner_logo_1.jpg';
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { Searchbar } from "./Searchbar";

const Header = (props: {
  toggleSidebar: () => void;
}) => {
  const [ mobileNavIsOpen, setMobileNavIsOpen ] = useState(false);
  const toggleMobileNav = () => setMobileNavIsOpen(prev => !prev);

  return (
    <header className="app-header">
      {/* Desktop header */}
      <Row className="d-none d-lg-flex">
        <Col xs={4} className="mb-0 d-flex justify-content-start align-items-end gap-1">
          <div className="app-header-link-container">
            <span className="app-nav-link" onClick={() => props.toggleSidebar()}>Lemma's</span>
          </div>
          <div className="app-header-link-container">
            <UncontrolledDropdown>
              <DropdownToggle className="app-nav-link">Gebruik</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink to="/gebruik-van-de-lijst" className="app-nav-link">Gebruik van de lijst</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/alle-lemmas" className="app-nav-link">Lemma's op alfabet</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/" className="app-nav-link" onClick={() => alert('WIP')}>Didactische tips</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Col>
        <Col xs={4} className='mb-0 d-flex justify-content-center'>
          <HeaderLogo />
        </Col>
        <Col xs={4} className="mb-0 mt-1 d-flex flex-column justify-content-between gap-3">
          <div className="ps-4 d-flex justify-content-end gap-3">
            <div>
              <Searchbar placeholder="Zoeken" closeMobileNav={() => setMobileNavIsOpen(false)} />
            </div>
            <div className="image-wrapper partner-logo">
              <img src={partner_logo_1} />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-1">
            <div className="app-header-link-container">
              <NavLink to="/over-het-project" className="app-nav-link">Over het project</NavLink>
            </div>
            <div className="app-header-link-container">
              <NavLink to="/feedback" className="app-nav-link">Feedback</NavLink>
            </div>
            <div className="app-header-link-container">
              <NavLink to="/colofon" className="app-nav-link">Colofon</NavLink>
            </div>
          </div>
        </Col>
      </Row>
      {/* Mobile header */}
      <div className="px-3 d-flex d-lg-none justify-content-between align-items-center">
        <HeaderLogo />
        <button className="pretty-button" onClick={toggleMobileNav}>
          <IconMenu2 />
        </button>
      </div>
      <Offcanvas direction="end" isOpen={mobileNavIsOpen} toggle={toggleMobileNav} className="app-mobile-offcanvas">
        <OffcanvasHeader toggle={toggleMobileNav} className="text-light">
          Navigatie
        </OffcanvasHeader>
        <OffcanvasBody>
          <div className="d-flex flex-column gap-3">
            <Searchbar placeholder="Zoeken" closeMobileNav={() => setMobileNavIsOpen(false)} />
            <div className="app-mobile-offcanvas-link-container">
              <span className="app-nav-link" onClick={() => props.toggleSidebar()}>Lemma's</span>
            </div>
            <div className="app-mobile-offcanvas-link-container">
              <UncontrolledDropdown>
                <DropdownToggle className="app-nav-link w-100 text-start">Gebruik</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink to="/gebruik-van-de-lijst" className="app-nav-link">Gebruik van de lijst</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/alle-lemmas" className="app-nav-link">Lemma's op alfabet</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/" className="app-nav-link" onClick={() => alert('WIP')}>Didactische tips</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="app-mobile-offcanvas-link-container">
              <NavLink to="/over-het-project" className="app-nav-link">Over het project</NavLink>
            </div>
            <div className="app-mobile-offcanvas-link-container">
              <NavLink to="/feedback" className="app-nav-link">Feedback</NavLink>
            </div>
            <div className="app-mobile-offcanvas-link-container">
              <NavLink to="/colofon" className="app-nav-link">Colofon</NavLink>
            </div>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </header>
  )
}

const HeaderLogo = () => {
  const navigate = useNavigate();

  return (
    <div className="app-header-brand" onClick={() => navigate('/')}>
      <img src={logo} alt='logo' width={48} height={48} />
      <div>
        STERBOEKEN
      </div>
    </div>
  )
}

export default Header;