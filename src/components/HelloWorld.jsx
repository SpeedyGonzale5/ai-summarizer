import React, {useState} from 'react';
import { logo } from "../assets";
import { Link } from 'react-router-dom';

const HelloWorldPage = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />

{/* 
      //Black Button that links to GitHub 
         <button
          type='button'
          onClick={() =>
            window.open("https://github.com/TidbitsJS/Summize", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button> */}

         {/* Link to HelloWorld Page */}
         <Link to="/video-summary" className='black_btn'>HelloWorld Page</Link>
      
      </nav>

      <h1 className='head_text'>
        Summarize Videos with <br className='max-md:hidden' />
        <span className='blue_gradient '>AI</span>
      </h1>
      <h2 className='desc'>
        Simplify your learning with NoteStream, a video summarizer
        that transforms lengthy videos into clear and concise summaries
      </h2>
    </header>
  );
};

export default HelloWorldPage;