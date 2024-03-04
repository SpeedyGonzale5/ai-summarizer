import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import HelloWorldPage from "./components/HelloWorld"; // Make sure the path matches where you created your component
import SummarizeVidPage from './components/SummarizeVid';
import "./App.css";

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <div className='main'>
                <div className='gradient' />
              </div>
              <div className='app'>
                <Hero />
                <Demo />
              </div>
            </>
          } />
          <Route path="/video-summary" element={
          <>
              <div className='main'>
                <div className='gradient' />
              </div>
              <div className='app'>
                <HelloWorldPage />
                <SummarizeVidPage />
              </div>
            </>
          } />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
