import React, { PureComponent } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as dashboard from "../../actions/dashboard";
import * as publishDetails from "../../actions/publishDetails";
import PublishedLevelDetail from "../../components/publishedLevelsDashboard/publishedLevelDetail"
import downloadLevel from "../../helpers/downloadLevel";

class PublishedLevelDetailContainer extends PureComponent {

  componentWillMount() {
    const { match: { params: { id } } } = this.props;
    this.props.actions.dashboard.fetchLevel(id);
  }

  onDownload(level) {
    this.props.actions.dashboard.download(level);
    downloadLevel(level);
  }

  onComment(comment) {
    this.props.actions.dashboard.comment(this.props.publishedLevelToDetail, comment);
  }
  onRate = rate => {
    this.props.actions.publishDetails.rateLevel(this.props.publishedLevelToDetail,rate);
  };

  render() {
    return <PublishedLevelDetail
      publishedLevelToDetail={this.props.publishedLevelToDetail}
      onDownload={it => this.onDownload(it)}
      onComment={it => this.onComment(it)}
      onRate={this.onRate}
      user={this.props.user}
    />;
  };
}

function mapStateToProps({ dashboard: { publishedLevelToDetail }, commons:{user} }) {
  return { publishedLevelToDetail,user };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        dashboard: bindActionCreators(dashboard, dispatch),
        publishDetails: bindActionCreators(publishDetails, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishedLevelDetailContainer);
