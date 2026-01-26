import { useEffect, useState } from 'react'
import placeholder from '@/shared/img/placeholder.png'

const imageCache = new Set()

export default function Images({img, alt = '', width = '100%', height = '100%', loading = 'lazy', decoding = 'async', objectFit = 'cover', style = {}, className = ''}) {
  
    const [src, setSrc] = useState(img || placeholder)

    useEffect(() => {
        if (!img) return

        if (imageCache.has(img)) {
            setSrc(img)
            return
        }

        const i = new Image()
        i.src = img

        i.onload = () => {
            imageCache.add(img)
            setSrc(img)
        }

        i.onerror = () => setSrc(placeholder)
    }, [img])

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding={decoding}
            fetchPriority={loading === 'eager' ? 'high' : 'auto'}
            onError={() => setSrc(placeholder)}
            style={{ objectFit, ...style }}
            className={className}
        />
    )
}