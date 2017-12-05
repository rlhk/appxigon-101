// External Dependencies
import React from 'react';

const Emoji = ({icon, name, onClick, styles, transitionActive, width}) => {

  let activeClass = '';

  if(transitionActive){
    activeClass = 'active';
  }

  return (
    <div className={"emoji " + activeClass + " " + name} style={styles}></div>
  )
}

export default Emoji;
