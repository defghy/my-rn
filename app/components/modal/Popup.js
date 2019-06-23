import React from 'react';
import { View, Modal } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class Popup extends React.Component {
  static defaultProps = {

  };

  state = {
    visible: false,
    Content: null,
    props: {}
  };

  componentDidMount() {
    global.popup = this.open;
  }

  open = ({ content, props }) => {
    this.setState({
      visible: true,
      Content: content,
      props
    });
  };

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible, Content, props = {} } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={this.close}
      >
        <View style={styles.container}>
          <Content
            close={this.close}
            {...props}
          />
        </View>
      </Modal>
    );
  }
}

const styles = EStyleSheet.create({

});

export default Popup;