import React, {useState, useEffect} from 'react';
import { Dimensions, I18nManager, StyleSheet, View, Image, Text, Button, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as Updates from "expo-updates";
import { useFonts } from 'expo-font';



export default function Restart() {
    const [loaded] = useFonts({
        Roboto: require('./../assets/fonts/RobotoMono-Regular.ttf'),
      });
    async function toggleRTL() {
        await I18nManager.forceRTL(I18nManager.isRTL ? false : true);
        await Updates.reloadAsync();
      }
   
    return (
 
             <TouchableOpacity 
             onPress = {() => Updates.reloadAsync()}
            > 
            <Text style={styles.text}> Restart</Text>
            </TouchableOpacity>
      
    )
}


const styles = StyleSheet.create({
   
  
      text: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Menlo',
top: -35,
marginLeft: 140,
backgroundColor: 'rgba(233, 256, 400, 0.2)',
height: 50,
width: 170,
paddingLeft: 20,
paddingTop: 10,




  
  
      }
  })