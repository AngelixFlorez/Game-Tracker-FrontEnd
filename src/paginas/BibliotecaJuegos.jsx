import React, { useEffect, useState } from 'react';
import { getJuegos } from '../services/api';
import TarjetaJuego from '../components/TarjetaJuego'; // Importaremos después

const BibliotecaJuegos = () => {
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        const fetchJuegos = async () => {
        try {
            const res = await getJuegos();
            setJuegos(res.data);
        } catch (err) {
            console.error(err);
        }
        };
        fetchJuegos();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {juegos.map(juego => (
            <TarjetaJuego key={juego._id} juego={juego} />
        ))}
        </div>
    );
    };

    export default BibliotecaJuegos;