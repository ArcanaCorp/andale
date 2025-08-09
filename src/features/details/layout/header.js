import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconHeart, IconShare3 } from '@tabler/icons-react'

import placeholder from '@/shared/images/placeholder.png'

import './styles/header.css'

export default function Header ({ type, data }) {

    const navigate = useNavigate();

    const images = data?.images || [];
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const userInteractedRef = useRef(false);

    useEffect(() => {
        if (!scrollRef.current || images.length === 0) return;

        const container = scrollRef.current;

        const handleScroll = () => {
            userInteractedRef.current = true;
            const newIndex = Math.round(container.scrollLeft / container.clientWidth);
            setCurrentIndex(newIndex);
        };

        container.addEventListener('scroll', handleScroll);

        // Scroll automático
        intervalRef.current = setInterval(() => {
            if (userInteractedRef.current) {
                userInteractedRef.current = false;
                return;
            }

            const nextIndex = (currentIndex + 1) % images.length;
            container.scrollTo({
                left: nextIndex * container.clientWidth,
                behavior: 'smooth',
            });
            setCurrentIndex(nextIndex);
        }, 4000); // cada 4 segundos

        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearInterval(intervalRef.current);
        };
    }, [images.length, currentIndex]);

    return (

        <>
            
            {type === 'place' && (
                <header className={`__header_details`}>
                    <ul className='__content_images' ref={scrollRef}>
                        {images.length > 0 ? (
                            images.map((i) => (
                                <li key={i.id} className='__image_box'>
                                    <img src={i.image} className='__image_background' alt={`Foto de user`} loading='lazy' style={{viewTransitionName: `photo-${data?.sub}`}} />
                                </li>
                            ))
                        ) : (
                            <li className='__image_box'>
                                <img src={placeholder} className='__image_background' alt={`Foto de user`} loading='lazy' style={{viewTransitionName: `photo-${data?.sub}`}} />
                            </li>
                        )}
                    </ul>
                    <div className='__content_box'>
                        <button className='__btn' onClick={() => navigate(-1, { viewTransition: true })}><IconChevronLeft/></button>
                        <div className='__row'>
                            <button className='__btn'><IconHeart/></button>
                            <button className='__btn'><IconShare3/></button>
                        </div>
                    </div>
                </header>
            )}

            {type === 'bussines' && (
                <header className={`__header_details`}>
                    <img src={data?.photo} className='__image_background' alt={`Foto de user`} loading='lazy' style={{viewTransitionName: `photo-${data?.sub}`}} />
                    <div className='__content_box'>
                        <button className='__btn' onClick={() => navigate(-1, { viewTransition: true })}><IconChevronLeft/></button>
                        <div className='__row'>
                            <button className='__btn'><IconHeart/></button>
                            <button className='__btn'><IconShare3/></button>
                        </div>
                    </div>
                </header>
            )}

        </>

    )

}