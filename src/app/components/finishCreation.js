import React, { Component } from 'react';
import { Container } from "react-bootstrap";

export default class BasicConfiguration extends Component {
  render() {
    return (
      <div>
        { 
          this.props.isLoading ? <span>Cargando...</span> : this.SuccessOrFailure()
        }
      </div>
    )
  }

  SuccessOrFailure = () => {
    return this.props.success? this.Success() : this.Failure();
  }

  Success = () => 
    <Container>
      <h1>Gracias!</h1>
      <br/>
      <h4>El nivel fue creado exitosamente</h4>
    </Container>

  Failure = () => 
    <Container>
      <h1>Error</h1>
      <br/>
      <h4>El nombre del ejercicio ya existe</h4>
    </Container>
}
