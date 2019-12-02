import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dashboard from '../../components/levelDashboard/levelDashboard';
import * as dashboard from '../../actions/dashboard';
import * as publish from "../../actions/publish";
import * as wizard from '../../actions/wizard';
import downloadLevel from '../../helpers/downloadLevel';

class LevelDashboardContainer extends PureComponent {

  componentWillMount() {
    this.props.actions.dashboard.fetchLevels()
  }

  render() {
    return (
      <Dashboard
        {...this.props}
        onExport={downloadLevel}
        onPublish={it => this.loadLevelToPublish(it)}
        onDepublish={it => this.onDepublish(it)}
        onEdit={it => this.onEdit(it)}
        onDelete={it => this.onDelete(it)}
      />
    );
  }

  loadLevelToPublish(level) {
    this.props.actions.publish.loadLevelToPublish(level);
  }

  onDepublish(level) {
    this.props.actions.publish.depublish(level);
  }

  onEdit(level) {
    this.props.actions.wizard.updateLevelProps(level);
  }

  onDelete(level) {
    this.props.actions.dashboard.deleteLevel(level);
  }

}
function mapStateToProps({ dashboard: { levels } }) {
    return { levels };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
          dashboard: bindActionCreators(dashboard, dispatch),
          wizard: bindActionCreators(wizard, dispatch),
          publish: bindActionCreators(publish, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelDashboardContainer);
