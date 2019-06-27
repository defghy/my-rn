import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/AntDesign';

class TCPopup extends React.Component {

  componentDidMount() {

  }

  scan = ({ data, type }) => {
    this.props.onSave({data, type});
    this.props.close();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.close} style={styles.close}>
          <Icon
            name="close"
            style={{fontSize: 30, color: '#fff'}} />
        </TouchableOpacity>
        <RNCamera
          style={styles.camera}
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          onTextRecognized={this.scan}
          androidCameraPermissionOptions={{
            title: '请求摄像头权限',
            message: '需要摄像头来拍照',
            buttonPositive: '同意',
            buttonNegative: '取消',
          }}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%', height: '100%',
    backgroundColor: '#000'
  },
  camera: {
    width: '100%', height: '100%'
  },
  capWrapper: {
    width: '100%',
    flexDirection: 'row', justifyContent: 'center',
    position: 'absolute', bottom: 0, zIndex: 1
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: '25rem',
    width: '50rem', height: '50rem',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '20rem', color: '#0084ff',
    marginBottom: '12rem'
  },
  close: {
    position: 'absolute', left: '12rem', top: '12rem',
    zIndex: 1
  },
  captureText: {
    fontSize: '20rem', color: '#0084ff', fontWeight: 'bold'
  }
});

export default TCPopup;