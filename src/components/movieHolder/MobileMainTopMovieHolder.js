import React from 'react'
import { Row, Col} from 'react-bootstrap';
import {FaCalendarAlt, FaRegClock} from "react-icons/fa";


const MainTopMovieHolder = (props) => {
    let movie = props.movie;
    let titleFontSize = movie.name.length > 12 ? {fontSize: 2+'em'} : {fontSize: 3+'em'};
    let subTitleFontSize = movie.name.length > 12 ? {fontSize: 1.5+'em'} : {fontSize: 2+'em'};
    return(
        <div className="MainContainer01">
            <Row className="PicAndInfoHolder">
                <Col className="ImageHolder" xs={5}>
                    <img src={movie.image.medium}
                                  className="MainImage01" alt=""/></Col>
                <Col className="InfoHolder" xs={7} >
                    <p><FaRegClock className="InfoIconHolder"/> <span className="InfoTextHolder"
                    >{movie.runtime}</span> <span className="SpanHolder"> min</span></p>
                    <p className="TextHolder"><FaCalendarAlt className="InfoIconHolder" />
                        <span className="InfoTextHolder">
                                {movie.premiered.length>4 ? movie.premiered.substring(0,4): movie.premiered}
                                </span></p><p className="YearHolder">YEAR</p>
                </Col>
            </Row>
            <Row>
                <Col className="TitlesHolder" xs={12}>
                    <h1 className="TitleH1" style={titleFontSize}>{movie.name}</h1>
                    <h2 className="TitleH2" style={subTitleFontSize}>{
                        movie.genres.length > 0 ?
                            Array.isArray(movie.genres)? movie.genres.join(" "):movie.genres :
                            'Genre'
                    }</h2>
                </Col>
            </Row>
            <Row>
                <Col className="BtnHolder" xs={12}>
                    <button className="DeleteBtn02" onClick={() => props.deleteModal(true)}>Delete</button>
                    <button className="EditBtn01" onClick={()=> props.modalForm(true)}>Edit</button>
                </Col>
            </Row>
        </div>
    )
}

export default MainTopMovieHolder;