import React from 'react';
import {View, Image, ImageBackground} from 'react-native';


const Cat = ({catBottom, catLeft}) => {
    const catWidth = 50
    const catHeight = 60

return (
    <View>
<Image style={{
    width: catWidth,
    height: catHeight,
    bottom: catBottom - (catHeight/2),
    left: catLeft - (catWidth/2),
position: 'absolute'
  

    }} source={require('./../images/bird.png')}/>
    </View>



)
}


export default Cat;
