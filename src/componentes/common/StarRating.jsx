import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={28}
          className={`cursor-pointer transition ${
            star <= rating
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${readOnly ? '' : 'hover:text-yellow-500'}`}
          onClick={() => !readOnly && onRatingChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;