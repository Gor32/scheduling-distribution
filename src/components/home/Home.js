import React, { Component } from 'react'
import test from '../../assets/test.png'
import subjects from '../../assets/subjects.png'
import a from '../../assets/a.png'
import b from '../../assets/b.png'
import c from '../../assets/c.png'
import d from '../../assets/d.png'
import e from '../../assets/e.png'
import f from '../../assets/f.png'
import g from '../../assets/g.png'
import h from '../../assets/h.png'
// class Home extends Component {
//   render () {
//     return (
//       <div >
//         this is Home
//       </div>
//     )
//   }
// }




const listItems = [
  {title: 'Ուսումնակն պլան', content: 'Break The UI Into A Component Hierarchy', image: a},
  {title: 'Առարկաներ', content: 'Build A Static Version in React', image: b},
  {title: 'Ամբիոններ', content: 'Identify The Minimal (but complete) Representation Of UI State', image: c},
  {title: 'Հոսքեր', content: 'Identify Where Your State Should Live', image: d},
  {title: 'Դասիչներ', content: 'Add Inverse Data Flow', image: e},
  {title: 'Պարամետրեր', content: 'Add Inverse Data Flow', image: f},
  {title: 'Խմբային պլան', content: 'Add Inverse Data Flow', image: g},
  {title: 'Ամբիոնի բեռնվածք', content: 'Add Inverse Data Flow', image: h},
];

function SlideItem(props) {
  return (
    <div className="item-slide">
      {/* <h1>{props.title}</h1> */}
      {/*<h2>{props.content}</h2>*/}
      <img
        src={props.image}
        alt="logo"
        style={{width: 900, height: 450}}
      />
    </div>
  );
}

const Indicators = (props) => {
  const listIndicators = listItems.map((item, index) =>
    <li
      key={index}
      className={props.currentSlide === index ? 'active' : ''}
      onClick={() => props.changeSlide(index)}
      style={{color: props.currentSlide === index? 'white': 'black'}}
    ></li>
    // >{index + 1}</li>
    // >{"O"}</li>
  );
  return (
    <ul className="indicators">
      {listIndicators}
    </ul>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideshow: {title: 'Ուսումնակն պլան', content: 'Break The UI Into A Component Hierarchy', image: a},//props.slide,
      slideIndex: 0
    };
    this.currentIndex = 0;
    this.pause = false;
  }

  componentDidMount() {
    var that = this;
    this.timeout = setTimeout(function () {
      that.goTo('auto')
    }, 3000);
  }

  componentDidUpdate() {
    var that = this;
    if(this.pause === true) {
      clearInterval(this.timeout);
      this.timePause = setTimeout(function(){
        clearInterval(this.timePause);
      }, 8000);
      this.pause = false;
    }
    this.timeout = setTimeout(function () {
      that.goTo('auto')
    }, 3000);

  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  goTo = (direction) => {
    let index = 0;
    switch(direction) {
      case 'auto':
        index = this.currentIndex + 1;
        this.currentIndex = index >= listItems.length ? 0 : index;
        break;
      case 'prev':
        index = this.currentIndex - 1;
        this.currentIndex = index < 0 ? listItems.length - 1 : index;
        this.pause = true;
        break;
      case 'next':
        index = this.currentIndex + 1;
        this.currentIndex = index >= listItems.length ? 0 : index;
        this.pause = true;
        break;
      default:
        this.currentIndex = direction;
        this.pause = true;
        break;
    }
    console.log('pause:', this.pause);
    this.setState({
      slideIndex: this.currentIndex,
      slideshow: listItems[this.currentIndex]
    });

  };

  render() {
    return (
      <div className="slideshow-simple">
        <SlideItem
          title={this.state.slideshow.title}
          content={this.state.slideshow.content}
          image ={this.state.slideshow.image}
        />
        <Indicators
          changeSlide={this.goTo} // function
          currentSlide={this.state.slideIndex}
        />
        <div className="wrap-control">
          <button className="btn btn-prev" value="Prev" onClick={() => this.goTo('prev')}>Նախորդը</button>
          <button className="btn btn-next" value="Next" onClick={() => this.goTo('next')}>Հաջորդը</button>
        </div>
      </div>
    );
  }
}


export default Home
