import React, {useContext, useState} from "react";
import {Modal} from "react-bootstrap";
import {Button} from "../Button";
import {FaTimes} from "react-icons/fa";
import {UserCloud} from "../UserCloud";
import axios from "axios";


export const Register = (props) => {

    const [name, setname] = useState('')
    const [email,setemail] = useState('')
    const [password, setpassword] = useState('')
    const [passwordtwo, setpasswordtwo] = useState('')
    const [checkbox, setcheckbox] = useState(false)
    const {users, setUsers} = useContext(UserCloud);

    const handleChange = (e) => {
        setcheckbox(!checkbox)
    }

    const onsubmit = (e) =>{
        e.preventDefault()

    if(!name || !email || !password || !passwordtwo ){
        alert("Fehlende Felder erkannt")
        return
    }
    else if(!checkbox){
        alert("Bitte bestätigen Sie unsere AGB")
        return
    }

    else if(password !== passwordtwo){
        alert("Die Passwörter stimmen nicht überein. Versuchen Sie es erneut.")
        return
    }

        const id = Math.floor(Math.random()*10000) +1
        const newUser = {id,name,email,password }


        setUsers(newUser)


        //Anlegen eines Users nach erfolgreicher registrierung (Jan)
        axios.post('http://localhost:8080/investmentService/users/'+id)
            .then(response => response.data)
            .then(data => console.log(data)
            )

        setname('')
        setemail('')
        setpassword('')
        setpasswordtwo('')
        setcheckbox(false)
        /* Um die Felder nach der Eingabe zu leeren*/
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Jetzt registrieren</Modal.Title>
                <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="base-container" ref={props.containerRef}>
                    <div className="content">
                        <div className="image">
                            <img src='images/user-1.png' alt="description "/>
                        </div>
                        <form className="form" onSubmit={onsubmit}>
                            <div className="info">
                                <p>*Pflichtfelder</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" placeholder="Nutzername"
                                value={name} onChange={(e)=> setname(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input type="email" name="email" placeholder="Email"
                                       value={email} onChange={(e)=> setemail(e.target.value)}/>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="password">Passwort*</label>
                                <input  style={{marginBottom: "7px"}}type="password" name="password" placeholder="Passwort eingeben"
                                       value={password} onChange={(e)=> setpassword(e.target.value)}/>
                                <input type="password" name="passwordtwo" placeholder="Passwort bestätigen"
                                       value={passwordtwo} onChange={(e)=> setpasswordtwo(e.target.value)}/>
                            </div>
                           <div className="form-check">
                                   <input type="checkbox" id="scales" name="scales"
                                          onChange={(e)=> handleChange(e)}/>
                                       <label htmlFor="scales">*AGB akzeptieren</label>
                               <br/>
                           </div>
                           <input type='submit' value='registrieren' className={'btn btn-primary'} onClick={props.handleClose}/>
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