import React, { useState, useEffect } from 'react';
import {
  Users,
  Smartphone,
  Star,
  CreditCard,
  Check,
  Shield,
  MessageCircle,
  Dumbbell,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { normalizePrice } from '@/utils/programUtils.js';
import { generateWhatsAppLink } from '@content/contact.js';
import {
  useLocationContext,
} from '@contexts/LocationContext.jsx';


// Inline SmartPricingSection (previously @components/navigation/SmartPricing.jsx)
const SmartPricingSection = ({ program }) => {
  if (!program?.price) return null;
  const hasMultipleDurations = (price) => {
    const normalized = normalizePrice(price);
    const keys = Object.keys(normalized.options);
    return keys.length > 1;
  };
  return (
    <div className='space-y-4'>
      {hasMultipleDurations(program.price) ? (
        <InteractiveDurationSelector program={program} />
      ) : (
        <PersonalizedPriceCard program={program} />
      )}
    </div>
  );
};

SmartPricingSection.propTypes = {
  program: PropTypes.object.isRequired,
};

const PersonalizedPriceCard = ({ program, selectedDuration }) => {
  const { isArgentina, isLoading } = useLocationContext();
  const getPersonalizedPrice = (durationKey = null) => {
    const normalized = normalizePrice(program.price);
    const keys = Object.keys(normalized.options);
    if (keys.length === 0) return null;
    const targetKey =
      durationKey && normalized.options[durationKey]
        ? durationKey
        : normalized.options.default
          ? 'default'
          : keys[0];
    const band =
      normalized.options[targetKey].specialOffer ||
      normalized.options[targetKey].regular ||
      {};
    const current = isArgentina
      ? band.local || band.international
      : band.international || band.local;
    return {
      current,
      label: isArgentina ? 'Argentina' : 'Internacional',
      currency: isArgentina ? 'ARS' : 'USD',
      duration:
        targetKey === 'default'
          ? program.duration
          : targetKey.replace('weeks', ' semanas'),
      durationKey: targetKey,
    };
  };
  const getPromotionalPrice = () => {
    const normalized = normalizePrice(program.price);
    const opt =
      normalized.options.default ||
      normalized.options[Object.keys(normalized.options)[0]];
    if (!opt) return null;
    const regular = opt.regular || {};
    const special = opt.specialOffer || null;
    if (!special) return null;
    const regVal = isArgentina
      ? regular.local || regular.international
      : regular.international || regular.local;
    const promoVal = isArgentina
      ? special.local || special.international
      : special.international || special.local;
    if (!promoVal) return null;
    return {
      regular: regVal,
      promotional: promoVal,
      label: isArgentina ? 'Argentina' : 'Internacional',
      duration: program.duration,
    };
  };
  const priceData = getPersonalizedPrice(selectedDuration);
  const promoData = getPromotionalPrice();
  if (!priceData && !promoData) return null;
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white'>
      <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16' />
      <div className='relative z-10'>
        <div className='flex items-center gap-2 mb-4'>
          <Star className='w-5 h-5 text-yellow-300' />
          <span className='text-sm font-medium text-emerald-100'>
            Tu inversión
          </span>
        </div>
        {isLoading ? (
          <div className='text-2xl font-bold mb-1'>Calculando...</div>
        ) : promoData ? (
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <span className='text-xl text-emerald-200 line-through opacity-75'>
                {promoData.regular}
              </span>
              <div className='bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
                🔥 OFERTA ESPECIAL
              </div>
            </div>
            <div className='text-4xl font-bold'>{promoData.promotional}</div>
          </div>
        ) : (
          <div className='text-4xl font-bold mb-1'>{priceData.current}</div>
        )}
        <p className='text-emerald-100 text-sm mt-2'>
          {(promoData || priceData).label} • {(promoData || priceData).duration}
        </p>
        <div className='flex items-center gap-4 mt-4 pt-4 border-t border-white/20'>
          <div className='flex items-center gap-1.5'>
            <Check className='w-4 h-4 text-white' />
            <span className='text-xs'>Seguimiento personalizado</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Check className='w-4 h-4 text-white' />
            <span className='text-xs'>Acceso móvil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalizedPriceCard.propTypes = {
  program: PropTypes.object.isRequired,
  selectedDuration: PropTypes.string,
};

const InteractiveDurationSelector = ({ program }) => {
  const { isArgentina } = useLocationContext();
  const { price } = program;
  const [selectedDuration, setSelectedDuration] = useState(null);
  const normalized = normalizePrice(price);
  const priceKeys = Object.keys(normalized.options).filter(
    (k) => k !== 'default'
  );
  useEffect(() => {
    if (!selectedDuration && priceKeys.length > 0) {
      setSelectedDuration(priceKeys[0]);
    }
  }, [selectedDuration, priceKeys]);
  const isSingleDuration = priceKeys.length <= 1;
  return (
    <div className='space-y-4'>
      {isSingleDuration ? (
        <PersonalizedPriceCard program={program} />
      ) : (
        <>
          <div className='bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4'>
            <div className='mb-3'>
              <h4 className='font-semibold text-slate-800 dark:text-white text-sm mb-1'>
                ¿Cuánto tiempo quieres entrenar?
              </h4>
              <p className='text-xs text-slate-600 dark:text-slate-400'>
                Selecciona la duración y ve tu precio actualizado abajo
              </p>
            </div>
            <div className='grid gap-2'>
              {priceKeys.map((key) => {
                const option = normalized.options[key];
                const duration = key.replace('weeks', ' semanas');
                const isSelected = selectedDuration === key;
                const band = option.specialOffer || option.regular || {};
                const relevantPrice = isArgentina
                  ? band.local || band.international
                  : band.international || band.local;
                if (!relevantPrice) return null;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDuration(key)}
                    className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-200 text-left ${
                      isSelected
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                        : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                    }`}
                  >
                    <span
                      className={`font-medium ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {duration}
                    </span>
                    <span
                      className={`font-bold ${isSelected ? 'text-white' : 'text-slate-800 dark:text-white'}`}
                    >
                      {relevantPrice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <PersonalizedPriceCard
            program={program}
            selectedDuration={selectedDuration}
          />
        </>
      )}
    </div>
  );
};

InteractiveDurationSelector.propTypes = {
  program: PropTypes.object.isRequired,
};

// Inline SmartPaymentSection (previously @components/navigation/SmartPayment.jsx)
const SmartPaymentSection = ({ program }) => {
  return (
    <div className='space-y-4'>
      <RelevantPaymentMethods program={program} />
      <DeliveryInfo program={program} />
      <ContactButtons program={program} />
    </div>
  );
};

SmartPaymentSection.propTypes = {
  program: PropTypes.object.isRequired,
};

const RelevantPaymentMethods = ({ program }) => {
  const { isArgentina } = useLocationContext();
  const getRelevantMethods = () => {
    const { paymentMethods } = program;
    if (!paymentMethods) return [];
    return isArgentina
      ? paymentMethods.local || []
      : paymentMethods.international || [];
  };
  const methods = getRelevantMethods();
  if (methods.length === 0) return null;
  return (
    <div className='bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4'>
      <h4 className='font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2'>
        <CreditCard className='w-4 h-4 text-blue-600 dark:text-blue-400' />
        Métodos de pago disponibles{' '}
        {isArgentina ? 'en Argentina' : 'internacionales'}
      </h4>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        {methods.map((method, index) => (
          <PaymentMethodCard key={index} method={method} />
        ))}
      </div>
      <div className='mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
        <div className='flex items-start gap-2'>
          <Shield className='w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div className='text-sm text-blue-800 dark:text-blue-200'>
            <strong>Pago seguro:</strong>{' '}
            {isArgentina
              ? 'Transferencias bancarias directas. Te enviaremos los datos una vez que confirmes tu interés.'
              : 'Pagos internacionales a través de PayPal. Procesamiento seguro y confiable en todo el mundo.'}
          </div>
        </div>
      </div>
    </div>
  );
};

RelevantPaymentMethods.propTypes = {
  program: PropTypes.object.isRequired,
};

const PaymentMethodCard = ({ method: _method }) => {
  const getMethodIcon = () => {
    const methodLower = _method.toLowerCase();
    if (methodLower.includes('paypal')) return '💙';
    if (
      methodLower.includes('transfer') ||
      methodLower.includes('transferencia')
    )
      return '🏦';
    if (methodLower.includes('mercado')) return '💚';
    if (methodLower.includes('stripe')) return '💜';
    return '💳';
  };
  return (
    <div className='flex items-center gap-3 p-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600'>
      <span className='text-lg'>{getMethodIcon()}</span>
      <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
        {_method}
      </span>
    </div>
  );
};

PaymentMethodCard.propTypes = {
  method: PropTypes.string.isRequired,
};

const DeliveryInfo = ({ program: _program }) => {
  const { isArgentina } = useLocationContext();
  return (
    <div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-4'>
      <h4 className='font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2'>
        <Smartphone className='w-4 h-4 text-green-600 dark:text-green-400' />
        Acceso al programa
      </h4>
      <div className='space-y-3'>
        <AccessStep
          step='1'
          title='Confirmación de pago'
          description={
            isArgentina
              ? 'Realizás la transferencia y nos envías el comprobante'
              : 'Completás tu pago PayPal de forma segura'
          }
          icon={
            <CreditCard className='w-4 h-4 text-green-600 dark:text-green-400' />
          }
        />
        <AccessStep
          step='2'
          title='Acceso inmediato'
          description='Te enviamos el acceso a la app móvil dentro de las 24hs por email'
          icon={
            <Smartphone className='w-4 h-4 text-green-600 dark:text-green-400' />
          }
        />
        <AccessStep
          step='3'
          title='Soporte continuo'
          description='Seguimiento personalizado durante todo el programa'
          icon={
            <MessageCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
          }
        />
      </div>
    </div>
  );
};

DeliveryInfo.propTypes = {
  program: PropTypes.object.isRequired,
};

const AccessStep = ({ step, title, description, icon }) => (
  <div className='flex items-start gap-3'>
    <div className='flex-shrink-0 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center'>
      {step}
    </div>
    <div className='flex-grow'>
      <div className='flex items-center gap-2 mb-1'>
        {icon}
        <h5 className='font-medium text-green-800 dark:text-green-200 text-sm'>
          {title}
        </h5>
      </div>
      <p className='text-green-700 dark:text-green-300 text-xs'>
        {description}
      </p>
    </div>
  </div>
);

AccessStep.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const ContactButtons = ({ program }) => {
  const { isArgentina, country } = useLocationContext();
  const getPersonalizedMessage = () => {
    const baseMessage = `Hola! Me interesa el ${program.title}`;
    return isArgentina
      ? `${baseMessage}. ¿Podrías contarme más detalles sobre el programa y cómo realizar el pago en Argentina?`
      : `${baseMessage}. ¿Podrías contarme más detalles sobre el programa y las opciones de pago internacional? Te escribo desde ${country || 'fuera de Argentina'}.`;
  };
  const whatsappLink = generateWhatsAppLink(getPersonalizedMessage());
  return (
    <div className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4'>
      <div className='text-center text-white mb-4'>
        <h4 className='font-bold mb-1'>¿Listo para empezar?</h4>
        <p className='text-green-100 text-sm'>
          Contactanos para más información y comenzar tu transformación
        </p>
      </div>
      <div className='space-y-2'>
        <a
          href={whatsappLink}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg'
        >
          <MessageCircle className='w-5 h-5' /> Consultar por WhatsApp
        </a>
        <div className='text-center'>
          <p className='text-green-100 text-xs'>
            ✓ Respuesta garantizada en menos de 2 horas
          </p>
        </div>
      </div>
    </div>
  );
};

ContactButtons.propTypes = {
  program: PropTypes.object.isRequired,
};

const ProgramDetailContent = ({ program }) => {
    if (!program) return null;
  return (
    <div className='p-6 space-y-8'>
      {/* Target Audience */}
      <section aria-labelledby='target-heading'>
        <h3
          id='target-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2'
        >
          <Users className='w-5 h-5 text-sky-600' />
          ¿Para quién es este programa?
        </h3>
        <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
          {program.targetAudience}
        </p>
      </section>

      {/* Description */}
      <section aria-labelledby='description-heading'>
        <h3
          id='description-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-3'
        >
          Descripción del Programa
        </h3>
        <div className='space-y-4'>
          {program.description.map((paragraph, index) => (
            <p
              key={index}
              className='text-slate-600 dark:text-slate-300 leading-relaxed'
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Access & Platform */}
      <section aria-labelledby='access-heading'>
        <h3
          id='access-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2'
        >
          <Smartphone className='w-5 h-5 text-sky-600' />
          Acceso y Plataforma
        </h3>
        <p className='text-slate-600 dark:text-slate-300 mb-3 font-medium'>
          {program.access.platform}
        </p>
        <ul className='space-y-2'>
          {program.access.features.map((feature, index) => (
            <li
              key={index}
              className='flex items-start gap-2 text-slate-600 dark:text-slate-300'
            >
              <span className='w-2 h-2 bg-sky-600 rounded-full mt-2 flex-shrink-0' />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Equipment */}
      <section aria-labelledby='equipment-heading'>
        <h3
          id='equipment-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2'
        >
          <Dumbbell className='w-5 h-5 text-sky-600' />
          Equipamiento Necesario
        </h3>
        <ul className='space-y-2'>
          {program.equipment.map((item, index) => (
            <li
              key={index}
              className='flex items-start gap-2 text-slate-600 dark:text-slate-300'
            >
              <span className='w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Bonus Features */}
      {program.bonusFeatures && program.bonusFeatures.length > 0 && (
        <section aria-labelledby='bonus-heading'>
          <h3
            id='bonus-heading'
            className='text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2'
          >
            <Star className='w-5 h-5 text-amber-500' />
            Características Especiales
          </h3>
          <div className='space-y-4'>
            {program.bonusFeatures.map((feature, index) => (
              <div
                key={index}
                className='bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800'
              >
                <h4 className='font-semibold text-amber-800 dark:text-amber-200 mb-2'>
                  {feature.title}
                </h4>
                <p className='text-amber-700 dark:text-amber-300 text-sm'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Smart Pricing Section */}
      <section aria-labelledby='pricing-heading'>
        <h3
          id='pricing-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2'
        >
          <CreditCard className='w-5 h-5 text-emerald-600' />
          Precios y Opciones
        </h3>
        <SmartPricingSection program={program} />

        {program.specialNote && (
          <div className='mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500'>
            <p className='text-blue-800 dark:text-blue-200 font-medium text-sm'>
              ⚡ {program.specialNote}
            </p>
          </div>
        )}
      </section>

      {/* Smart Payment & Contact Section */}
      <section aria-labelledby='payment-heading'>
        <h3
          id='payment-heading'
          className='text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2'
        >
          <CreditCard className='w-5 h-5 text-sky-600' />
          Pago y Contacto
        </h3>
        <SmartPaymentSection program={program} />
      </section>
    </div>
  );
};

ProgramDetailContent.propTypes = {
    program: PropTypes.object.isRequired,
};

export default ProgramDetailContent;
