import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from './videoDoneAnimationData.json'
class GifVideoDoneAnimation extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            renderer: 'svg'
        }
        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    height={150}
                    width={150}
                />
            </div>
        )
    };
}
export default GifVideoDoneAnimation



