import React from 'react'


const Collections = (props) => {
  const {title, img1, img2, img3, img4, img5} = props.gentsFashion;
  return (
    <div>
      <h1>{title}</h1>
              <img src="assets/banner1.png" alt="ladiesbanner" className="ladiesbanner"/>

      <div className='menImages'>
        <img src={img1} alt={title} />
        <img src={img2} alt={title} />
        <img src={img3} alt={title} />
        <img src={img4} alt={title} />
        <img src={img5} alt={title} />
      </div>
    </div>
  )
}

export default Collections;