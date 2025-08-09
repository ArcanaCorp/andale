export default function ServerError () {

    return (

        <div style={{width: '100%', height: '500px', display: 'grid', placeItems: 'center'}}>
            <div>
                <h3>Hemos perdido la conexión con el servidor</h3>
                <p style={{textAlign: 'center', fontSize: '.8rem', color: 'var(--color-gray)'}}>
                    <p>Estamos trabajando para solucionarlo.</p>
                    <p>Inténtalo más tarde</p>
                </p>
            </div>
        </div>

    )

}