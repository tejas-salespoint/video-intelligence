import React, {useState} from 'react';
import styled from 'styled-components'
import {FullScreen, OnFullScreenIcon} from "../../contants";
import {Collapse} from "react-bootstrap";


const Main = styled.div`

  width: 100%;


  .col-container {


    p {
      font-size: 1.5rem;
    }

    .collapse-btn {
      justify-self: end;
    }

    .full-screen-icon {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`


function CollapsePanel({children, ...props}) {
    const [open, setOpen] = useState(true);
    return (
        <Main {...props} style={{
            padding: '3rem'
        }}>
            <div className='col-container d-flex justify-content-between align-items-center'>
                <p className=''>{props.title}</p>
                <div className='collapse-btn justify-content-end' onClick={() => setOpen(!open)}
                     aria-controls="example-collapse-text"
                     aria-expanded={open}>
                    <img className='full-screen-icon' src={open ? FullScreen : OnFullScreenIcon} alt="full-screen"/>
                </div>
            </div>
            <hr className="divider"/>

            <Collapse in={open}>
                <div id="example-collapse-text">
                    {children}

                    {
                        props?.noData &&
                        <div className='d-flex justify-content-center align-items-center ' style={{
                            height: '40rem'
                        }}>
                            <h1>No Data Found ... !</h1>
                        </div>
                    }
                    {/*<hr className="divider"/>*/}
                </div>

            </Collapse>

        </Main>
    );
}

export default CollapsePanel;


