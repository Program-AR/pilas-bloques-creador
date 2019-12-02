import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from "lodash";

class List extends PureComponent {

  buildItems() {
    const highlightSelected = this.props.highlightSelected != null ? this.props.highlightSelected : true;
    const itemClass = _.isFunction(this.props.itemClass)? this.props.itemClass : (() => this.props.itemClass || "");
    return _.map(this.props.items, ((item,idx) => {
      return (
        <li className={`${itemClass(item,idx)} ${highlightSelected && item.$selected? "selected-item" : ""}`} key={`${idx}`}>
          {this.props.itemGetter(item,idx)}
        </li>
      );
    }));
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <ul className={this.props.listClass}>
            {this.buildItems()}
          </ul>
        </Col>
      </Row>
    );
  }
}

export default List;