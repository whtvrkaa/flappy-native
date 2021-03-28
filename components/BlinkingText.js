import React, { Component }  from 'react'
import {Text} from 'react-native'

 class BlinkingText extends Component {

    constructor(props) {
      super(props);
      this.state = {showText: true};
   
      // Change the state every second 
      setInterval(() => {
        this.setState(previousState => {
          return { showText: !previousState.showText };
        });
      }, 
      // Define any blinking time.
      1000);
    }
   
    render() {
      let display = this.state.showText ? this.props.text : ' ';
      return (
        <Text style = {{ fontWeight: 'bold', fontSize : 20 , marginTop : 10 }}>{display}</Text>
      );
    }
  }
  export default BlinkingText 