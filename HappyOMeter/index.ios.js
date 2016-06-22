'use strict';
import {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import React from 'react';
import Camera from 'react-native-camera';
import Button from 'react-native-button';

class HappyOMeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {takenPhotoURI: null};
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    var content;

    return (
      <View style={styles.container}>
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <TouchableHighlight>
          <View
            ref={component => this._root = component}>
            <Button containerStyle={styles.button} onPress={this.takePicture.bind(this)}></Button>
          </View>
        </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({takenPhotoURI: data});
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
