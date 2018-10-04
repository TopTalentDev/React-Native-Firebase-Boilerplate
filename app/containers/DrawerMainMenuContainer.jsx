import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './styles/DrawerMainMenuContainerStyles';
import Avatar from '../components/Avatar';
import actionCreators from '../redux/actions';
const items = [
  {
    id: 1,
    name: 'Connect',
    label: 'Connect'
  },
  {
    id: 2,
    name: 'CorporateDirectory',
    label: 'Corporate Directory'
  }
];

export class DrawerMainMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { items };
  }
  _renderHeader() {
    const { me } = this.props;

    return (
      <View style={styles.header}>
        {!_.isEmpty(me) && (
          <View style={styles.login}>
            <Avatar user={me} />
            <View style={styles.identity}>
              <Text style={styles.grettingLabel}>Hello</Text>
              <Text style={styles.nameLabel}>
                {me.first_name} {me.last_name}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.settingsButton} onPress={this._onSettingsPressed}>
          <Image source={{ uri: 'drawer-icon' }} />
        </TouchableOpacity>
      </View>
    );
  }

  _navigate(route) {
    this.props.navigation.navigate(route);
  }

  _onSettingsPressed = () => {
    this._navigate('Settings');
  };

  _onItemPressed = item => {
    this._navigate(item.name);
  };

  _renderItem = ({ item }) => {
    return <MenuItem key={item.id} item={item} onPress={this._onItemPressed} />;
  };

  _keyExtractor = item => item.id;

  _renderList() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderList()}
      </View>
    );
  }
}

DrawerMainMenuContainer.propTypes = {
  navigation: PropTypes.object,
  me: PropTypes.object,
  menuOpened: PropTypes.bool
};

const mapStateToProps = state => ({
  uid: state.db.auth.uid,
  selectedProjectId: state.projectReducer.selectedProjectId,
  workingEstimationTask: state.projectReducer.workingEstimationTask,
  workingEstimationProjectType: state.projectReducer.workingEstimationProjectType,
  workingEstimationType: state.projectReducer.workingEstimationType,
  workingEstimationHourlyRate: state.projectReducer.workingEstimationHourlyRate,
  workingEstimationVelocity: state.projectReducer.workingEstimationVelocity,
  workingEstimationWeeklyLaborCost: state.projectReducer.workingEstimationWeeklyLaborCost,
  workingEstimationSprintLength: state.projectReducer.workingEstimationSprintLength,
  workingEstimationTaskList: state.projectReducer.workingEstimationTaskList,
  workingEstimationProjectName: state.projectReducer.workingEstimationProjectName,
  workingEstimationClientName: state.projectReducer.workingEstimationClientName,
  workingEstimationContractorName: state.projectReducer.workingEstimationContractorName
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMainMenuContainer);
