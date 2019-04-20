import React from 'react';

import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const CountDown = (props) => {
    return (
        <div>
            <label>Reversed path</label>
            <div style={{ width: '50px' }}>
                <CircularProgressbar
                    percentage={props.time}
                    text={`${props.time}`}
                    counterClockwise
                    styles={{

                        text: { fill: '#f88', fontSize: '40px' },
                    }}
                />
            </div>
        </div>
    )
}

export default CountDown