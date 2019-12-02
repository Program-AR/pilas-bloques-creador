import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar/navbar';
import * as dashboardActions from '../../actions/dashboard';
import * as commonActions from '../../actions/commons';

class NavbarContainer extends PureComponent {

  componentWillMount() {
    this.props.actions.common.fetchMe();
  }

  logout() {
    this.props.actions.dashboard.logout();
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} logout={() => this.logout()}/>
      </div>
    );
  }
}
function mapStateToProps({ commons: { user }}) {
    return { user };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: {
        dashboard: bindActionCreators(dashboardActions, dispatch),
        common: bindActionCreators(commonActions, dispatch)
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
