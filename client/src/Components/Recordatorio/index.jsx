import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { recordatorio, traerRecordatorios, eliminandoRecor } from '../../redux/actions'
import './Recordatorio.css'
import Notiflix from 'notiflix'

const Recordatorio = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.user)
    const arrayRecor = useSelector(state => state.arrayRecor)

    const [enviar, setEnviar] = useState({
        usuario: "",
        horario: ""
    })
    const changeValue = (e) => {
        let tiempo = e.target.value.split(":").join("")
        setEnviar({
            usuario: email.username,
            horario: tiempo
        })
    }

    const recorDelete = (usuario, horario) => {
        dispatch(eliminandoRecor(usuario, horario))
        Notiflix.Notify.success('Recordatorio eliminado con exito', {
            zindex: 99999999
        })
    }

    const enviarRecordatorio = () => {
        if (enviar.usuario.length && enviar.horario.length) {
            dispatch(recordatorio(enviar))
            Notiflix.Notify.success('Recordatorio creado con exito', {
                zindex: 9999999
            })
        }
        else Notiflix.Notify.failure('Error al crear recordatorio.', {
            zindex: 9999999
        })
    }

    useEffect(() => {
        dispatch(traerRecordatorios(email.username))
    }, [])

    return (
        <div>
            <div className='containerLabelInput'>
                <label>Programa un recordatorio de riego</label>
                <div className='containerInputRecor'>
                    <input
                        type='time'
                        onChange={changeValue}
                        value={enviar.hora}
                    />
                    <button onClick={enviarRecordatorio}>Crea un recordatorio.</button>
                </div>
            </div>
            <div>
                <>
                    {
                        arrayRecor?.length ?
                            <>
                                {
                                    arrayRecor?.map((ele, index) => {
                                        const hora = ele.horario?.slice(0, 2)
                                        const minutos = ele.horario?.slice(2, 4)
                                        console.log(minutos)
                                        return (
                                            <div key={index} className='containerRecor'>
                                                <p>{ele.usuario}</p>
                                                <p>{`${hora}:${minutos}`}</p>
                                                <button onClick={() => recorDelete(ele.horario, ele.usuario)}>x</button>
                                            </div>
                                        )
                                    })
                                }
                            </>
                            :
                            <div className='sinRecordatorios'>No tenes recordatorios programados</div>
                    }
                </>
            </div>
        </div >
    )
}

export default Recordatorio;
