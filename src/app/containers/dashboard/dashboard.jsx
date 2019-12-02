import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../../components/dashboard/dashboard';
import * as actions from '../../actions/dashboard';

class DashboardContainer extends PureComponent {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Dashboard {...this.props} logout={() => this.logout()}/>
      </div>
    );
  }
}
function mapStateToProps({ commons: { user } }) {
    return { user };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
