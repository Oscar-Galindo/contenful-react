import React from 'react'

const CarouselSlide = (props) => {
    const {id, slideTitle, slideDescription, slideBg} = props
  return (
    <div className="slideWrap">
    <div className="textWrap">
    <h2 className="tracking-in-expand ">{slideTitle}</h2>
    <p>{slideDescription}</p>
    <img src={slideBg} alt="test" width={300}/>
    </div>
</div>
  )
}

export default CarouselSlide
