import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

import EducationalPlan from './components/educationalPlan/EducationalPlan'
import Home from './components/home/Home'
import Subjects from './components/subjects/Subjects'
import Chairs from './components/chairs/Chairs'
import Streams from './components/streams/Streams'
import Classifiers from './components/classifiers/Classifiers'
import GroupPlan from './components/groupPlan/GroupPlan'
import LoadChair from './components/loadChair/LoadChair'

class App extends Component {
  w3_open = () => {
    document.getElementById("main").style.marginLeft = "10%";
    document.getElementById("mySidebar").style.width = "10%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    //document.getElementById("myOverlay").style.display = "block";
    console.log("open click")
  }

  w3_close = ()=> {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
    console.log("click")

  }
  render () {
    return (
      <Router>
        <div  >
          <div className="w3-sidebar w3-bar-block w3-animate-left" style={{display:'none','zIndex':5}} id="mySidebar">
            <button className="w3-bar-item w3-button w3-large" onClick={this.w3_close}>Close &times;</button>
            <Link to="/" className="w3-bar-item w3-button">Home </Link>
            <Link to="/educationalPlan" className="w3-bar-item w3-button">Ուսումնական պլան </Link>
            <Link to="/subjects" className="w3-bar-item w3-button">Առարկաներ </Link>
            <Link to="/chairs" className="w3-bar-item w3-button">Ամբիոններ </Link>
            <Link to="/streams" className="w3-bar-item w3-button">Հոսքեր </Link>
            <Link to="/classifiers" className="w3-bar-item w3-button">Դասիչներ </Link>
            <Link to="/groupPlan" className="w3-bar-item w3-button">Խմբային պլան </Link>
            <Link to="./loadChair" className="w3-bar-item w3-button">Ամբիոնի բեռնվածք </Link>
          </div>

          <div className="w3-overlay w3-animate-opacity" onClick={this.w3_close} style={{cursor:'pointer'}}
               id="myOverlay"></div>
          <hr/>
          <div id="main">
            <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={this.w3_open}>&#9776;</button>
            <div className="w3-container App" >
              <Route exact path='/' component={Home}/>
              <Route path='/educationalPlan' component={EducationalPlan}/>
              <Route path='/subjects' component={Subjects}/>
              <Route path='/chairs' component={Chairs}/>
              <Route path='/streams' component={Streams}/>
              <Route path='/classifiers' component={Classifiers}/>
              <Route path='/groupPlan' component={GroupPlan}/>
              <Route path='/loadChair' component={LoadChair}/>
            </div>
          </div>

        </div>

      </Router>
    )
  }
}
export default App
