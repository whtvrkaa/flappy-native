import React, {useState, useEffect} from 'react';
import { Dimensions, Animated, I18nManager, StyleSheet, View, Image, Text, Button, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Cat from './components/Cat'
import Obstacles from './components/Obstacles';
import { useFonts } from 'expo-font';
import Player from './components/Player'
import { Audio } from 'expo-av';
import RNRestart from 'react-native-restart';
import * as Updates from "expo-updates";
import BlinkingText from './components/BlinkingText'



export default function App() {
  
  async function toggleRTL() {
    await I18nManager.forceRTL(I18nManager.isRTL ? false : true);
    await Updates.reloadAsync();
  }

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const catLeft = screenWidth / 2
  const [catBottom, setCatBottom]= useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/RobotoMono-Regular.ttf'),
  });

  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 500
  let gap = 200
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo
  
//start cat falling
  useEffect(() => {
    if (catBottom > 0) {
      gameTimerId = setInterval(() => {
        setCatBottom(catBottom => catBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have catBottom as a dependecy, it wont stop
  }, [catBottom])
  console.log(catBottom)


  const jump = () => {
    if (!isGameOver && (catBottom < screenHeight)) {
      setCatBottom(catBottom => catBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(-Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

    //check for collisions
    useEffect(() => {
      console.log(obstaclesLeft)
      console.log(screenWidth/2)
      console.log(obstaclesLeft > screenWidth/2)
      if (
        ((catBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        catBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
        )
        || 
        ((catBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        catBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
      }
    })

    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setIsGameOver(true)
    }
    const image = { url: "./images/bg.png" };

  


  return (
    
  
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>

      <Image source={require('./images/bg.png')} style= {styles.backgroundImage}/>

        {isGameOver && <Text  style={styles.text}>{score} points</Text>}
   
        <Player/>
        <Cat
          catBottom = {catBottom} 
          catLeft = {catLeft}
        />
           
        <Obstacles 

          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft = {obstaclesLeft}
        />
        <Obstacles 
      
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
        />
      </View>
     
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black'
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    },

    button : {
      height: 70,
      width: 90,
    top: -300,
   
    },

    text: {
      fontSize: 40,
      color: 'black',
      fontFamily: 'Roboto',
 marginTop: 350,
 marginLeft: 100,
 position: 'absolute',
 zIndex: 99


    }
})