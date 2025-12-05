import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Movie } from '../types';
import { addToWatchlist, removeFromWatchlist, getWatchlist } from '../modules/apiModule';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const cur = getWatchlist();
    setInWatchlist(!!cur.find((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleWatch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      setInWatchlist(false);
    } else {
      addToWatchlist(movie);
      setInWatchlist(true);
    }
  };

  const Inner = (
    <div className="movie-card">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
        alt={movie.title}
      />

      <button
        onClick={toggleWatch}
        aria-pressed={inWatchlist}
        className="card-badge"
        title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {inWatchlist ? '★' : '☆'}
      </button>

      <div className="movie-overlay">
        <div>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-meta">{movie.release_date ? movie.release_date.slice(0, 4) : ''}</div>
        </div>

        <div className="movie-rating" aria-hidden>
          <Star size={14} />
          <span>{(movie.vote_average || 0).toFixed(1)}</span>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={() => onClick(movie)} role="button" tabIndex={0} className="block cursor-pointer">
        {Inner}
      </div>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      {Inner}
    </Link>
  );
};

export default MovieCard;