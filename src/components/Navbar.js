import React, { PropTypes } from 'react';
import NavigationBar from 'react-native-navbar';
import defaults from './../defaults';
import { Icon } from 'react-native-elements';

const OpenDrawerButton = ({ onPress }) => (
  <Icon
    style={{ padding: 10 }}
    name="bars"
    type="font-awesome"
    color="#FFF"
    onPress={onPress}
  />
);

OpenDrawerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const NavBar = props => (
  <NavigationBar
    tintColor={defaults.color.main}
    leftButton={<OpenDrawerButton onPress={props.onPressLeft} />}
    title={{
      title: props.titleString,
      tintColor: '#FFF',
    }}
    {...props}
  />
);

NavBar.propTypes = {
  onPressLeft: PropTypes.func.isRequired,
  titleString: PropTypes.string.isRequired,
};

export default NavBar;
