import window from 'global/window'
import React, { Component } from 'react'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { Provider } from "react-redux"

import { Appxigon, configStore, utils } from 'appxigon'
import * as customAxgFunctions from './appxigon-functions'

//Import css
import 'sanitize.css';
import './css/style.css';

import AppxigonLogo from './component/appxigon-logo'
import Form from './component/clap/Form';

import schemaPresentation from './schema/appxigon-101'

import en from './i18n/en.json'
import fr from './i18n/fr.json'
import zh from './i18n/zh.json'

const store = configStore(browserHistory)
Appxigon.addItemType('appxigon-logo', AppxigonLogo)
Appxigon.addItemType('response-form', Form)

Appxigon.addFunctions(customAxgFunctions)
Appxigon.addNativeState('history', hashHistory)

const app = {
  // debug: true, // appxigon visual debugging flag
  store,
  schemas: { schemaPresentation },
  history: hashHistory,
  i18n: { en, zh, fr },
  locale: 'en',
}

window._t = utils._t // assign global translation utilility function
window.axg = Appxigon // DEV: global ref to Appxigon object for easy debugging
window.appxigon = app // assign app wide context to 'appxigon' in global namespace

// put initial appxigon schema in redux store
const initDelay = 100
setTimeout(() => {
  app.store.dispatch({
    type: 'AXG_SET_SCHEMA',
    schema: schemaPresentation,
  })
}, initDelay)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Appxigon}/>
            <Route path="/:appId" component={Appxigon}/>
            <Route path="/:appId/:viewId" component={Appxigon}/>
        </Router>
      </Provider>
    )
  }
}

export default App
