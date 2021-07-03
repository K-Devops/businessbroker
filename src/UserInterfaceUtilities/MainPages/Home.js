import React, {useState, useContext} from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import {Context} from "../UserContext";


function Home() {

    //Contextelements
    const news = useContext(Context);

    return (
        <>
            <HeroSection/>
            <Cards news={news} />
            <Footer />
        </>
    );
}

export default Home;