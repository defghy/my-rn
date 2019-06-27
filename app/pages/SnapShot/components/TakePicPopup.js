import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

class TCPopup extends React.Component {

  componentDidMount() {

  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.onSave(data);
      this.props.close();
    }
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
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: '请求摄像头权限',
            message: '需要摄像头来拍照',
            buttonPositive: '同意',
            buttonNegative: '取消',
          }}
          androidRecordAudioPermissionOptions={{
            title: '请求录音权限',
            message: '这个声音不知道有啥用',
            buttonPositive: '同意',
            buttonNegative: '取消',
          }}
        />
        <View style={styles.capWrapper}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={styles.captureText}>拍</Text>
          </TouchableOpacity>
        </View>
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