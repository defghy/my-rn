import React from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { captureScreen } from "react-native-view-shot";

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

class CameraTest extends React.Component {

  state = {
    picUrl: ''
  };

  componentDidMount() {

  }

  takePicture = async() => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
      result: 'data-uri'
    })
    .then(
      uri => {
        this.setState({ picUrl: uri });
      },
      error => console.error("Oops, snapshot failed", error)
    );
  };

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
                resizeMode="contain"
              />
            }
          </View>
          <TouchableOpacity onPress={this.takePicture} style={styles.btn}>
            <Text style={styles.btnText}>截屏</Text>
          </TouchableOpacity>

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
    height: '200rem', width: '200rem',
    borderColor: '#979797', borderWidth: EStyleSheet.hairlineWidth,
    backgroundColor: '#000'
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