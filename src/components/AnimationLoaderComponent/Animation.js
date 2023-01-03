import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../assets/icons/animation/videoDoneAnimation/videoDoneAnimationData.json";
const Animation = ({ data , height , width  }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: data,
        renderer: 'svg'
    }
    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={height}
                width={width}
            />
        </div>
    );
};

export default Animation;