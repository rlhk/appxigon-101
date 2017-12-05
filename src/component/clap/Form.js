//External Dependies
import React, { Component } from 'react';
import * as firebase from 'firebase';

//Our Dependancies
import Effect from './Effect';

//Firebase Setup
import firebaseDbh from '../fire'

//Import Images
import amen from '../../img/emoties/amen.png'
import celebrate from '../../img/emoties/celebrate.png'
import clap from '../../img/emoties/clap.png'
import heart from '../../img/emoties/wonder.png'
import laugh from '../../img/emoties/laugh.png'
import love from '../../img/emoties/love.png'
import nerd from '../../img/emoties/heart.png'
import noman from '../../img/emoties/clap.png'
import poop from '../../img/emoties/poop.png'
import wonder from '../../img/emoties/wonder.png'

let emoticons = [
  {name:'amen',img:amen},
  {name:'celebrate',img:celebrate},
  {name:'clap',img:clap},
  {name:'heart',img:heart},
  {name:'laugh',img:laugh},
  {name:'love',img:love},
  {name:'nerd',img:nerd},
  {name:'noman',img:noman},
  {name:'poop',img:poop},
  {name:'wonder',img:wonder}
]

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: '0',
      height: '0',
      transitionActive: false,
      dbArrRef: []
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillMount(){
    let instance = this;
    let dbref = firebase.database().ref('effectsArray');
    dbref.set('');
    this.setState({ dbref: dbref });
    dbref.on('value', (snapshot)=>{
      let value = snapshot.val()
      if(value !== null){
        let arrValue = Object.values(value);
        instance.setState({
          effectsArray: arrValue
        });
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth});
  }


  getEmoticonImage(name){
    for (let index of emoticons){
      if(index.name===name){
        return index.img
      }
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="effect-container">
          {
            this.state.effectsArray.map((effect, index) => {
              console.log(effect)
              return(
              <Effect
               key={index}
               transitionActive={true}
               icon={effect.icon}
               name={effect.name}
               screenWidth={effect.screenWidth}
              />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Form;
