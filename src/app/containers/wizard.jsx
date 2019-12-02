import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wizard from '../components/wizard';
import * as actions from '../actions/wizard';
import { isDesktop } from '../config';
import downloadLevel from '../helpers/downloadLevel';

class WizardContainer extends PureComponent {

  componentWillMount() {
    this.props.actions.fetchMe();
  }

  onSave() {
    const { level, user } = this.props;
    if(isDesktop || !user.fullPermissions)
      downloadLevel(level)
    else
      this.props.actions.save(level);
  }

  onUpdateProps(props) {
    this.props.actions.updateLevelProps(props);
  }

  render() {
    return (
        <Wizard {...this.props} onSave={() => this.onSave()} onUpdateProps={props => this.onUpdateProps(props)}/>
    );
  }
}
function mapStateToProps({ level: { level, isLoading, success }, commons: { user } }) {
    return { level, isLoading, user, success };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardContainer);
