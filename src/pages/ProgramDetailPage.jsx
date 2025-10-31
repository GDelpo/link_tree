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
  const program = programsSectionData.content.find((p) => p.id === programId);

  useEffect(() => {
    if (!program) {
      navigate('/');
    }
  }, [program, navigate]);

  const getPrimaryPrice = (priceStructure) => {
    if (locationLoading) return 'Detectando precio...';
    return getSmartPriceDisplay(priceStructure, isArgentina);
  };

  if (!program) {
    return null;
  }

  return (
    <div>
      <PageHeader
        title={program.title}
        subtitle={program.shortDescription}
        className={`bg-gradient-to-r ${program.gradientClasses} text-white`}
      />
      <div className='-mt-8 mb-8 flex justify-center'>
        <div className='flex flex-wrap gap-2 text-xs bg-white/20 rounded-lg p-2 backdrop-blur-sm'>
          <div className='flex items-center gap-1 text-white rounded px-2 py-1'>
            <Clock className='w-3 h-3' />
            <span>{program.duration}</span>
          </div>
          <div className='flex items-center gap-1 text-white rounded px-2 py-1'>
            <Users className='w-3 h-3' />
            <span>{program.frequency}</span>
          </div>
          <div className='flex items-center gap-1 text-white rounded px-2 py-1'>
            <CreditCard className='w-3 h-3' />
            <span>{getPrimaryPrice(program.price)}</span>
          </div>
        </div>
      </div>
      <ProgramDetailContent program={program} />
    </div>
  );
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
