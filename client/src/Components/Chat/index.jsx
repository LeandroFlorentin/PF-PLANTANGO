import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './chat.css'
import groot from '../../img/groot.png'

const Chat = () => {
    const navigate = useNavigate()

    const [pregunta, setPregunta] = useState({
        primer: false,
        segundo: false,
        tercero: false
    });
    const [elegido, setElegido] = useState({
        segundo: false,
        tercero: false
    })

    const primeraEjecucion = () => {
        setTimeout(() => {
            setPregunta({
                ...pregunta,
                primer: true
            })
        }, 1500)
    }

    const opcionElegida = (e) => {
        setElegido({
            ...elegido,
            [e.target.name]: true
        })
        setTimeout(() => {
            setPregunta({
                ...pregunta,
                [e.target.name]: true
            })
        }, 1500)
    }

    const final = () => {
        const destino = document.getElementById('ultimo')
        destino.scrollIntoView({
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        primeraEjecucion()
    }, [])

    return (
        <div className='containerChat'>
            <h1 className='tituloChat'>Encontra los mejores productos para tus plantas en plantango</h1>
            <div className='containerPreguntas'>
                {
                    pregunta.primer
                        ?
                        <div className='containerOpcion'>
                            <div className='containerGrootH'>
                                <img src={groot} alt='groot' className='imgGroot' />
                                <div className='containerText'>
                                    <h6>Hola 👋🏻, te interesaria responder las siguientes preguntas?</h6>
                                </div>
                            </div>
                            <div className='containerButtons'>
                                <div className='cardButton'>
                                    <button
                                        onClick={opcionElegida}
                                        name='segundo'
                                        value='color1'
                                        type='button'
                                        className='btn btn-outline-success button-tam'
                                    >Si 😁</button>
                                    <button
                                        onClick={() => navigate("/")}
                                        type='button'
                                        className='btn btn-outline-danger button-tam'
                                    >No 😞</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='containerPuntitos'>
                            <img src={groot} alt='groot' className='imgGrootPuntitos' />
                            <div className='containerh3'>
                                <h3 className='h3Puntitos'>...</h3>
                            </div>
                        </div>
                }
                {
                    elegido.segundo
                        ?
                        pregunta.segundo
                            ?
                            <div className='containerOpcion'>
                                <div className='containerGrootH'>
                                    <img src={groot} alt='groot' className='imgGroot' />
                                    <div className='containerText'>
                                        <h6>Quieres dejar un recordatorio de riego?</h6>
                                    </div>
                                </div>
                                <div className='containerButtons'>
                                    <div className='cardButton'>
                                        <button
                                            onClick={opcionElegida}
                                            name='tercero'
                                            value='color1'
                                            type='button'
                                            className='btn btn-outline-success button-tam'
                                        >Si 👍🏻</button>
                                        <button
                                            onClick={opcionElegida}
                                            name='tercero'
                                            value='color3'
                                            type='button'
                                            className='btn btn-outline-danger button-tam'
                                        >No 👎🏻</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='containerPuntitos'>
                                <img src={groot} alt='groot' className='imgGrootPuntitos' />
                                <div className='containerh3'>
                                    <h3 className='h3Puntitos'>...</h3>
                                </div>
                            </div>
                        :
                        null
                }
                {
                    elegido.tercero
                        ?
                        pregunta.tercero
                            ?
                            <div className='containerOpcion'>
                                <div className='containerGrootH'>
                                    <img src={groot} alt='groot' className='imgGroot' />
                                    <div className='containerText'>
                                        <h6>Que apartado te gustaria visitar primero?</h6>
                                    </div>
                                </div>
                                <div className='containerButtons'>
                                    <div className='cardButton'>
                                        <button
                                            onClick={() => navigate('/vivero')}
                                            name='tercero'
                                            value='color1'
                                            type='button'
                                            className='btn btn-outline-success button-tam'
                                        >Comprar en el vivero 🛒</button>
                                        <button
                                            onClick={() => navigate('/huerta')}
                                            name='tercero'
                                            value='color2'
                                            type='button'
                                            className='btn btn-outline-success button-tam'
                                        >Investigar en la huerta 🌱</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='containerPuntitos'>
                                <img src={groot} alt='groot' className='imgGrootPuntitos' />
                                <div className='containerh3'>
                                    <h3 className='h3Puntitos'>...</h3>
                                </div>
                            </div>
                        :
                        null
                }
                <div id='ultimo' ref={final}></div>
            </div>
        </div>
    )
}

export default Chat;