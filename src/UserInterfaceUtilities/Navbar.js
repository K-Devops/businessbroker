import React, {useState, useEffect, useContext} from 'react';
import {Button} from './Button';
import {Link, useHistory} from 'react-router-dom';
import './Navbar.css';
import {Login} from "./UserAuthentification/login";
import {UserCloud} from "./UserCloud";


function Navbar() {

    //Handle Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //States
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [login, setlogin] = useState(false);

    //Contextelements
    const {users, setUsers}= useContext(UserCloud);
    const history = useHistory();

    useEffect(()=>{
        if(users.length == 0) {
            setlogin(false)
        let path = "/" ;
        history.push(path);
    }else{
            let path = "/Dashboard" ;
            history.push(path);
            setlogin(true)
        }},[users])

    const handleLogging =() =>{
        handleShow();
        closeMobileMenu();

        if(login == true){
            setlogin(!login)
            setUsers('')
            window.localStorage.setItem('users',[]);
            console.log("Session beendet")
        }
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div >
                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                            ONLINE BROKER
                        </Link>
                    </div>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                        <li className='nav-item' style= {{visibility: login ? 'visible':'hidden' }} >
                            <Link to='/profil' className='nav-links' onClick={closeMobileMenu}>
                                PROFILE
                            </Link>
                        </li>
                        <li className='nav-item' style= {{visibility: login ? 'visible':'hidden' }} >
                            <Link to='/Dashboard' className='nav-links' onClick={closeMobileMenu}>
                                DASHBOARD
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/agb'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                AGB
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/Impressum'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                IMPRESSUM
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/'}
                                className='nav-links-mobile'
                                onClick={handleLogging}
                            >
                                {login ?  'Log Out' : 'Login'} <i className="fas fa-sign-in-alt"></i>                            </Link>
                        </li>
                    </ul>
                    <div className={'nav-button'} >
                        {button && <Button
                            buttonStyle={'btn btn-outline-light'}
                            onClick={ handleLogging }
                        > {login ?  'Log Out' : 'Login'} <i className="fas fa-sign-in-alt"></i></Button>}
                    </div>
                    <Login show={show} setLogin={setlogin} handleClose={handleClose}/>
                </div>
            </nav>
        </>
    );
}

export default Navbar;