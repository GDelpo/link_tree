import React, { useState } from 'react';
import ProgramCard from '@components/data/ProgramCard';
import ProgramDetailModal from '@components/data/ProgramDetailModal';

/**
 * Renderiza una lista de tarjetas de programas y maneja el estado del modal.
 * El modal se renderiza fuera del contenedor para evitar problemas de z-index.
 * @param {{ programs: Array<Object> }} props
 */
const ProgramsSection = ({ programs = [] }) => {
  const [modalProgram, setModalProgram] = useState(null);

  const handleOpenModal = (program) => {
    setModalProgram(program);
  };

  const handleCloseModal = () => {
    setModalProgram(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pt-4">
        {programs.map((program) => (
          <ProgramCard 
            key={program.id} 
            {...program}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      
      {/* Modal renderizado fuera del contenedor flex */}
      <ProgramDetailModal
        program={modalProgram}
        isOpen={!!modalProgram}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProgramsSection;