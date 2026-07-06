'use client'
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page () {
    
    const router = useRouter();

    return (
        <>

            <header className="w-full h flex items-center gap-md px-md" style={{"--h": "50px"}}>
                <ButtonIcon bg={'bg-surface'} rounded={'rounded-full'} onClick={() => router.back()}><IconChevronLeft/></ButtonIcon>
                <p className="text-md text-medium">Volver</p>
            </header>
            <main className="w-full h scroll-y p-md flex flex-col gap-md" style={{"--h": "calc(100dvh - 50px)"}}>

                <div className="w-full flex flex-col gap-xs">
                    <h1>TÉRMINOS Y CONDICIONES</h1>
                    <p className="text-xs text-muted">Última actualización: 6 de julio de 2026</p>
                </div>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">1. Identificación del titular</h3>
                    <p className="text-xs">
                        Los presentes Términos y Condiciones regulan el acceso y uso de Ándale Ya!, 
                        así como de las aplicaciones, plataformas, sitios web y servicios digitales 
                        que formen parte del ecosistema operado por:
                    </p>
                    <ul className="w-full flex flex-col gap-xs">
                        <li className="text-xs"><b>Razón social:</b> ARCANA CORP S.A.C.</li>
                        <li className="text-xs"><b>Nombre comercial:</b> ARCANA</li>
                        <li className="text-xs"><b>RUC:</b> 20612123901</li>
                        <li className="text-xs"><b>Domicilio:</b> PJ. Alberto Cirolanda Nro. 126, Yauyos, Jauja, Junín, Perú.</li>
                    </ul>
                    <p className="text-xs">En adelante, <b>“ARCANA”</b>.</p>
                    <p className="text-xs">
                        <b>Ándale Ya!</b> es una plataforma digital que permite a los usuarios descubrir lugares 
                        turísticos, restaurantes, productos, servicios, experiencias y otra información de 
                        interés, así como interactuar con funcionalidades relacionadas con pedidos, favoritos, 
                        recomendaciones, comunicaciones y otros servicios digitales.
                    </p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">2. Aceptación de los términos</h3>
                    <p className="text-xs">
                        Al acceder, registrarse o utilizar Ándale Ya!, el usuario declara haber leído, 
                        comprendido y aceptado los presentes Términos y Condiciones.
                    </p>
                    <p className="text-xs">
                        Si el usuario no está de acuerdo con estas disposiciones, deberá abstenerse de utilizar la plataforma.
                    </p>
                    <p className="text-xs">
                        La Política de Privacidad y la Política de Uso de Datos forman parte complementaria de estos 
                        Términos y Condiciones.
                    </p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">3. Registro y cuenta de usuario</h3>
                    <p className="text-xs">Ándale Ya! puede requerir una cuenta para acceder a determinadas funcionalidades.</p>
                    <p className="text-xs">
                        El registro podrá realizarse mediante proveedores externos de autenticación, como Google. Al utilizar este método, 
                        el usuario autoriza el tratamiento de los datos necesarios para identificar y crear su cuenta, de conformidad con la Política de Privacidad.
                    </p>
                    <p className="text-xs">El usuario es responsable de mantener la seguridad de su cuenta y de los dispositivos desde los cuales accede.</p>
                    <p className="text-xs">El usuario se compromete a proporcionar información verdadera, actualizada y legítima.</p>
                    <p className="text-xs">ARCANA podrá restringir o suspender cuentas cuando detecte:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) Uso fraudulento de la plataforma</li>
                        <li>b) Pedidos falsos o reiteradamente incumplidos</li>
                        <li>c) Suplantación de identidad</li>
                        <li>d) Uso automatizado no autorizado</li>
                        <li>e) Actividades destinadas a afectar la operación de restaurantes, comercios u otros usuarios</li>
                        <li>f) Incumplimiento de los presentes Términos y Condiciones.</li>
                    </ul>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">4. Servicios de la plataforma</h3>
                    <p className="text-xs">Ándale Ya! puede ofrecer, entre otras, las siguientes funcionalidades:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) descubrimiento de restaurantes y negocios</li>
                        <li>b) visualización de cartas, platos, productos, precios y promociones</li>
                        <li>c) generación y seguimiento de pedidos</li>
                        <li>d) descubrimiento de lugares y recursos turísticos</li>
                        <li>e) visualización de información geográfica, horarios, fotografías, servicios y recomendaciones</li>
                        <li>f) favoritos, guardados, historial y personalización</li>
                        <li>g) notificaciones sobre pedidos y actividad de la cuenta</li>
                        <li>h) comunicaciones comerciales, únicamente cuando corresponda y exista autorización</li>
                        <li>i) otras funcionalidades que ARCANA implemente progresivamente.</li>
                    </ul>
                    <p className="text-xs">ARCANA podrá añadir, modificar, mejorar o retirar funcionalidades cuando resulte necesario para la evolución, seguridad o sostenibilidad del servicio.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">5. Pedidos a restaurantes y negocios</h3>
                    <p className="text-xs">
                        Cuando un usuario realiza un pedido mediante Ándale Ya!, la plataforma registra y transmite la solicitud 
                        al restaurante o negocio correspondiente.
                    </p>
                    <p className="text-xs">La creación de una solicitud no significa necesariamente que el pedido haya sido aceptado.</p>
                    <p className="text-xs">El pedido se considerará confirmado cuando el restaurante o negocio lo acepte mediante los mecanismos habilitados por la plataforma.</p>
                    <p className="text-xs">El restaurante podrá aceptar o rechazar un pedido por motivos como:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) falta de disponibilidad.</li>
                        <li>b) cierre del establecimiento.</li>
                        <li>c) imposibilidad de realizar el delivery.</li>
                        <li>d) información insuficiente.</li>
                        <li>e) sospecha razonable de fraude.</li>
                        <li>f) otras condiciones operativas.</li>
                    </ul>
                    <p className="text-xs">
                        Los precios, disponibilidad, tiempos de preparación, costos de delivery y características de los productos pueden ser actualizados 
                        por el negocio o por ARCANA con información proporcionada por este.
                    </p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">6. Cancelación de pedidos</h3>
                    <p className="text-xs">El usuario podrá cancelar un pedido mientras la plataforma permita dicha acción según el estado del pedido.</p>
                    <p className="text-xs">Una vez que el restaurante haya iniciado la preparación, la cancelación podrá estar restringida.</p>
                    <p className="text-xs">
                        En caso de pedidos fraudulentos, reiteradamente abandonados o realizados con información falsa, ARCANA podrá limitar temporal 
                        o permanentemente la capacidad de generar nuevos pedidos.
                    </p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">7. Responsabilidad de restaurantes y negocios</h3>
                    <p className="text-xs">Los restaurantes y negocios son responsables de:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) la calidad y seguridad de sus productos</li>
                        <li>b) la correcta preparación de los pedidos</li>
                        <li>c) la disponibilidad de los productos ofrecidos</li>
                        <li>d) la información comercial que proporcionen</li>
                        <li>e) el cumplimiento de los tiempos aceptados</li>
                        <li>f) la entrega, cuando corresponda</li>
                        <li>g) sus obligaciones tributarias, sanitarias y comerciales</li>
                    </ul>
                    <p className="text-xs">ARCANA facilita la conexión y la infraestructura digital, pero no fabrica, prepara ni almacena los productos ofrecidos por terceros.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">8. Información turística</h3>
                    <p className="text-xs">
                        Ándale Ya! puede mostrar información sobre lugares turísticos, patrimonio, actividades, horarios, 
                        accesibilidad, servicios, ubicación y recomendaciones.
                    </p>
                    <p className="text-xs">Parte de esta información puede provenir de fuentes oficiales, públicas, institucionales o de procesos de verificación propios.</p>
                    <p className="text-xs">
                        ARCANA procura mantener la información actualizada; sin embargo, las condiciones de acceso, horarios, costos, carreteras, clima, seguridad y servicios pueden cambiar.
                    </p>
                    <p className="text-xs">Antes de realizar una visita, el usuario debe evaluar las condiciones actuales y tomar las precauciones correspondientes.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">9. Ubicación y mapas</h3>
                    <p className="text-xs">La plataforma puede utilizar información geográfica para:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) mostrar lugares cercanos</li>
                        <li>b) calcular referencias de ubicación</li>
                        <li>c) mejorar resultados</li>
                        <li>d) facilitar pedidos y entregas</li>
                        <li>e) presentar mapas o rutas.</li>
                    </ul>
                    <p className="text-xs">El acceso a la ubicación precisa del dispositivo requerirá el permiso correspondiente cuando resulte aplicable.</p>
                    <p className="text-xs">El usuario puede desactivar dicho permiso desde su dispositivo o navegador.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">10. Comunicaciones de servicio</h3>
                    <p className="text-xs">ARCANA podrá enviar comunicaciones necesarias para el funcionamiento de la plataforma, como:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) confirmaciones de cuenta</li>
                        <li>b) alertas de seguridad</li>
                        <li>c) estados de pedidos</li>
                        <li>d) recuperación o protección de acceso</li>
                        <li>e) cambios relevantes en el servicio</li>
                        <li>f) comunicaciones necesarias para atender solicitudes del usuario</li>
                    </ul>
                    <p className="text-xs">Estas comunicaciones son distintas de la publicidad comercial.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">11. Comunicaciones publicitarias</h3>
                    <p className="text-xs">ARCANA únicamente utilizará el correo electrónico, número de WhatsApp u otros canales de contacto proporcionados por el usuario para fines promocionales cuando exista la autorización correspondiente.</p>
                    <p className="text-xs">El usuario podrá desactivar las comunicaciones promocionales en cualquier momento mediante:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) las opciones disponibles en la configuración de su cuenta</li>
                        <li>b) el mecanismo de baja disponible en las comunicaciones</li>
                        <li>c) los canales de privacidad o soporte habilitados por ARCANA</li>
                    </ul>
                    <p className="text-xs">La desactivación de publicidad no impedirá recibir comunicaciones necesarias relacionadas con pedidos, seguridad o funcionamiento del servicio.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">12. Uso permitido</h3>
                    <p className="text-xs">El usuario se compromete a utilizar Ándale Ya! de forma legítima.</p>
                    <p className="text-xs">Está prohibido:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) realizar pedidos falsos;</li>
                        <li>b) registrar información falsa con intención de perjudicar a terceros.</li>
                        <li>c) intentar acceder a cuentas ajenas</li>
                        <li>d) interferir con la infraestructura de la plataforma</li>
                        <li>e) ejecutar scraping, extracción masiva o automatizada sin autorización</li>
                        <li>f) copiar o explotar comercialmente la plataforma sin autorización</li>
                        <li>g) utilizar Ándale Ya! para actividades ilegales</li>
                        <li>h) introducir código malicioso o realizar ataques informáticos.</li>
                    </ul>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">13. Propiedad intelectual</h3>
                    <p className="text-xs">
                        La plataforma Ándale Ya!, su software, interfaces, diseño, estructura, código, elementos gráficos y 
                        funcionalidades propias pertenecen a ARCANA o son utilizados bajo autorización.
                    </p>
                    <p className="text-xs">Los nombres comerciales, marcas, imágenes y contenidos de restaurantes, empresas y terceros pertenecen a sus respectivos titulares.</p>
                    <p className="text-xs">La información proveniente de fuentes públicas u oficiales mantiene la naturaleza y atribución que legalmente le corresponda.</p>
                </section>

                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">14. Disponibilidad del servicio</h3>
                    <p className="text-xs">ARCANA procura mantener la plataforma disponible y operativa, pero no garantiza disponibilidad absoluta e ininterrumpida.</p>
                    <p className="text-xs">El servicio puede ser afectado temporalmente por:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) mantenimiento</li>
                        <li>b) actualizaciones</li>
                        <li>c) fallas de proveedores de infraestructura</li>
                        <li>d) problemas de conectividad</li>
                        <li>e) incidentes de seguridad</li>
                        <li>f) eventos fuera del control razonable de ARCANA</li>
                    </ul>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">15. Servicios externos</h3>
                    <p className="text-xs">Ándale Ya! puede utilizar o integrarse con servicios externos necesarios para funciones como:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) autenticación</li>
                        <li>b) almacenamiento</li>
                        <li>c) mapas</li>
                        <li>d) mensajería</li>
                        <li>e) correos electrónicos</li>
                        <li>f) infraestructura tecnológica</li>
                        <li>g) procesamiento de pagos, cuando se implemente</li>
                    </ul>
                    <p className="text-xs">El uso de estos servicios puede estar sujeto adicionalmente a sus propias condiciones.</p>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">16. Suspensión y cierre de cuentas</h3>
                    <p className="text-xs">El usuario podrá dejar de utilizar la plataforma y solicitar la eliminación de su cuenta según los mecanismos disponibles.</p>
                    <p className="text-xs">ARCANA podrá suspender o cerrar cuentas cuando exista incumplimiento de estos Términos, riesgo para la seguridad, fraude o abuso del servicio.</p>
                    <p className="text-xs">La eliminación de una cuenta estará sujeta a las obligaciones legales de conservación que resulten aplicables.</p>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">17. Limitación de responsabilidad</h3>
                    <p className="text-xs">ARCANA no será responsable por daños derivados de:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) información falsa proporcionada por usuarios o terceros</li>
                        <li>b) incumplimientos directamente atribuibles a restaurantes o negocios</li>
                        <li>c) decisiones tomadas exclusivamente por el usuario basándose en información que haya cambiado</li>
                        <li>d) fallas externas fuera del control razonable de ARCANA</li>
                        <li>e) uso indebido de cuentas o dispositivos</li>
                    </ul>
                    <p className="text-xs">Esta disposición no limita los derechos irrenunciables que correspondan a los usuarios conforme a la legislación peruana.</p>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">18. Modificaciones</h3>
                    <p className="text-xs"><b>ARCANA</b> podrá actualizar estos Términos y Condiciones cuando existan:</p>
                    <ul className="w-full text-xs ml-sm">
                        <li>a) nuevas funcionalidades.</li>
                        <li>b) cambios operativos.</li>
                        <li>c) modificaciones normativas.</li>
                        <li>d) necesidades de seguridad.</li>
                    </ul>
                    <p className="text-xs">Cuando los cambios sean relevantes, ARCANA podrá informar al usuario mediante la plataforma o por otros medios apropiados.</p>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">19. Legislación aplicable</h3>
                    <p className="text-xs">Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú.</p>
                    <p className="text-xs">Cualquier controversia será atendida conforme a los mecanismos y autoridades competentes, sin afectar los derechos que correspondan al usuario como consumidor.</p>
                </section>
                
                <section className="w-full text-muted flex flex-col gap-md">
                    <h3 className="text-dark">20. Contacto</h3>
                    <p className="text-xs">
                        Para consultas relacionadas con estos Términos y Condiciones, el usuario podrá utilizar los canales de soporte habilitados en 
                        Ándale Ya! o dirigirse al domicilio de ARCANA CORP S.A.C.:
                    </p>
                    <p className="text-xs">PJ. Alberto Cirolanda Nro. 126, Yauyos, Jauja, Junín, Perú.</p>
                </section>

            </main>
        </>
    )
}