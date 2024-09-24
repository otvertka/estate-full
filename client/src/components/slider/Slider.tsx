import React, { useState } from 'react'
import './slider.scss'
import { SingleItemProps } from '../../types/types'

const Slider: React.FC<SingleItemProps> = ({ images }) => {
    const [imageIndex, setImageIndex] = useState<number | null>(null);

    const changeSlide = (event: React.MouseEvent<HTMLDivElement>, direction: "left" | "right"): void => {
        if (imageIndex === null) return;

        if (direction === "left") {
            if (imageIndex === 0) {
                setImageIndex(images.length - 1)
            } else {
                setImageIndex(imageIndex - 1)
            }
        } else {
            if (imageIndex === images.length - 1) {
                setImageIndex(0)
            } else {
                setImageIndex(imageIndex + 1);
            }
        }

    }

    return (
        <div className='slider'>
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow" onClick={(event) => changeSlide(event, "left")}>
                        <img src="/public/arrow.png" alt="arrowImage" />
                    </div>
                    <div className="imgContainer">
                        <img src={images[imageIndex]} alt="bigImage" />
                    </div>
                    <div className="arrow" onClick={(event) => changeSlide(event, "right")}>
                        <img src="/public/arrow.png" className='right' alt="arrowImage" />
                    </div>
                    <div className="close" onClick={(event: React.MouseEvent<HTMLDivElement>): void => {
                        setImageIndex(null)
                    }}>
                        X
                    </div>
                </div>
            )}
            <div className="bigImage">
                <img src={images[0]} alt="bigImage" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index) => (
                    <img src={image} alt="smallImage" key={index} onClick={() => setImageIndex(index + 1)} />
                ))}
            </div>
        </div>
    )
}

export default Slider