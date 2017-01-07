'use strict';
import {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import React from 'react';
import axios from 'axios';

import Camera from 'react-native-camera';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';


class HappyOMeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {takenPhotoURI: null, loading: false};
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    var content = (this.state.takenPhotoURI || this.state.loading) ? <Image
          style={styles.preview}
          source={{uri: `data:image/png;base64,${this.state.takenPhotoURI}`}}
        /> :
    <Camera
      ref={(cam) => {
        this.camera = cam;
      }}
      style={styles.preview}
      captureTarget={Camera.constants.CaptureTarget.memory}
      aspect={Camera.constants.Aspect.fill}>
      <TouchableHighlight>
        <View
          ref={component => this._root = component}>
          <Button containerStyle={styles.button} onPress={this.takePicture.bind(this)}></Button>
        </View>
      </TouchableHighlight>
      </Camera>;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}} />
        {content}
      </View>
    );
  }

  takePicture() {
    const self = this;
    this.camera.capture()
      .then((data) => {
        var config = {
          headers: {'Content-Type': 'application/octet-stream;base64'}
        };

        self.setState({takenPhotoURI: data.data, loading: true});

        axios.post('http://192.168.1.174:8080/emotions', data.data, config)
        .then(function (response) {
          self.setState({takenPhotoURI: response.data, loading: false});
        })
        .catch(function (error) {
          console.log(error);
        });

      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  button: {
      flex: 0,
      backgroundColor: '#fff',
      padding: 10,
      width: 70,
      height: 70,
      borderWidth: 1,
      borderRadius: 35,
      margin: 30
  }
});


AppRegistry.registerComponent('HappyOMeter', () => HappyOMeter);
