import React from 'react'

const AppxigonLogo = (props) => {
  const logo = require('./image/logo.jpg')
  return(
    <div>
      <hr/>
      <img src={logo} width="50" alt="logo" className=""/>
      <small>Powered by Appxigon!</small>
    </div>
  )
}

export default AppxigonLogo
