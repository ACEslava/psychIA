import './App.css';
import { Button, Typography } from "@material-ui/core"
import React from 'react';

var curPage = 0
var pageDisplay = [true, false, false, false, false];
const pageChange = new CustomEvent("newpage", {detail: curPage});
var timelist = []
var time = 0
var trials = 0

function StartScreen() {
  const [show, setShow] = React.useState(true)
  
  function clickHandle() {
    curPage = 1
    pageDisplay[0] = false
    pageDisplay[1] = true
    setShow(false)
    window.dispatchEvent(pageChange)
    
    if (timelist.length == 0) {
      timelist = [0, 3000, 6000, 9000, 12000]
    }

    var timelistIndex = Math.floor(Math.random()*timelist.length)
    time = timelist[timelistIndex]
    timelist.splice(timelistIndex, 1)
    trials ++ 
  }

  function thisPage() {
    if (curPage == 0) {
      setShow(true)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);

  return (
    <div>
      {pageDisplay[0] ? 
        <Button style={{
          position: "fixed", 
          top: "50%", 
          left: "50%" }} 
          color="primary" 
          variant="contained"
          onClick={clickHandle}>Start</Button> : null}
    </div>
  )
}

function LearnTrigram() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage == 1) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[1] = false
        pageDisplay[2] = true
        curPage = 2
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 3000)
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
          top: "45%"}}>XDF 202</Typography>
    </div> : null}</div>
  )

}

function WaitPeriod() {
  const [show, setShow] = React.useState(false)
  
  function thisPage() {
    if (curPage == 2) {
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
    if (curPage == 3) {
      setShow(true)
      setTimeout(() => {
        pageDisplay[3] = false
        pageDisplay[4] = true
        curPage = 4
        window.dispatchEvent(pageChange)
        setShow(false)
      }, 5000)
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
    if (curPage == 4) {
      setShow(true)
    }
  }

  function nextPage(event) {
    if (event.isComposing || event.keyCode === 32) {
      pageDisplay[4] = false
      pageDisplay[0] = true
      curPage = 0
      window.dispatchEvent(pageChange)
      setShow(false)
    }
  }

  window.addEventListener('newpage', function (e) {thisPage()}, false);
  window.addEventListener('keydown', nextPage, false);

  return (
    <div>{pageDisplay[4] ? <div style={{
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#FF595E",
      position: "fixed",
      zIndex: 100,
      top: "0px",
      left: "0px"}}>
        <Typography align="center" variant="h2" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "45%"}}>{`[${time/1000}]`}</Typography>
        <Typography align="center" variant="h2" style={{
          margin: "auto",
          color: "white",
          position: "relative",
          top: "55%"}}>{` Trial ${trials} of 5`}</Typography>
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
    </div>
  );
}

export default App;