import { NavLink, useNavigate } from "react-router";
import { Col, Row } from 'reactstrap';
import logo from '../assets/logo.png';

const Header = (props: {
  toggleSidebar: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <Row>
        <Col xs={4} className="mb-0 d-flex justify-content-start align-items-end gap-1">
          <div className="app-header-link-container">
            <span className="app-nav-link" onClick={() => props.toggleSidebar()}>Lemma's</span>
          </div>
          <div className="app-header-link-container">
            <NavLink to="/gebruik-van-de-lijst" className="app-nav-link">Gebruik</NavLink>
          </div>
        </Col>
        <Col xs={4} className='mb-0 d-flex justify-content-center'>
          <div className="app-header-brand" onClick={() => navigate('/')}>
            <img src={logo} alt='logo' width={48} height={48} />
            <div>
              STERBOEKEN
            </div>
          </div>
        </Col>
        <Col xs={4} className="mb-0 d-flex justify-content-end align-items-end gap-1">
          <div className="app-header-link-container">
            <NavLink to="/over-het-project" className="app-nav-link">Over het project</NavLink>
          </div>
          <div className="app-header-link-container">
            <NavLink to="/samenwerken" className="app-nav-link">Samenwerken?</NavLink>
          </div>
          <div className="app-header-link-container">
            <NavLink to="/colofon" className="app-nav-link">Colofon</NavLink>
          </div>
        </Col>
      </Row>
    </header>
  )
}

export default Header;