import React from 'react';
import { Film } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 bg-gray-900/80 backdrop-blur border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-amber-500 font-bold">
            <Film className="mr-2" size={20} />
            MovieMaster
          </div>
          <div className="text-center text-gray-400 text-sm">
            <p>Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">TMDb</a></p>
            <p className="text-xs mt-1">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Creative Movies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
