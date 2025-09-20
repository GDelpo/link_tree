import React, { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = memo(({ items = [] }) => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const { id, icon: Icon, title, description, collapsibleContent } = item;
        const isOpen = openId === id;

        return (
          <div key={id} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleItem(id)}
              className="w-full flex justify-between items-start text-left p-6"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${id}`}
            >
              <div className="flex items-start gap-4">
                {/* Renderizado condicional: muestra el ícono solo si está definido en el item. */}
                {Icon && (
                  <Icon
                    className="text-sky-500 dark:text-sky-400 mt-1 flex-shrink-0"
                    size={24}
                    aria-hidden="true"
                  />
                )}
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg text-slate-800 dark:text-white">{title}</span>
                  {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
                </div>
              </div>
              <ChevronDown
                className={`transform transition-transform duration-300 text-slate-500 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                size={24}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-content-${id}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
              <div className="p-6 pt-0">
                {collapsibleContent}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Accordion;
