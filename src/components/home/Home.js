import React, { Component } from 'react'
import test from '../../assets/test.png'
import subjects from '../../assets/subjects.png'
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
  {title: 'Ուսումնակն պլան', content: 'Break The UI Into A Component Hierarchy', image: test},
  {title: 'Առարկաներ', content: 'Build A Static Version in React', image: subjects},
  {title: 'Ամբիոններ', content: 'Identify The Minimal (but complete) Representation Of UI State', image: test},
  {title: 'Հոսքեր', content: 'Identify Where Your State Should Live', image: test},
  {title: 'Դասիչներ', content: 'Add Inverse Data Flow', image: test},
  {title: 'Պարամետրեր', content: 'Add Inverse Data Flow', image: test},
  {title: 'Խմբային պլան', content: 'Add Inverse Data Flow', image: test},
  {title: 'Ամբիոնի բեռնվածք', content: 'Add Inverse Data Flow', image: test},
];

function SlideItem(props) {
  return (
    <div className="item-slide">
      <h1>{props.title}</h1>
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
    >{index + 1}</li>
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
      slideshow: {title: 'Ուսումնակն պլան', content: 'Break The UI Into A Component Hierarchy', image: test},//props.slide,
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
