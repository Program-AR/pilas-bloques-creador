import React, {PureComponent} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import fetchAsset from "../../helpers/fetchAsset";

class MyNavbar extends PureComponent {
  render() {
    return <Navbar bg="light">
      {this.props.user ?
        <Navbar.Brand href="/">
          <img
            src="staticos/assets/images/logo.png"
            className="d-inline-block align-top"
            alt="Pilas bloques logo"
          />
        </Navbar.Brand> :
        <img
          src={fetchAsset('logo.png')}
          className="d-inline-block align-top"
          alt="Pilas bloques logo"
        />
      }
      <Nav className="mr-auto">
        <Nav.Link href="/create">Crear Nivel</Nav.Link>
        { this.props.user && this.props.user.fullPermissions && <Nav.Link href="/mylevels">Mis Niveles</Nav.Link> }
        { this.props.user && this.props.user.fullPermissions && <Nav.Link href="/publishedLevels">Niveles Publicados</Nav.Link> }
      </Nav>
      <Nav className="justify-content-end">
        { this.props.user && <Nav.Link onClick={() => this.logout()}>Cerrar sesion</Nav.Link> }
      </Nav>
      
    </Navbar>
 
  }

  logout() {
    this.props.logout()
  }
}

export default MyNavbar;