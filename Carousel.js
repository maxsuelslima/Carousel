import { useEffect, useState, useRef } from 'react'
import useWindowDimensions from '../../../cli/lib/useWindowDimensions'
import React from 'react'

const ProductCarousel = ({ children, numberOfElementsToShow=[1,3,5] }) => {
  const containerRef = useRef(null)
  const photoContainer = useRef(null)
  const { width } = useWindowDimensions() //Isso daqui é uma função que pega width da tela, pra fazer um carousel responsivo
  const [carouselContent, setCarouselCotent] = useState([])
  //const [counter,setCounter]=useState(0)
  const [elementMediaQuerry, setnumberOfElemtensToShow] = useState(
    numberOfElementsToShow[0]
  )
  useEffect(() => {
    if (width <= 768) {
      setnumberOfElemtensToShow(numberOfElementsToShow[0])
    }
    if (width > 768 && width <= 1280) {
      setnumberOfElemtensToShow(numberOfElementsToShow[1])
    }
    if (width > 1280) {
      setnumberOfElemtensToShow(numberOfElementsToShow[2])
    }
  }, [width])

  const finalWidthDesktop = (children.length * 100) / elementMediaQuerry

  const updateArray=()=>{
    /*if(counter===4){
      setCarouselCotent(children)]
      containerRef.current.scrollLeft=0
      setCounter(0)
      return
    }
    setCounter(counter+1)*/

    const originalContent=[...carouselContent]
    originalContent.push(carouselContent[0])
    originalContent.splice(0,1)
    setCarouselCotent(originalContent)
    return originalContent
  }
  const rollToRight=()=>{
   const fim=photoContainer.current.firstChild.clientWidth
    let counterWidth=0
    const interval=setInterval(function(){
      containerRef.current.scrollLeft+=3
      counterWidth+=3
      if(counterWidth>=fim){
        clearInterval(interval)
        updateArray()
        setScrollToZero()
      }
    },0.5)
  }

  const setScrollToZero = () =>{
    containerRef.current.scrollLeft=0
  }

  useEffect(() => {
    if (children.length !== carouselContent.length) {
        setCarouselCotent(children)
    }
  }, [children])
  return (
    <>
      <div className="container">
        {carouselContent.length > elementMediaQuerry && (
          <>
            <button onClick={() => rollToRight()}>
              <span>&#10094;</span>
            </button>
          </>
        )}
        <div className="productContainerLimiter" ref={containerRef}>
          <div className="productContainer" ref={photoContainer}>
            {[...carouselContent]}
          </div>
        </div>

        {carouselContent.length > elementMediaQuerry && (
          <>
            <button onClick={() => rollToRight()}>
              <span>&#10095;</span>
            </button>
          </>
        )}
      </div>
      <style jsx>
        {`

          .productContainer{
            transition:all 1s;
          }
          button {
            border: 0px;
            background: white;
            cursor: pointer;
            text-align: center;
          }
          .productContainerLimiter {
            width: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
            box-sizing: border-box;
          }

          .container {
            display: flex;
          }
          @media (max-width: 768px) {
            .productContainer {
              width: ${finalWidthDesktop}%;
              display: grid;
              grid-template-columns: repeat(${carouselContent.length}, 1fr);
            }
          }
          @media (min-width: 768px) {
            .productContainer {
              width: ${finalWidthDesktop}%;
              display: grid;
              grid-template-columns: repeat(${carouselContent.length}, 1fr);
            }
          }
          @media (min-width: 1280px) {
            .productContainer {
              width: ${finalWidthDesktop}%;
              display: grid;
              grid-template-columns: repeat(${carouselContent.length}, 1fr);
            }
          }
        `}
      </style>
    </>
  )
}

export default ProductCarousel
