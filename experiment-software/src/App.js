import './App.css';
import { Button, Typography } from "@material-ui/core";
import React from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import instructionsVideo from './instructions.mp4';
import trigramsCSV from './Trigrams.csv'
import $ from "jquery"

var curPage = 0
var pageDisplay = [true, false, false, false, false, false, false, false];
const pageChange = new Event("newpage");
const originalTimeList = [6000, 6000, 12000, 12000] //change me to change trials
var timelist = originalTimeList
var maxTrials = timelist.length
var time = 0
var trigram = ""
var trials = 0
var practiceMode = false
var usedTrigrams = []
var trialCode = ""

$.ajax({url:trigramsCSV, async:false, success:function(data){
  var trigramsList = data.split(",")
  for (var i = 0; i < maxTrials; i++) {
    var randomTrigramIndex = Math.floor(Math.random()*trigramsList.length)
    if (!(trigramsList[randomTrigramIndex] in usedTrigrams)){
      usedTrigrams.push(trigramsList[randomTrigramIndex])
    }
  }
}});

function StartScreen() {
  const [show, setShow] = React.useState(true)
  
  function clickHandle() {
    trials = 0
    curPage = 7
    pageDisplay[0] = false
    pageDisplay[7] = true
    setShow(false)
    window.dispatchEvent(pageChange)
    
    var timelistIndex = Math.floor(Math.random()*timelist.length)
    time = timelist[timelistIndex]
    timelist.splice(timelistIndex, 1)

    var randomTrigramIndex = Math.floor(Math.random()*usedTrigrams.length)
    trigram = usedTrigrams[randomTrigramIndex]
    usedTrigrams.splice(randomTrigramIndex, 1)

    trialCode = trialCode + trigram + " " + String(time/1000).padStart(2, "0") + "\n"
    trials ++ 
  }

  function clickHandlePractice() {
    trials=  0
    practiceMode = true
    curPage = 7
    pageDisplay[0] = false
    pageDisplay[7] = true
    setShow(false)
    window.dispatchEvent(pageChange)
    
    timelist = [5000, 8000]
    usedTrigrams = ["ABC", "XYZ"]
    maxTrials = timelist.length

    var timelistIndex = Math.floor(Math.random()*timelist.length)
    time = timelist[timelistIndex]
    timelist.splice(timelistIndex, 1)

    var randomTrigramIndex = Math.floor(Math.random()*usedTrigrams.length)
    trigram = usedTrigrams[randomTrigramIndex]
    usedTrigrams.splice(randomTrigramIndex, 1)

    trialCode = trialCode + trigram + " " + String(time/1000).padStart(2, "0") + "\n"
    trials ++ 
  }

  function clickHandleVideo() {
    pageDisplay[0] = false
    pageDisplay[6] = true
    curPage = 6
    setShow(false)
    window.dispatchEvent(pageChange)
  }

  function thisPage() {
    if (curPage === 0) {
      setShow(true)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>
      {pageDisplay[0] ? 
        <div
          style={{width: "100vw", 
          height: "100vh",
          top: "0px",
          left: "0px"}}>
            <Button style={{
              position: "relative", 
              top: "45%",
              left: "40%"}} 
              color="primary" 
              variant="contained"
              onClick={clickHandleVideo}>Instructions</Button>
            <Button style={{
              position: "relative", 
              top: "45%",
              left: "45%"}} 
              color="primary" 
              variant="contained"
              onClick={clickHandlePractice}>Practice</Button>
            <Button style={{
              position: "relative", 
              top: "45%",
              left: "50%"}} 
              color="primary" 
              variant="contained"
              onClick={clickHandle}>Start</Button></div> : null}
    </div>
  )
}

function LearnTrigram() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage === 1) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[1] = false
        pageDisplay[2] = true
        curPage = 2
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 4000)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>{pageDisplay[1] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#00CC66",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h1" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>{`${trigram} ${Math.round(100+(Math.random()*(999-100)))}`}</Typography>
    </div> : null}</div>
  )

}

function WaitPeriod() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage === 2) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[2] = false
        pageDisplay[3] = true
        curPage = 3
        window.dispatchEvent(pageChange)
        setShow(false)
      }, time)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>{pageDisplay[2] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#00CC66",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
    </div> : null}</div>
  )
}

function RecallScreen() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage === 3) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[3] = false
        pageDisplay[4] = true
        curPage = 4
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 6000)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>{pageDisplay[3] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#FF595E",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h1" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>Stop</Typography>
        <Typography align="center" variant="h2" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "55%"}}>Recall the Trigram to the best of your ability</Typography>
    </div> : null}</div>
  )
}

