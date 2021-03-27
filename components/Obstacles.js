import React from 'react';
import { View, Image } from 'react-native';

const Obstacles = ({
    obstacleWidth, 
    obstacleHeight,  
    gap, 
    obstaclesLeft,
    randomBottom
}) => {

    return (
        <View>
            <Image style={{
                position: 'absolute',
         
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }} source={require('./../images/pipe-topp.png')}/>
            <Image style={{
                position: 'absolute',
             
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }} source={require('./../images/pipe-bottom.png')}/>
        </View>
    )
}

export default Obstacles;

