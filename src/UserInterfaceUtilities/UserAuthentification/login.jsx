import React, {useState, useContext, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {Button} from "../Button";
import {FaTimes} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {UserCloud} from "../UserCloud";
import axios from "axios";

export const Login = (props) => {

    //Contextelements
    const {users, setUsers}= useContext(UserCloud);

    //States
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const history = useHistory();

    const routeChange = () =>{
        let path = "/Dashboard" ;
        history.push(path);
    }

    useEffect(()=>{
        const storageUser = window.localStorage.getItem('users')
        if(!storageUser){
            console.log('Es ist kein User im Storage')
        }else{
            const User = JSON.parse(storageUser)
            {User ? setUsers(User): setUsers('')}
        }
    },[])

    useEffect(()=>{

        if(users.username == name){
            routeChange()
        }else{
            alert('Ihre Eingabeparameter waren nicht korrekt')
        }
        setname('')
        setpassword('')
    },[users])

    const onsubmit = (e) =>{
        e.preventDefault();
        let userinformation = {
            "username":name,
            "password":password
        }

        //SignIn
        axios.post('http://localhost:8083/api/auth/signin', userinformation)
            .then(response => response.data)
            .then(data => setUsers(data) + window.localStorage.setItem('users',JSON.stringify(data)))
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
                        schlie??en
                    </Button>
                </Modal.Footer>
            </Modal>
        );
}