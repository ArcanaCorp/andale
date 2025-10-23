import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconHeart, IconHeartFilled } from '@tabler/icons-react'

import placeholder from '@/shared/images/placeholder.png'

import './styles/header.css'
import ButtonShared from '../components/ButtonShared';

export default function Header ({ type, data }) {

    const navigate = useNavigate();

    const images = data?.images || [];
    
    const [ isLiked, setIsLiked ] = useState(false);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const scrollRef = useRef(null);
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
            
            <header className="__header_details">
                {type === "place" ? (
                    <ul className="__content_images" ref={scrollRef}>
                        {images.length > 0 ? (
                            images.map((i) => (
                                <li key={i.id} className="__image_box">
                                    <img src={i.image} className="__image_background" alt={`Visita ${data?.name} y encuentrá muchos más solo con ÁndaleYa - Jauja`} loading="lazy" style={{ viewTransitionName: `photo-${data?.sub}-${i?.id}` }} />
                                </li>
                            ))
                        ) : (
                            <li className="__image_box">
                                <img src={placeholder} className="__image_background" alt="Foto" loading="lazy" style={{ viewTransitionName: `photo-${data?.sub}` }} />
                            </li>
                        )}
                    </ul>
                ) : (
                    <img src={data?.photo || placeholder} className="__image_background" alt={`Foto de ${data?.name} en ÁndaleYa!`} loading="lazy" style={{ viewTransitionName: `photo-${data?.sub}` }} />
                )}
                <div className="__content_box">
                    <button className="__btn" onClick={() => navigate('/')}><IconChevronLeft/></button>
                    <div className="__row">
                        <button className="__btn" onClick={() => setIsLiked(!isLiked)}>{!isLiked ?  <IconHeart/> : <IconHeartFilled/>}</button>
                        <ButtonShared type={type} data={data} />
                    </div>
                </div>
            </header>


        </>

    )

}