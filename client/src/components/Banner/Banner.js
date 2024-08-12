import React from 'react'
import './Banner.css'
import Marquee from "react-fast-marquee"

const Banner = () => {
  return (
    <div className="banner">
      <Marquee speed={80} gradient={false} pauseOnHover>
          <div className="banner-text text1">
              <span>Welcome to RecipeFinder😋🥗, Your go-to website🚀</span>
              <span>Discovering a World of Culinary Delights✨.</span>
        </div>
        <div className="banner-text text1">
              <span>RecipeFinder is your ultimate destination🔖 for searching Different food recipes, </span>
              <span>Offering a diverse selection🧑‍🍳 that caters to every palate.</span>
        </div>
        <div className="banner-text text2">
              <span>Remember, with RecipeFinder, you can search🔍</span>
              <span>Different food recipes🍽️ to suit your every need.</span> 
        </div>
      </Marquee>
    </div>
  )
}

export default Banner