function ResultsScreen() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage === 4) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[4] = false
        pageDisplay[5] = true
        curPage = 5
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 0)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>{pageDisplay[4] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#00CC66",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h1" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>{practiceMode? `Practice Trial ${trials} of ${maxTrials} Completed`:` Trial ${trials} of ${maxTrials} Completed`}</Typography>
    </div> : null}</div>
  )
}

function RestScreen() {
  const [show, setShow] = React.useState(false)
  const [seconds, setSeconds] = React.useState(15)
    
  useEffect(() => {
    if (trials != maxTrials) {
      if (show === true){
        if (seconds > 0) {
          setTimeout(() => {setSeconds(seconds - 1)}, 1000)
        } else {
          setSeconds(15)
          setShow(false)

          var timelistIndex = Math.floor(Math.random()*timelist.length)
          time = timelist[timelistIndex]
          timelist.splice(timelistIndex, 1)

          var randomTrigramIndex = Math.floor(Math.random()*usedTrigrams.length)
          trigram = usedTrigrams[randomTrigramIndex]
          usedTrigrams.splice(randomTrigramIndex, 1)

          trialCode = trialCode + trigram + " " + String(time/1000).padStart(2, "0") + "\n"
          trials ++ 

          pageDisplay[5] = false
          pageDisplay[1] = true
          curPage = 1
          window.dispatchEvent(pageChange)
        }
      }
    } else {
      window.addEventListener("keydown", function(e) {
        if (e.isComposing || e.keyCode === 32) {
          // timelist = originalTimeList
          // pageDisplay[5] = false
          // pageDisplay[0] = true
          // curPage = 0
          // window.dispatchEvent(pageChange)
          window.location.reload(true)
        }
      }, false)
    }
  })
  

  window.addEventListener('newpage', function (e) {curPage === 5 ? setShow(true): setShow(false)}, false);
  console.log(trialCode)
  return (
    <div>{pageDisplay[5] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#00CC66",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h1" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>
        {trials === maxTrials? "Session complete" : `${seconds} seconds until Trial ${trials+1}`}</Typography>
          {practiceMode? trials === maxTrials?
            <div style={{width: "100vw", height: "100vh",}}>
            <Typography align="center" variant="h2" style={{
              margin: "auto",
              color: "white",
              position: "relative",
              top: "55%"}}>Please wait</Typography>
            <Typography align="center" variant="h3" style={{
                margin: "auto",
                color: "white",
                position: "relative",
                top: "60%"}}>{trialCode}</Typography></div>: null :
          trials === maxTrials?
            <div style={{width: "100vw", height: "100vh",}}>
              <Typography align="center" variant="h2" style={{
                margin: "auto",
                color: "white",
                position: "relative",
                top: "55%"}}>Your proctor will now debrief you</Typography>
              <Typography align="center" variant="h3" style={{
                margin: "auto",
                color: "white",
                position: "relative",
                top: "65%"}}>{trialCode}</Typography></div>: null}
          </div> : null}</div>
  )
}

function Instructions() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage === 6) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[6] = false
        pageDisplay[0] = true
        curPage = 0
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 74000)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>{
      pageDisplay[6] ? <div>
        <ReactPlayer
            className='react-player fixed-bottom'
            url={instructionsVideo}
            width='100%'
            height='100%'
            playing= {true}
            volume= {1}
            controls = {false}
            />
      </div> : 
      null}</div>
  )
}

function StartCountdown() {
  const [show, setShow] = React.useState(false)
  const [seconds, setSeconds] = React.useState(15)

  useEffect(() => {
    if (show === true){
      if (seconds > 0) {
        setTimeout(() => {setSeconds(seconds - 1)}, 1000)
      } else {
        setSeconds(15)
        setShow(false)
        pageDisplay[7] = false
        pageDisplay[1] = true
        curPage = 1
        window.dispatchEvent(pageChange)
      }
    }
  })

  window.addEventListener('newpage', function (e) {curPage === 7 ? setShow(true): setShow(false)}, false);

  return (
    <div>{pageDisplay[7] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#00CC66",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h1" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>{`${seconds} seconds until Trial ${trials}`}</Typography>
    </div> : null}</div>
  )
}

function App() {
  return (
    <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#303030",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <StartScreen/>
        <LearnTrigram/>
        <WaitPeriod/>
        <RecallScreen/>
        <ResultsScreen/>
        <RestScreen/>
        <Instructions/>
        <StartCountdown/>
    </div>
  );
}

export default App;