import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { programsSectionData } from '@content';
import ProgramDetailContent from '@components/data/ProgramDetailContent';
import PageHeader from '@components/layout/PageHeader';
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
    <div className='bg-slate-50 dark:bg-black'>
      {/* Encabezado Principal */}
      <PageHeader
        title={program.title}
        subtitle={program.shortDescription}
        className={`bg-gradient-to-r ${program.gradientClasses} text-white`}
      />

      {/* Barra de Estadísticas Rediseñada */}
      <div className='-mt-16 mb-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-wrap justify-center gap-4 sm:gap-8 text-center ring-1 ring-slate-200 dark:ring-slate-700'>
            <StatItem icon={Clock} label='Duración' value={program.duration} />
            <StatItem icon={Users} label='Frecuencia' value={program.frequency} />
            <StatItem icon={CreditCard} label='Inversión' value={getPrimaryPrice(program.price)} />
          </div>
        </div>
      </div>

      {/* Contenido Detallado del Programa */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <ProgramDetailContent program={program} />
      </div>
    </div>
  );
};

// Componente para cada "Stat" para mantener el código limpio
const StatItem = ({ icon: Icon, label, value }) => (
  <div className='flex items-center gap-3'>
    <Icon className='w-6 h-6 text-sky-500' />
    <div>
      <p className='text-xs text-slate-500 dark:text-slate-400 uppercase'>{label}</p>
      <p className='font-bold text-sm text-slate-800 dark:text-slate-100'>{value}</p>
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
