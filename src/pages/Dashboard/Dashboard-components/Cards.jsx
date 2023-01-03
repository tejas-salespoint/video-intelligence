import React from 'react';
import './cards.scss'


function Cards({title, color, percent, numbers}) {
    return (
        <div className="card dashboardCard flex-grow-1" style={{
            color: `${color}`
        }}>
            <div className="card-body">
                <h5 className="card-title mb-3">{title}</h5>
                <div className="card-numbers mb-2">{numbers}</div>

                <div className="progress mb-4" style={{ height: 3.5 }}>
                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-label="Example 1px high"
                        style={{ width: "50%" , background: color }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>



                <span className='card-tag mt-2 d-inline-block'>Better that last week ({percent})</span>
            </div>
        </div>

    );
}

export default Cards;