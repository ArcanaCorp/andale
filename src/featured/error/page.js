export default function ErrorPage () {

    const handleRefresh = () => window.location.reload(); 

    return (

        <div className="w-full h-full grid center bg-primary">
            <div style={{width: '90%'}} className="m-auto text-center">
                <h1 className="text-white">Error</h1>
                <p className="text-white mb-md">Estamos presentando un error en nuestro servidor.</p>
                <button className="p-xs rounded-md bg-white text-dark fw-semibold" onClick={handleRefresh}>Volver a intentar</button>
            </div>
        </div>

    )

}