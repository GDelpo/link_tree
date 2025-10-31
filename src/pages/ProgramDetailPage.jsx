import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { programsSectionData } from '@content';
import ProgramDetailContent from '@components/data/ProgramDetailContent';
import { Clock, Users, CreditCard } from 'lucide-react';
import { getSmartPriceDisplay } from '@/utils/programUtils.js';
import { useLocationContext } from '@contexts/LocationContext.jsx';
import PropTypes from 'prop-types';

const ProgramDetailPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { isArgentina, isLoading: locationLoading } = useLocationContext();

  const programCardData = programsSectionData.content.find((p) => p.id === programId);

  useEffect(() => {
    if (!programCardData) {
      navigate('/');
    }
  }, [programCardData, navigate]);

  const getPrimaryPrice = (priceStructure) => {
    if (locationLoading) return 'Detectando precio...';
    return getSmartPriceDisplay(priceStructure, isArgentina);
  };

  if (!programCardData) {
    return null;
  }

  const program = programCardData.detailedInfo;

  return (
    <div>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Contenedor principal del programa */}
        <div className='dark:bg-slate-800/50 rounded-xl shadow-2xl overflow-hidden'>
          {/* Encabezado del Programa (Título y Stats) */}
          <div className={`p-6 sm:p-8 bg-gradient-to-r ${program.gradientClasses}`}>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>{program.title}</h2>
            <p className='text-white/80 mt-2'>{program.shortDescription}</p>

            <div className='mt-6 flex flex-wrap justify-center gap-4 sm:gap-8 text-center'>
              <StatItem icon={Clock} label='Duración' value={program.duration} />
              <StatItem icon={Users} label='Frecuencia' value={program.frequency} />
              <StatItem icon={CreditCard} label='Inversión' value={getPrimaryPrice(program.price)} />
            </div>
          </div>

          {/* Contenido Detallado */}
          <ProgramDetailContent program={program} />
        </div>
      </div>
    </div>
  );
};

// Componente para cada "Stat" para mantener el código limpio
const StatItem = ({ icon: Icon, label, value }) => (
  <div className='flex items-center gap-3 text-white'>
    <Icon className='w-6 h-6 text-white/80' />
    <div>
      <p className='text-xs uppercase opacity-80'>{label}</p>
      <p className='font-bold text-sm'>{value}</p>
    </div>
  </div>
);

StatItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

ProgramDetailPage.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    emoji: PropTypes.string,
    shortDescription: PropTypes.string,
    gradientClasses: PropTypes.string,
    Icon: PropTypes.elementType,
    duration: PropTypes.string,
    frequency: PropTypes.string,
    price: PropTypes.object,
    targetAudience: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    access: PropTypes.shape({
      platform: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string),
    }),
    equipment: PropTypes.arrayOf(PropTypes.string),
    bonusFeatures: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    specialNote: PropTypes.string,
    paymentMethods: PropTypes.shape({
      local: PropTypes.arrayOf(PropTypes.string),
      international: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default ProgramDetailPage;
