import React from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import IconWithTooltip from "../iconWithTooltip";
import "./levelDashboard.css";

export default (props) => {
  const { publish } = props;
  const {_id, name, category, columns, rows, scene, publishData} = props.item;
  const publishProps = publishData ?
    { action: () => props.onDepublish(props.item), tooltip: "Despublicar", icon: "fa fa-times" } :
    { action: () => props.onPublish(props.item), tooltip: "Publicar", icon: "fa fa-cloud-upload", path: "/publishedLevels/new" };
  return (
    <Row>
      <Col md={2} className={'centerColumn'} >
        {name}
      </Col>
      

      <Col md={4} className={'centerColumn:vertical'} >
        <div>Enunciado: {category}</div>
        <div>Tamaño: {`${rows}x${columns}`}</div>
        <div>Escena: {scene.type}</div>
        { publishData && <div>Dificultad: {publishData.difficulty}</div> }
      </Col>
      <Col md={3} className={'centerColumn:vertical'} >
        <div>{publishData ? publishData.categories.map(it => <span class="badge badge-success">{it}</span>) : "No publicado"}</div>
      </Col>
      <Col md={3} className={'centerColumn'}>
      <span className="actionLink">
        { !publish && <WithActionLink
          path={"/edit"}
          action={() => props.onEdit(props.item)}
          name={"edit"}
          tooltip={"Editar"}
          icon={"fa fa-edit"}
        />
      }
      </span>
      <span className="actionLink">
        <WithActionLink
          action={() => props.onExport(props.item)}
          name={"export"}
          tooltip={"Exportar"}
          icon={"fa fa-download"}
        />
      </span>
      <span className="actionLink">
       { !publish && <WithActionLink
          {...publishProps}
          name={"publish"}
        />
      }
      </span>
      <span className="actionLink">
        { !publish && <WithActionLink
          action={() => props.onDelete(props.item)}
          name={"delete"}
          tooltip={"Eliminar"}
          icon={"fa fa-trash-o"}
        />
      }
      </span>
      <span className="actionLink">
        { publish &&
        <WithActionLink
          path={`/publishedLevels/${_id}`}
          action={() => props.onDetail(props.item)}
          name={"detail"}
          tooltip={"Detalle"}
          icon={"fa fa-info"}
        />
      }
      </span>
      </Col> 
    </Row>
  )
};

const WithActionLink = ({ path = "#", action, name, tooltip, icon }) => (
  <Link to={path}>
    <a className="clickable" onClick={action}>
      <IconWithTooltip name={name} tooltip={tooltip} iconClass={`${icon}`}/>
    </a>
  </Link>
);
