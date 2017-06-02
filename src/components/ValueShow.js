import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import defaults from './../defaults';

const styles = StyleSheet.create({
  messageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    paddingBottom: 5,
  },
  label: {
    color: defaults.color.main,
    fontSize: 22,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 10,
  },
  dataContainer: {
    alignItems: 'flex-end',
  },
});

const ValueShow = props => (
  <View style={styles.messageContainer}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={styles.dataContainer}>
      <Text style={[styles.value, { color: props.valueColor }]}>
        {props.value}
      </Text>
      <Text style={styles.message}>
        {props.message}
      </Text>
    </View>
  </View>
);

ValueShow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueColor: PropTypes.string,
  message: PropTypes.string,
};

ValueShow.defaultProps = {
  message: '',
  valueColor: defaults.color.main,
};

export default ValueShow;
