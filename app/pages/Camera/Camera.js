import React from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';
import TakePicPopup from './components/TakePicPopup';


class CameraTest extends React.Component {

  state = {
    picUrl: ''
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

  render() {
    const { picUrl } = this.state;
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
            <Text style={styles.btnText}> 拍照 </Text>
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