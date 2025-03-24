import React from 'react'
import notebook from "../svg/notebook.svg"

const HomePage = () => {
  return (
    <>
      <main className='main-container'>
        <div className='grid-container'>
          <div className='banner-main'>
            <img src={notebook} alt="banner"/>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus quibusdam architecto quia nesciunt error quaerat, hic, culpa nihil quos ratione exercitationem doloremque debitis itaque quam ea laborum inventore dolorum pariatur sunt ab sapiente nisi? Accusamus, adipisci. Cupiditate natus dolore adipisci. Maiores, asperiores quisquam? Accusantium laudantium quo atque suscipit, provident reiciendis, iusto modi soluta delectus aut nam unde? Dicta quisquam, commodi itaque illo quibusdam fugit nihil excepturi natus culpa similique, illum, eaque possimus cupiditate quaerat repudiandae rerum dolorem. Maxime laudantium quia suscipit, ratione doloribus ipsum hic saepe cum magnam inventore porro cumque pariatur illo sint nobis? Earum mollitia fugit dolore.</h1>
          </div>
        <button className='btn-banner'>Write Your Notebook</button>
        </div>
      </main>
    </>
  )
}

export default HomePage
