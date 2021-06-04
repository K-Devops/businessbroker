import React from 'react';
import './Ticker.css';


function Ticker({Ticks}) {
    return (
        <div className={'Ticker'}>
                {Ticks.map((Tick, i)=>console.log(Tick))}
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            < div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>
            <div className={'Tick'}>Box</div>

        </div>
    );
}

export default Ticker;