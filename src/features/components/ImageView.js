import fallback from "@/shared/images/placeholder.png";

export default function ImageView({ url, alt = '', width, height, lazy = true}) {
  
    return (
        <picture>
            <source srcSet={url} type="image/webp" />
            <img src={fallback} alt={alt} width={width} height={height} style={{objectFit: 'cover'}} loading={lazy ? "lazy" : "eager"} decoding="async" onError={(e) => e.currentTarget.src = fallback}/>
        </picture>
    );

}
