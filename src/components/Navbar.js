import React, { PropTypes } from 'react';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaults from './../defaults';

const NavBar = (props) => {
  const OpenDrawerButton = (
    <Icon
      onPress={props.onPressLeft}
      style={{ padding: 10 }}
      name={props.iconName}
      size={24}
      color="#FFF"
    />
  );
  return (
    <NavigationBar
      tintColor={defaults.color.main}
      leftButton={OpenDrawerButton}
      title={{
        title: props.titleString,
        tintColor: '#FFF',
      }}
      {...props}
    />
  );
};

NavBar.propTypes = {
  onPressLeft: PropTypes.func.isRequired,
  titleString: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

NavBar.defaultProps = {
  iconName: 'menu',
};

export default NavBar;
