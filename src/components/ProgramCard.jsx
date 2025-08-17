import React from 'react';
import { ArrowRight } from 'lucide-react';


const ProgramCard = ({ title, description, duration, link }) => {
 return (
   <div className="group relative bg-slate-100/50 dark:bg-slate-800/20 p-6 rounded-lg transition-all duration-300 **border border-gray-300 dark:border-gray-700**">
     <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-sky-400/50 to-sky-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
     <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{title}</h4>
     <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">{description}</p>
     <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Duración: {duration}</p>
     <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 transition-colors group-hover:text-sky-700 dark:group-hover:text-sky-300">
       Quiero más información
       <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
     </a>
   </div>
 );
};


export default ProgramCard;