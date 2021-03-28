import React, { Component, useState, useEffect } from 'react'
import { StyleSheet,  Text, View, TouchableOpacity, TouchableHighlight, Image, Button, Header, ScrollView } from 'react-native'
import { Audio } from 'expo-av';
import Music from './Music'
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import * as Updates from "expo-updates";
import Restart from './Restart'



const audioBookPlaylist = [ source= require("./../assets/best.mp3")
];

export default class Player extends React.Component {
  
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: true
  };

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = audioBookPlaylist[currentIndex]
      ;

      const status = {
        shouldPlay: isPlaying,
        volume: volume
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({
        playbackInstance
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = status => {
    this.setState({
      isBuffering: status.isBuffering
    });
  };

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying
    });
  };

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return null;
  }
  

  render() {
    return (
      <View style={styles.bar}>
        <TouchableOpacity onPress={this.handlePlayPause}>
     
            {this.state.isPlaying ? (
              <Image style={styles.play} source={require('./../images/stop-2.png')} />
            ) : (
              <Image style={styles.play} source={require('./../images/headphones.png')} />
            )}

        </TouchableOpacity>
        
        <Restart/>
        <Image style={styles.ice} source={require('./../images/ice.png')}/>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({

bar : {
backgroundColor: 'rgba(123, 163, 209,  1)',
zIndex: 1,
height: 70,
borderTopLeftRadius: 150,
borderTopRightRadius: 150,
borderBottomLeftRadius: 150,
borderBottomRightRadius: 150,
},
play :{
  height: 50,
  width: 50,
  top: 10,
  marginLeft: 40,


},
ice :{
  height: 40,
  width: 40,
  top: 18,
  marginLeft: 265,
position: 'absolute',


}


})




