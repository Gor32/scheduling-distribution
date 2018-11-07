import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

import EducationalPlan from './components/educationalPlan/EducationalPlan'
import Home from './components/home/Home'
import Subjects from './components/subjects/Subjects'
import Chairs from './components/chairs/Chairs'
import Streams from './components/streams/Streams'

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
              <Link to="/educationalPlan">Ուսումնական պլան </Link>
              {/*Educational PLan*/}
            </li>
            <li>
              <Link to="/subjects">Առարկաներ</Link>
              {/*Subjects*/}
            </li>
            <li>
              <Link to="/chairs">Ամբիոններ</Link>
              {/*Chairs*/}
            </li>
            <li>
              <Link to="/streams">Հոսքեր</Link>
              {/*Streams*/}
            </li>
          </ul>
          <hr/>
          <Route exact path='/' component={Home}/>
          <Route path='/educationalPlan' component={EducationalPlan}/>
          <Route path='/subjects' component={Subjects}/>
          <Route path='/chairs' component={Chairs}/>
          <Route path='/streams' component={Streams}/>
        </div>
      </Router>
    )
  }
}

export default App
