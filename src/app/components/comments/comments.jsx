import React, { useState } from "react";
import {Col, Row, Button} from "react-bootstrap";
import Comment from "./comment";
import List from '../list';
import "./comments.css"

export default ({ level, onComment }) => {
  const [currentComment, setCurrentComment] = useState("");
  const onClick = () => {
    setCurrentComment("");
    onComment(currentComment);
  };

  return (
    <div className="commentsContainer">
      <Row>
        <Col md={12}>
          <List
            listClass="list-group"
            itemClass="list-group-item incident"
            items={level.publishData.comments}
            itemGetter={comment => <Comment {...comment}/>}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <textarea
            className="form-control" 
            rows={3}
            maxLength={300}
            placeholder='¿Qué piensas sobre este nivel? (Máximo 300 caracteres)'
            value={currentComment}
            onChange={({ target: { value }}) => setCurrentComment(value)}
          />
          <div className="commentButton">
            <Button className="btn btn-success" onClick={onClick}>Comentar</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
};
