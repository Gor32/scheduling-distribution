import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

import EducationalPlan from './components/educationalPlan/EducationalPlan'
import Home from './components/home/Home'
import Subjects from './components/subjects/Subjects'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/educationalPlan">Educational PLan</Link>
            </li>
            <li>
              <Link to="/subjects">Subjects</Link>
            </li>
          </ul>
          <hr/>
          <Route exact path='/' component={Home}/>
          <Route path='/educationalPlan' component={EducationalPlan}/>
          <Route path='/subjects' component={Subjects}/>
        </div>
      </Router>
    )
  }
}

export default App
