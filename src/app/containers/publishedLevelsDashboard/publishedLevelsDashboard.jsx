import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PublishedLevelsDashboard from '../../components/publishedLevelsDashboard/publishedLevelsDashboard';
import * as dashboard from '../../actions/dashboard';
import downloadLevel from '../../helpers/downloadLevel';

class PublishedLevelsDashboardContainer extends PureComponent {

  componentWillMount() {
    this.props.actions.dashboard.fetchPublishedLevels()
  }

  render() {
    const noop = () => {};
    return (
      <PublishedLevelsDashboard
        publishedLevels={this.props.publishedLevels}
	onDetail={(publishedLevel) => this.props.actions.dashboard.setPublishedLevelDetail(publishedLevel)}
        onExport={it => this.onExport(it)}
        onPublish={noop}
        onEdit={noop}
      />
    );
  }

  onExport(level) {
    this.props.actions.dashboard.download(level);
    downloadLevel(level)
  }

}
function mapStateToProps({ dashboard: { publishedLevels } }) {
    return { publishedLevels };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
          dashboard: bindActionCreators(dashboard, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishedLevelsDashboardContainer);
