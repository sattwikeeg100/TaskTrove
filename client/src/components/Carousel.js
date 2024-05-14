import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import img1 from "./images/C1.jpg"
import img2 from "./images/C2.jpg"

const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    </div>
    <div className="carousel-inner">
        <div className="carousel-item active">
        <img src={img1} className="d-block w-100" alt="wlcome_img1" />
        </div>
        <div className="carousel-item">
        <img src={img2} className="d-block w-100" alt="wlcome_img2" />
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>
  )
}

export default Carousel
