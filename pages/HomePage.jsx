import React from 'react'
import notebook from "../svg/notebook.svg"

const HomePage = () => {
  return (
    <>
      <main className='main-container'>
        <div className='grid-container'>
          <div className='banner-main'>
            <img src={notebook} alt="banner" />
            <h1>Write Anytime, Anywhere – Your Digital Notebook for Effortless Note-Taking! Capture Ideas, Organize Thoughts, and Access Your Notes Anytime with Our Seamless, Cloud-Synced Platform. Start Typing and Stay Productive!
              Whether you're a student, professional, or creative thinker, our intuitive and distraction-free interface makes note-taking easy and efficient. Collaborate in real time, and never lose an important idea again. With powerful search, customizable categories, and secure cloud storage, your notes are always at your fingertips.
              Unlock your productivity and turn every thought into action—start your digital note-taking journey today!</h1>
          </div>
          <button className='btn-banner'>Write Your Notebook</button>
        </div>
      </main>
    </>
  )
}

export default HomePage
