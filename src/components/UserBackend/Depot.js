import React, {useContext, useEffect} from 'react';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolCloud} from "../SymbolCloud";

function Depot(props) {

    const {users, setUsers}= useContext(UserCloud);
    const {symbols, setsymbols} = useContext(SymbolCloud);


    useEffect(()=>{
        //Get complete user by userId
        axios.get('http://localhost:8080/investmentService/users/'+users.id)
            .then(response => response.data)
            .then(data => console.log(data)
            )

        //Get single user investment by stock symbol
        axios.get('http://localhost:8080/investmentService/users/'+users.id+'/investments/'+ symbols)
            .then(response => response.data)
            .then(data => console.log(data)
            )

    })

    return (
        <div className="col-8">
            <label htmlFor={"depot"}><b>Depot ID:</b></label>
            <div className="depot">

            </div>
        </div>
    );
}

export default Depot;