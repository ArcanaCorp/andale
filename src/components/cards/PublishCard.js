export default function PublishCard ({ banner }) {

    return (
        <li className={`__banner`} style={{backgroundImage: `url(${banner})`}}></li>
    )

}