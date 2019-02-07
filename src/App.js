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
          <div class="w3-sidebar w3-bar-block w3-animate-left " style={{display:'none','z-index':5}} id="mySidebar">
          <button class="w3-bar-item w3-button w3-large w3-blue-gray" onClick={this.w3_close}>Փակել &times;</button>
            <Link to="/" class="w3-bar-item w3-button">Home </Link>
            <Link to="/educationalPlan" class="w3-bar-item w3-button">Ուսումնական պլան </Link>
            <Link to="/subjects" class="w3-bar-item w3-button">Առարկաներ</Link>
            <Link to="/chairs" class="w3-bar-item w3-button">Ամբիոններ</Link>
            <Link to="/streams" class="w3-bar-item w3-button">Հոսքեր</Link>
            <Link to="/classifiers" class="w3-bar-item w3-button">Դասիչներ</Link>
            <Link to="/groupPlan" class="w3-bar-item w3-button">Խմբային պլան</Link>
            <Link to="/loadChair" class="w3-bar-item w3-button">Ամբիոնի բեռնվածք</Link>
          </div>    
          
            <div class="w3-overlay w3-animate-opacity" onClick={this.w3_close} style={{cursor:'pointer'}} 
          id="myOverlay"></div>
                    <hr/>
            <div id="main">
            <button id="openNav" class="w3-button w3-blue-gray w3-xlarge" onClick={this.w3_open}>&#9776;</button>
                <div class="w3-container" className="App">
                
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


// <ul  class="w3-ul w3-card-4" >
// <li>
//   <Link to="/">Home </Link>
// </li>
// <li>
//   <Link to="/educationalPlan">Ուսումնական պլան </Link>
//   {/*Educational PLan*/}
// </li>
// <li>
//   <Link to="/subjects">Առարկաներ</Link>
//   {/*Subjects*/}
// </li>
// <li>
//   <Link to="/chairs">Ամբիոններ</Link>
//   {/*Chairs*/}
// </li>
// <li>
//   <Link to="/streams">Հոսքեր</Link>
//   {/*Streams*/}
// </li>
// <li>
//   <Link to="/classifiers">Դասիչներ</Link>
//   {/*Classifiers*/}
// </li>
// <li>
//   <Link to="/groupPlan">Group Plan </Link>
// </li>
// </ul>



// <Router>
// <div className="App">
//   <div className=" w3-bar w3-black">
//       <Link to="/" class="w3-bar-item w3-button">Home </Link>
//       <Link to="/educationalPlan" class="w3-bar-item w3-button">Ուսումնական պլան </Link>
//       <Link to="/subjects" class="w3-bar-item w3-button">Առարկաներ</Link>
//       <Link to="/chairs" class="w3-bar-item w3-button">Ամբիոններ</Link>
//       <Link to="/streams" class="w3-bar-item w3-button">Հոսքեր</Link>
//       <Link to="/classifiers" class="w3-bar-item w3-button">Դասիչներ</Link>
//       <Link to="/groupPlan" class="w3-bar-item w3-button">Group Plan </Link>
//   </div>    
  
//   <hr/>
//   <Route exact path='/' component={Home}/>
//   <Route path='/educationalPlan' component={EducationalPlan}/>
//   <Route path='/subjects' component={Subjects}/>
//   <Route path='/chairs' component={Chairs}/>
//   <Route path='/streams' component={Streams}/>
//   <Route path='/classifiers' component={Classifiers}/>
//   <Route path='/groupPlan' component={GroupPlan}/>

// </div>
// </Router>