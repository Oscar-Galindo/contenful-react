import React, { useState, useEffect, useCallback } from "react"
import { client } from "../../client"
import CarouselSlide from "./CarouselSlide"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'

const Carousel = () => {
   const [isCarouselLoading, setIsCarouselLoading] = useState(false)
   const [carouselSlides, setIsCarouselSlides] = useState([])


   const cleanUpCarouselSlides = useCallback ((rawData) => {
    const cleanSlides = rawData.map((slide) =>{
        const {sys, fields} = slide
        const {id} = sys
        const slideTitle  = fields.title
        const slideDescription = fields.description
        const slideBg = fields.image.fields.file.url
        const updatedSlide = {id, slideTitle, slideDescription, slideBg}

        return updatedSlide
    })

    setIsCarouselSlides(cleanSlides)
   },[])

   const getCarouselSlides = useCallback(async () => {
    setIsCarouselLoading(true)
    try {
        const response = await client.getEntries({ content_type: 'carousel'})
        const responseData = response.items
        if (responseData) {
            cleanUpCarouselSlides(responseData)
        } else {
            setIsCarouselSlides([])
        }
        setIsCarouselLoading(false)
    } catch (error) {
        console.log(error)
        setIsCarouselLoading(false)
    }
   }, [cleanUpCarouselSlides])


   useEffect(() =>{
    getCarouselSlides()
   }, [getCarouselSlides])

   if (!Array.isArray(carouselSlides) || !carouselSlides.length) {
      return null
   }

  return (
    <div>
      <div className="carousel">
      <Swiper modules={[Navigation]} navigation={ true } slidesPerView={1}  loop={true}>
      {carouselSlides.map((item) => {
        const { id, slideTitle, slideDescription, slideBg } = item
        return (
            <SwiperSlide key={id}>
             <CarouselSlide  slideTitle={slideTitle} slideDescription={slideDescription} slideBg={slideBg} />
            </SwiperSlide>
        )
      })}
      </Swiper>
      </div>
    </div>
  )
}

export default Carousel
