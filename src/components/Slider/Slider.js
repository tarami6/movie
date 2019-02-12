import React, {Component} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './Slider.css'
import connect from "react-redux/es/connect/connect";
import {checkList,slidesScreenSize,speedScreenSize} from '../../functions/function'


let screen = window.innerWidth

class MultipleItems extends Component {


    onClickBtn = (index) => {
        this.props.setMovie(index)
        console.log("clicked")
    }


    render() {
        const settings = {
            dots: false,
            infinite: checkList(this.props.movie.movies),
            speed: speedScreenSize(screen),
            slidesToShow: slidesScreenSize(screen),
            slidesToScroll: 1,
            arrows: screen < 576 ? false : true,
            centerMode: true

        };
        return (
            <div className="SliderHolder01">
                <Slider  {...settings}>
                    {this.props.movie.movies.map((item, index) => (
                        <div id="SliderDivMain" className="SliderDivMain" key={index}>
                            <div onClick={this.onClickBtn.bind(this, index)}>
                                <img src={item.show.image.medium} className="SliderImage" alt=""/>
                            </div>
                        </div>))}
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movie: state.movie

    }
}
export default connect(mapStateToProps)(MultipleItems)
