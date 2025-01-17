import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContainerCardHuertaHome = (props) => {
    const navigate = useNavigate()
    const { planta, key } = props
    let descripcion = planta.descripPlant?.split(' ').slice(0, 10).join(' ') + '...'
    return (
        <div key={key} className="card text-bg-dark estilos mediaCard" style={{ cursor: 'pointer' }}>
            <img src={planta.imagePlant} className="card-img" alt="img" style={{ height: 'auto', objectFit: 'cover', width: '100%', height: '100%' }} />
            <div className="card-img-overlay">
                <h6 className="card-title" style={{ color: 'white', textShadow: '2px 2px 2px black' }}>{planta.namePlant}</h6>
                <p className="card-text" style={{ color: 'white', textShadow: '2px 2px 2px black', fontSize: '14px' }}>{descripcion}</p>
                <button className='btn degrade' onClick={() => navigate('/huerta')}>Visitar huerta</button>
            </div>
        </div>
    )
}

export default ContainerCardHuertaHome;
