import React, { Component } from 'react';
import SelectLevelType from './selectLevelType';
import _ from 'lodash';

export default class SelectLevelTypeWrapper extends Component {

  isValidated() {
    this.props.onUpdateProps(this.props.level);
    return !_.isEmpty(_.get(this.props,"level.scene"));
  }

  render() {
    return (
      <div className='container'>
        <SelectLevelType {...this.props}/>
      </div>
    )
  }
}
