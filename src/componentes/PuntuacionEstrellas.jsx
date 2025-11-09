
import React from 'react';
import { FaStar } from 'react-icons/fa';

const PuntuacionEstrellas = ({ puntuacion, setPuntuacion, isEditable = true }) => {
    const [hover, setHover] = React.useState(null);

    return (
        <div className="flex justify-center md:justify-start">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input 
                            type="radio" 
                            name="puntuacion" 
                            value={ratingValue} 
                            onClick={() => isEditable && setPuntuacion(ratingValue)} 
                            className="hidden"
                            disabled={!isEditable}
                        />
                        <FaStar
                            className="cursor-pointer transition-colors duration-200"
                            color={ratingValue <= (hover || puntuacion) ? "#ffc107" : "#e4e5e9"}
                            size={25}
                            onMouseEnter={() => isEditable && setHover(ratingValue)}
                            onMouseLeave={() => isEditable && setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default PuntuacionEstrellas;