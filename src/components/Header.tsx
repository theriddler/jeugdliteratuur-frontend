import { IconMenu2, IconStar } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledDropdown } from 'reactstrap';
import { STERBOEKEN_SECONDARY } from "../App";
import logo96 from '../assets/logo-96.png';
import partner_logo_1 from '../assets/partner_logo_1.jpg';
import partner_logo_2 from '../assets/partner_logo_2.png';
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
            <span className="app-nav-link d-flex align-items-center gap-2 primary-hover" onClick={() => props.toggleSidebar()}>
              <IconStar className="" color={STERBOEKEN_SECONDARY} height={16} width={16} />
              <span>Teksten</span>
            </span>
          </div>
          <div className="app-header-link-container">
            <UncontrolledDropdown>
              <DropdownToggle className="app-nav-link">Gebruik</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink to="/gebruik-van-de-lijst" className="app-nav-link">Gebruik van de lijst</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/alle-teksten" className="app-nav-link">Alle teksten</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/alle-tags" className="app-nav-link">Alle tags</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/close-reading" className="app-nav-link">Close reading</NavLink>
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
              <Searchbar placeholder="Zoek een lemma of tag" closeMobileNav={() => setMobileNavIsOpen(false)} />
            </div>
            <a target="_blank" href="https://www.kb.nl/">
              <div className="image-wrapper partner-logo">
                <img src={partner_logo_2} />
              </div>
            </a>
            <a target="_blank" href="https://www.lezen.nl/">
              <div className="image-wrapper partner-logo">
                <img src={partner_logo_1} />
              </div>
            </a>
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
      <div className="d-flex d-lg-none app-header-mobile-container">
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
            <Searchbar placeholder="Zoek een lemma of tag" closeMobileNav={() => setMobileNavIsOpen(false)} />
            <div className="app-mobile-offcanvas-link-container" onClick={toggleMobileNav}>
              <span className="app-nav-link" onClick={() => props.toggleSidebar()}>Teksten</span>
            </div>
            <div className="app-mobile-offcanvas-link-container">
              <UncontrolledDropdown>
                <DropdownToggle className="app-nav-link w-100 text-start">Gebruik</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={toggleMobileNav}>
                    <NavLink to="/gebruik-van-de-lijst" className="app-nav-link">Gebruik van de lijst</NavLink>
                  </DropdownItem>
                  <DropdownItem onClick={toggleMobileNav}>
                    <NavLink to="/alle-teksten" className="app-nav-link">Alle teksten</NavLink>
                  </DropdownItem>
                  <DropdownItem onClick={toggleMobileNav}>
                    <NavLink to="/close-reading" className="app-nav-link">Close reading</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="app-mobile-offcanvas-link-container" onClick={toggleMobileNav}>
              <NavLink to="/over-het-project" className="app-nav-link">Over het project</NavLink>
            </div>
            <div className="app-mobile-offcanvas-link-container" onClick={toggleMobileNav}>
              <NavLink to="/feedback" className="app-nav-link">Feedback</NavLink>
            </div>
            <div className="app-mobile-offcanvas-link-container" onClick={toggleMobileNav}>
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
      <img
        alt='logo'
        src={logo96}
        width={48}
        height={48}
      />
      <div>
        STERBOEKEN
      </div>
    </div>
  )
}

export default Header;