import React, {useState} from 'react';
import '../App.css';
import './HeroSection.css';
import {Button} from "./Button";
import {Register} from "./UserAuthentification/register";
import './UserAuthentification/style.scss'


function HeroSection() {

    //Handle Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='hero-container'>
            <video src='/videos/video-1.mp4' autoPlay loop muted />
            <h1>STARTE DEIN INVESTMENT</h1>
            <p>Noch kein Depot?</p>
            <div className='hero-btns'>
                <Button
                    className='btn'
                    buttonStyle="btn btn-secondary"
                    onClick={handleShow}
                >
                    JETZT REGISTRIEREN!
                </Button>
               <Register    show={show}
                            handleClose={handleClose}/>
            </div>
        </div>
    );
}

export default HeroSection;