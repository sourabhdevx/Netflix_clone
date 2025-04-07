import React, { useRef, useState } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function CardSlider({ data, title }) {

    const [showControls, setShowControls] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)
    const listRef = useRef()



    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70

        if(direction == "left" && sliderPosition >= 0){
            listRef.current.style.transform = `translateX(${230 + distance}px)`
            setSliderPosition(sliderPosition - 1)
        }

        if(direction == "right" && sliderPosition < 5){
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setSliderPosition(sliderPosition + 1)
        }
    }

    return (
        <Container className='flex column' onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>

            <h1>{title}</h1>

           {data.length > 0 ?  <div className="wrapper">
                <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}>
                    <AiOutlineLeft onClick={() => handleDirection("left")} />
                </div>
                <div className='flex slider' ref={listRef} >
                    {data.map((movie) => {
                        return <Card movie={movie} key={movie.id} />
                    })}
                </div>
                <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
                    <AiOutlineRight onClick={() => handleDirection("right")} />
                </div>
            </div> 
            : <h3 className='title'>No list to display</h3>
            }
        </Container>
    );
}

const Container = styled.div`
    gap: 1rem;
    position : relative;
    padding: 2rem 0;

    .title{
        margin: 0 10rem;
        color: red;
    }

    h1{
        margin-left: 50px;
    }

    .wrapper{
        .slider{
            width: max-content;
            gap: 20px;
            transform: translateX(0px);
            transition: all 0.3s linear;
            margin-left: 50px;
            
        }
        .slider-action{
            position: absolute;
            z-index: 99;
            height: 100%;
            top: 10%;
            bottom: 0;
            transition: all 0.3s linear;
            width: 50px;

        svg{
            font-size: 30px;
            cursor: pointer;
        }        
    }

    .none{
        display: none;
    }

    .left{
        left: 0;
    }

    .right{
        right: 0;
    }
}


`

export default CardSlider;