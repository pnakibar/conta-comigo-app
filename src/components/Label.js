import React, { PropTypes } from 'react';
import { StyleSheet, Text } from 'react-native';

const style = StyleSheet.create({
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});

const Label = ({ name }) => <Text style={style.buttonLabel}>{name}</Text>;

Label.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Label;
