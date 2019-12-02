import React from "react";
import {Col, Row} from "react-bootstrap";
import moment from 'moment-with-locales-es6';

export default ({ author, date, text }) => {
  return (
    <div>
      <div className="commentTitle">        
        <span className="commentAutor">
          {author}
        </span> - 
        <span className="commentDate">
          {moment(date.toLocaleString()).locale("es").calendar()}
        </span>
      </div>
      <div className="commentParagraph">
        {text} 
      </div>
    </div>  
  )
};


