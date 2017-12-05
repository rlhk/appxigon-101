// External Dependencies
import React, { Component } from 'react';

//Our Dependancies
import Emoji from './Emoji';

class Effect extends Component {
constructor(props){
  super(props);
  }

  render() {
    // setTimeout(function(){
    //   let effectContainer = document.getElementById("effect-container");
    //   let emojieEffect = document.getElementsByClassName("emoji-effect");
    //   effectContainer.removeChild(emojieEffect[]);
    // }, 3000);

    let icon = this.props.icon
    let screenWidth = this.props.screenWidth
    let transitionActive = this.props.transitionActive
    let name = this.props.name

    let emotiWidth = screenWidth / 5;
    let emotiCount = 10;
    let emotiObjectArray = [];

    setTimeout

    for (let i = 0; i < emotiCount.toFixed(); i++){
      let animationTimes =( Math.random() * (1.0000 - 4.000) + 4.000).toFixed(4);
      let styles = {
        animationDuration: animationTimes +'s',
        backgroundImage: `url(${icon})`
      };

      emotiObjectArray.push({
        id: i,
        img: icon,
        styles: styles,
        width: emotiWidth,
        name: name
      });
    };

     const emoticons = emotiObjectArray.map((emoti) => {
      return(
        <Emoji
          key = {emoti.id}
          name={emoti.name}
          icon={emoti.img}
          styles={emoti.styles}
          width={emoti.width}
          transitionActive={transitionActive}
         />
      )
    });

    return (
      <div className="emoji-effect">
          <div className='emoji-row'>
            {emoticons}
          </div>
      </div>
    )
  }
};

export default Effect;
