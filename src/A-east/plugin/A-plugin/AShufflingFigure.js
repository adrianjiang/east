/**
 * AShufflingFigure - a component at react
 * 
 * note    : 轮播图组件
 * name    : AShufflingFigure
 * language: es6
 * author  : adrian
 * create date : 2017/2/3
 * update date : 2017/2/3 23:09
 */

require('./A-react.css');

let React = window.React;
let ReactDOM = window.ReactDOM;
// var React = require('react'),
    // objectAssign = require('object-assign');

// var React = require('react-dom');
class AShufflingFigure extends React.Component {
    render() {
        return (
            <div class="swiper-container" ref="AShufflingFigure">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                </div>
                <div class="swiper-pagination"></div>
                
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                
                <div class="swiper-scrollbar"></div>
            </div>
        );
    }
    componentDidMount(){
        // let d =     ReactDOM.findDOMNode(this.refs.myTextInput).focus();
        let dom = ReactDOM.findDOMNode(this.refs.AShufflingFigure);
        console.log(dom);
        // $(s2).html('aihuhfiifeu');
        var mySwiper = new Swiper (dom, {
            direction: 'vertical',
  
          }) 
    }
}

AShufflingFigure.defaultProps = {

};

export default AShufflingFigure;