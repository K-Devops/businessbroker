import React, {useState, useContext, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {Button} from "../Button";
import {FaTimes} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {UserCloud} from "../UserCloud";
import axios from "axios";


export const Login = (props) => {

    const {users, setUsers}= useContext(UserCloud);
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const history = useHistory();

    const routeChange = () =>{
        let path = "/Dashboard" + '?userid=' + users.id ;
        history.push(path);
    }

    useEffect(()=>{

        if(users.username==name){
            routeChange()
        }

        setname('')
        setpassword('')
    },[users])

    const onsubmit = (e) =>{
        e.preventDefault();
        let logindata = {
            "username":name,
            "password":password
        }

        //Abfrage nach Login (Luisa)
        axios.post('http://localhost:8083/api/auth/signin', logindata)
            .then(response => response.data)
            .then(data => setUsers(data))
            .then(data=> console.log(data))
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