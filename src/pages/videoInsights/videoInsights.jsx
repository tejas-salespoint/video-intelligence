import React, {useEffect} from 'react';
import Box from "../../components/Box/Box";
import './videoinsights.scss'
import {useLocation, useParams} from "react-router-dom";
import ReactPlayer from 'react-player/lazy'
import {Col, Row} from "reactstrap";
import {authorId} from "../../contants";

const VideoInsights = () => {
    // const { id } = useParams()

    const location = useLocation()
    ;
    const {id , accessToken} = location.state;
    
    




    return (
        <Box>
            <section className='video-insights'>

                <Row>
                    <Col xs={8}>
                        <iframe width="853" height="480"
                                src={`https://www.videoindexer.ai/embed/player/${authorId}/${id}/?accessToken=${accessToken}&locale=en&location=trial`}
                                frameBorder="0" allowFullScreen></iframe>


                    </Col>
                    <Col xs={4}>
                        <iframe width="420" height="780"
                                src={`https://www.videoindexer.ai/embed/insights/${authorId}/${id}/?accessToken=${accessToken}&locale=en&location=trial`}
                                frameBorder="0" allowFullScreen></iframe>


                    </Col>
                </Row>

            </section>
        </Box>
    );
};

export default VideoInsights;