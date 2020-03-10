import React, {useState, useRef, useEffect} from "react"

import {bankOne, bankTwo} from "./songData"

            //  problems  //
//* active button styles only works when bank 1 is on and only clicking
//* volume slider styling

export default function Drum() {
    const [bank, setBank] = useState(true)
    const [power, setPower] = useState(true)
    const [vol, setVol] = useState("0.5")
    const [track, setTrack] = useState("")

    const reference = useRef()

    const audio = [].slice.call(document.getElementsByTagName("audio"))
    audio.forEach(sound => {
        sound.volume = vol
    })

    function triggerBank() {
        setBank(!bank)
    }

    function triggerPower() {
        setPower(!power)
    }


    function handleKey(event) {
        for (let i=0; i < bankOne.length; i++) {
            if (event.key.toUpperCase() === bankOne[i].keyTrigger || event.key.toUpperCase() === bankTwo[i].keyTrigger) {
                if(power) {
                    bank ? document.getElementById(bankOne[i].id).play() : document.getElementById(bankTwo[i].id).play()
                }
            }
        }
    }

    function handleVolChange(event) {
        setVol(event.target.value)
    }


    const bankOneElements = bankOne.map(data => (
        <div className="drum-pad" key={data.keyCode}>
            <audio 
            id={data.id} 
            src={data.url} 
            onPlay={() => setTrack(data.id)}/>
            <button className="btn" onClick={() => power ? document.getElementById(data.id).play() : "return false"}>
                {data.keyTrigger}
            </button>
        </div>
    ))
    const bankTwoElements = bankTwo.map(data => (
        <div className="drum-pad" key={data.keyCode}>
            <audio id={data.id} src={data.url} onPlay={() => setTrack(data.id)}/>
            <button 
            className="btn" 
            onClick={() => power ? document.getElementById(data.id).play() : "return false"}
            style={{backgroundColor: "rgb(95, 230, 230)"}}>
                {data.keyTrigger}
            </button>
        </div>
    ))

    console.log(track)

    useEffect(() => {
        reference.current.focus()
    }, [])

    return (
        <div id="drum-machine" onKeyPress={handleKey}>

            <div id="drum-pad">
                {bank ? bankOneElements : bankTwoElements}
            </div>

            <div id="right">
                <label htmlFor="power">Power</label>
                <button 
                    id="power" 
                    style={power ? {backgroundColor: 'rgb(78, 207, 78)'} : {backgroundColor: 'rgb(207, 78, 78)'}}
                    onClick={() => triggerPower()} />

                <p 
                id="display" 
                style={bank ? {backgroundColor: "rgb(194, 191, 191)"} : {backgroundColor: "rgb(95, 230, 230)"}}>
                    {track}</p>

                <input 
                    ref={reference}
                    id="volume" 
                    type="range" 
                    min="0" 
                    max="1" 
                    onChange={handleVolChange} 
                    value={vol}
                    step="0.1" />

                <label htmlFor="bank">Bank</label>
                <button 
                    id="bank" 
                    style={bank ? {backgroundColor: 'rgb(194, 191, 191)'} : {backgroundColor: 'rgb(95, 230, 230)'}}
                    onClick={() => triggerBank()} />
            </div>
        </div>
    )
}