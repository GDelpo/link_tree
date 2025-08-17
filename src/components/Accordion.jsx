import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ items }) => {
  const [openId, setOpenId] = useState(items.length > 0 ? items[0].id : null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50">
      {items.map((item, index) => {
        const isOpen = item.id === openId;
        const ItemIcon = item.icon;

        return (
          <div key={item.id} className={`${index > 0 ? 'border-t border-slate-200 dark:border-slate-700' : ''}`}>
            <div className="p-6">
              <button onClick={() => handleToggle(item.id)} className="w-full flex justify-between items-center text-left focus:outline-none group">
                <div className="flex items-center gap-3">
                  <ItemIcon className={`text-sky-500 dark:text-sky-400 transition-colors duration-300 ${isOpen ? '' : 'group-hover:text-sky-600 dark:group-hover:text-sky-300'}`} size={28} />
                  <h2 className={`text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300 ${isOpen ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}>{item.title}</h2>
                </div>
                <ChevronDown
                  className={`transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180 text-sky-500 dark:text-sky-400' : 'text-slate-400 group-hover:text-slate-500'}`}
                  size={24}
                />
              </button>
              <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-3xl">{item.description}</p>
            </div>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className={`px-6 pb-6 pt-2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {/* El div problemático fue eliminado de aquí */}
                  {item.collapsibleContent}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;