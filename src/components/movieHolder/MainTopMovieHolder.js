import React from 'react'
import {Col,  Row} from "react-bootstrap";
import {FaCalendarAlt, FaRegClock} from "react-icons/fa";

const MainTopMovieHolder = (props) => {


    let movie = props.movie;
    let titleFontSize = movie.name.length > 12 ? {fontSize: 2.5+'em'} : {fontSize: 3+'em'};
    console.log("MainMovie56", movie.genres.length )
    return(
        <Row className="MainMovieHolder ">
            <Col className="ColMyImage" sm={4} md={4} lg={4}>
                <img src={movie.image.medium}
                     className="MainImage" alt=""/>
            </Col>
            <Col className="colMy " sm={8} md={8} lg={8}>
                <Row className="MovieContentMainRow">
                    <Col sm={12} md={12} lg={12} className="ColH1"><h1 className="TitleH1" style={titleFontSize}>{movie.name}</h1>
                        <h2 className="TitleH2">{
                            movie.genres.length > 0 ?
                            Array.isArray(movie.genres)? movie.genres.join(" "):movie.genres :
                                'Genre'
                        }</h2>
                    </Col>
                    <Col sm={12} lg={12} className="ColP01"><p><FaRegClock className="IconFa"/> <span
                        className="InfoP">{movie.runtime}</span> <span className="InfoSpan"> min</span></p></Col>
                    <Col sm={12} md={12} lg={12}>
                        <Row>
                            <Col sm={6} md={6} lg={6}><p className="Pholder01"><FaCalendarAlt className="IconFa2"/>
                                <span className="InfoP">{movie.premiered.length>4 ? movie.premiered.substring(0,4): movie.premiered}</span></p><p className="InfoSpan2">YEAR</p>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="ColBtn01">
                                <button className="EditBtn" onClick={()=> props.modalForm(true)}>Edit</button>
                                <br/>
                                <button className="DeleteBtn" onClick={() => props.deleteModal(true)}>delete</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </Row>
    )
}

export default MainTopMovieHolder;