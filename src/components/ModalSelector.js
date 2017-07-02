import React, { Component, PropTypes } from 'react';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const style = StyleSheet.create({
  metaContainer: { backgroundColor: '#FFF' },
  modalContainer: { padding: 10, flex: 1 },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  rowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  rowText: { fontSize: 24 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  buttonText: {
    fontSize: 24,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});

export default class ModalSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      isVisible: false,
      selected: '',
    };
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.renderData = this.renderData.bind(this);
    this.selectData = this.selectData.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  onChangeFilter(value) {
    if (this.props.onChangeFilter) {
      return this.props.onChangeFilter(value);
    }
    return this.setState({ filter: value });
  }

  selectData(value) {
    if (this.props.onSelectData) {
      this.props.onSelectData(value);
    }
    this.setState({
      selected: value,
      isVisible: false,
    });
  }

  renderData() {
    const { data } = this.props;
    const filteredData = data.filter(d =>
      d.label.toLowerCase().startsWith(this.state.filter.toLowerCase()),
    );
    return filteredData.map(d => (
      <View key={d.id} style={style.rowContainer}>
        <TouchableOpacity onPress={() => this.selectData(d)}>
          <Text style={style.rowText}>{d.label || d}</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  renderButton() {
    const label = this.props.buttonLabel
      ? <Text style={style.buttonLabel}>{this.props.buttonLabel}</Text>
      : null;
    return (
      <View>
        {label}
        <TouchableOpacity
          onPress={() => this.setState({ isVisible: !this.state.isVisible })}
        >
          <View style={style.buttonContainer}>
            <Text style={style.buttonText}>
              {this.props.selectedData ||
                this.state.selected.label ||
                this.props.defaultButtonText}
            </Text>
            <Icon name="search" style={style.buttonText} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { label } = this.props;
    return (
      <View>
        {this.renderButton()}
        <Modal isVisible={this.state.isVisible} style={style.metaContainer}>
          <View style={style.modalContainer}>
            <View style={style.filterContainer}>
              <Text>{label}</Text>
              <TextInput
                placeholder="Filtrar pelo nome..."
                onChangeText={value => this.onChangeFilter(value)}
              />
            </View>
            <ScrollView style={style.dataContainer}>
              {this.renderData()}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

ModalSelector.propTypes = {
  buttonLabel: PropTypes.string,
  onChangeFilter: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired }),
  ),
  onSelectData: PropTypes.func,
  selectedData: PropTypes.string,
  defaultButtonText: PropTypes.string,
};
ModalSelector.defaultProps = {
  label: 'Filtro',
  onChangeFilter: undefined,
  data: [],
  selectedData: undefined,
  onSelectData: () => {},
  defaultButtonText: 'Selecione...',
  buttonLabel: undefined,
};
