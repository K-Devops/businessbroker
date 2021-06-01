import React, {useState, useContext}  from "react";
import {Modal} from "react-bootstrap";
import {Button} from "../Button";
import {FaTimes} from "react-icons/fa";
import { useHistory } from "react-router-dom";


export const Login = (props) => {


    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const history = useHistory();

    const routeChange = () =>{
        let path = "/Dashboard" + '?=user' + 'id' /*Hier ganz wichtig die ID Einbauen für Bookmark*/;
        history.push(path);
    }

    const onsubmit = (e) =>{
        e.preventDefault();

            if(name== ''){
                console.log("Start Session"); /*Hier Session starten*/
                routeChange();
                props.setLogin(true)
            }
        setname('')
        setpassword('')
    }

        return (
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                    <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
                </Modal.Header>
                <Modal.Body>
            <div className="base-container" ref={props.containerRef}>
                <div className="content">
                    <div className="image">
                        <img src='images/user-1.png' alt="description "/>
                    </div>
                    <form className="form" onSubmit={onsubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Benutzername</label>
                            <input type="text" name="username" placeholder="Nutzername eingeben"
                                   value={name} onChange={(e)=> setname(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Passwort</label>
                            <input type="password" name="password" placeholder="Passwort eingeben"
                                   value={password} onChange={(e)=> setpassword(e.target.value)}/>
                        </div>
                        <input type='submit' value='Login' className={'btn btn-primary'} onClick={props.handleClose}/>
                    </form>
                </div>
            </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button buttonStyle="btn btn-outline-secondary"
                            buttonSize="btn-sm"
                            onClick={props.handleClose }>
                        schließen
                    </Button>
                </Modal.Footer>
            </Modal>
        );
}