import React from 'react';
import ProgramCard from '@/components/ProgramCard';

/**
 * Renderiza una lista de tarjetas de programas.
 * @param {{ programs: Array<Object> }} props
 */
const ProgramsSection = ({ programs = [] }) => {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {programs.map((program) => (
        <ProgramCard key={program.id} {...program} />
      ))}
    </div>
  );
};

export default ProgramsSection;