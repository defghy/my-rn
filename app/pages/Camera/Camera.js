import React from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

import TakePicPopup from './components/TakePicPopup';
import ScanPopup from './components/ScanCodePopup';
import ScanFacePopup from './components/ScanFacePopup';
import ScanTextPopup from './components/ScanTextPopup';

class CameraTest extends React.Component {

  state = {
    picUrl: '',
    code: '',
    faceData: '',
    txt: ''
  };

  componentDidMount() {

  }

  takePicture = async() => {
    global.popup({
      content: TakePicPopup,
      props: {
        onSave: data => {
          this.setState({
            picUrl: data.uri
          });
        }
      }
    });
  };

  scanCode = async () => {
    global.popup({
      content: ScanPopup,
      props: {
        onSave: ({data, type}) => {
          this.setState({ code: `type: ${type}; data: ${data}` });
        }
      }
    });
  }

  scanFace = async () => {
    global.popup({
      content: ScanFacePopup,
      props: {
        onSave: (data) => {
          this.setState({ faceData: data });
        }
      }
    });
  }

  scanText = async () => {
    global.popup({
      content: ScanTextPopup,
      props: {
        onSave: (data) => {
          this.setState({ txt: data });
        }
      }
    });
  }

  render() {
    const { picUrl, code, faceData, txt } = this.state;
    return (
      <Page>
        <Header />
        <View style={styles.body}>

          <View style={styles.imgWrapper}>
            { !!picUrl &&
              <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: picUrl}}
              />
            }
          </View>
          <TouchableOpacity onPress={this.takePicture} style={styles.btn}>
            <Text style={styles.btnText}>拍照</Text>
          </TouchableOpacity>

          <View>
            { !!code &&
              <Text>{code}</Text>
            }
          </View>
          <TouchableOpacity onPress={this.scanCode} style={styles.btn}>
            <Text style={styles.btnText}>扫码</Text>
          </TouchableOpacity>

          {/* 依赖 Google Service
          <TouchableOpacity onPress={this.scanFace} style={styles.btn}>
            <Text style={styles.btnText}>人脸识别</Text>
          </TouchableOpacity>

          <View>
            { !!txt &&
              <Text>{txt}</Text>
            }
          </View>
          <TouchableOpacity onPress={this.scanText} style={styles.btn}>
            <Text style={styles.btnText}>文字识别</Text>
          </TouchableOpacity>*/}

        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    alignItems: 'center'
  },
  imgWrapper: {
    height: '100rem', width: '100rem',
    borderColor: '#979797', borderWidth: EStyleSheet.hairlineWidth,
  },
  btn: {
    backgroundColor: '#0084ff',
    borderRadius: 5,
    paddingVertical: 10, paddingHorizontal: 20,
    marginTop: '10rem'
  },
  btnText: {
    color: '#fff',
    fontSize: '14rem', fontWeight: 'bold'
  }
});

export default CameraTest;