import { useEffect, useState } from 'react';
import placeholder from '@/shared/img/placeholder.png'

const imageCache = new Map();
export default function Images ({ img, alt, width='100%', height='100%', loading='lazy', decoding='async', objectFit='cover', style={}, className='' }) {

    const [imgSrc, setImgSrc] = useState(() => {
        if (img && imageCache.has(img)) return imageCache.get(img);
        return img || placeholder;
    }); 

    useEffect(() => {
        if (!img) return;

        // Si ya está cacheada, no la volvemos a cargar
        if (imageCache.has(img)) {
            setImgSrc(imageCache.get(img));
            return;
        }

        // Precargamos la imagen
        const image = new Image();
        image.src = img;

        image.onload = () => {
            imageCache.set(img, img);
            setImgSrc(img);
        };

        image.onerror = () => setImgSrc(placeholder);
    }, [img]);

    return (

        <picture>
            <source srcSet={imgSrc} type="image/webp" />
            <img src={imgSrc} onError={() => setImgSrc(placeholder)} fetchPriority='high' alt={alt} width={width} height={height} loading={loading} decoding={decoding} style={{objectFit, ...style}} className={className}/>
        </picture>

    )

}