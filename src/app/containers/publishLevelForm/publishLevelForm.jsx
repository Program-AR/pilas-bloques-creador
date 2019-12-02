import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as publish from '../../actions/publish';
import PublishLevelForm from '../../components/publishLevelForm/publishLevelForm';

class PublishLevelFormContainer extends PureComponent {

  render() {
    return this.props.level && (
      <PublishLevelForm
        level={this.props.level}
        onPublish={(categories, difficulty) => this.publishLevel(categories, difficulty)}
      />
    );
  }

  publishLevel(categories, difficulty) {
    this.props.actions.publish.publishLevel({level: this.props.level, categories, difficulty});
  }

}

function mapStateToProps({publish: {level}}) {
  return {level};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      publish: bindActionCreators(publish, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishLevelFormContainer);
