import React from 'react';
import { MessageCircle, CreditCard, Clock, Smartphone, Shield, Truck } from 'lucide-react';
import { useLocationContext } from '../contexts/LocationContext.jsx';
import { generateWhatsAppLink } from '../content/contact.js';

// 💳 Componente inteligente para métodos de pago y contacto
export const SmartPaymentSection = ({ program }) => {
  const { isArgentina, country } = useLocationContext();
  
  return (
    <div className="space-y-4">
      {/* Métodos de pago relevantes */}
      <RelevantPaymentMethods program={program} />
      
      {/* Información de entrega/acceso */}
      <DeliveryInfo program={program} />
      
      {/* Botones de contacto personalizados */}
      <ContactButtons program={program} />
    </div>
  );
};

// 💳 Métodos de pago filtrados por ubicación
const RelevantPaymentMethods = ({ program }) => {
  const { isArgentina } = useLocationContext();
  
  const getRelevantMethods = () => {
    const { paymentMethods } = program;
    if (!paymentMethods) return [];
    
    if (isArgentina) {
      return paymentMethods.local || [];
    } else {
      return paymentMethods.international || [];
    }
  };
  
  const methods = getRelevantMethods();
  
  if (methods.length === 0) return null;
  
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-blue-600" />
        Métodos de pago disponibles {isArgentina ? 'en Argentina' : 'internacionales'}
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {methods.map((method, index) => (
          <PaymentMethodCard key={index} method={method} isArgentina={isArgentina} />
        ))}
      </div>
      
      {/* Información adicional por región */}
      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {isArgentina ? (
              <>
                <strong>Pago seguro:</strong> Transferencias bancarias directas. 
                Te enviaremos los datos una vez que confirmes tu interés.
              </>
            ) : (
              <>
                <strong>Secure payment:</strong> International payments through PayPal. 
                Safe and reliable worldwide processing.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 💳 Tarjeta individual de método de pago
const PaymentMethodCard = ({ method, isArgentina }) => {
  const getMethodIcon = () => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('paypal')) return '💙';
    if (methodLower.includes('transfer') || methodLower.includes('transferencia')) return '🏦';
    if (methodLower.includes('mercado')) return '💚';
    if (methodLower.includes('stripe')) return '💜';
    return '💳';
  };
  
  return (
    <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
      <span className="text-lg">{getMethodIcon()}</span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {method}
      </span>
    </div>
  );
};

// 📦 Información de entrega/acceso
const DeliveryInfo = ({ program }) => {
  const { isArgentina } = useLocationContext();
  
  return (
    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
        <Smartphone className="w-4 h-4" />
        Acceso al programa
      </h4>
      
      <div className="space-y-3">
        <AccessStep 
          step="1"
          title="Confirmación de pago"
          description={isArgentina 
            ? "Realizás la transferencia y nos enviás el comprobante"
            : "Complete your PayPal payment securely"
          }
          icon={<CreditCard className="w-4 h-4" />}
        />
        
        <AccessStep 
          step="2"
          title="Acceso inmediato"
          description={isArgentina
            ? "Te enviamos el acceso a la app móvil dentro de las 24hs"
            : "Receive app access within 24 hours via email"
          }
          icon={<Smartphone className="w-4 h-4" />}
        />
        
        <AccessStep 
          step="3"
          title="Soporte continuo"
          description={isArgentina
            ? "Seguimiento personalizado durante todo el programa"
            : "Personal coaching support throughout the program"
          }
          icon={<MessageCircle className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

// 📋 Paso individual del proceso
const AccessStep = ({ step, title, description, icon }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
        {step}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h5 className="font-medium text-green-800 dark:text-green-200 text-sm">
            {title}
          </h5>
        </div>
        <p className="text-green-700 dark:text-green-300 text-xs">
          {description}
        </p>
      </div>
    </div>
  );
};

// 📱 Botones de contacto personalizados
const ContactButtons = ({ program }) => {
  const { isArgentina, country } = useLocationContext();
  
  const getPersonalizedMessage = () => {
    const baseMessage = `Hola! Me interesa el ${program.title}`;
    
    if (isArgentina) {
      return `${baseMessage}. ¿Podrías contarme más detalles sobre el programa y cómo realizar el pago en Argentina?`;
    } else {
      return `${baseMessage}. Could you tell me more about the program and international payment options? I'm writing from ${country || 'outside Argentina'}.`;
    }
  };
  
  const whatsappLink = generateWhatsAppLink(getPersonalizedMessage());
  
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4">
      <div className="text-center text-white mb-4">
        <h4 className="font-bold mb-1">
          {isArgentina ? '¿Listo para empezar?' : 'Ready to start?'}
        </h4>
        <p className="text-green-100 text-sm">
          {isArgentina 
            ? 'Contactanos para más información y comenzar tu transformación'
            : 'Contact us for more info and start your transformation'
          }
        </p>
      </div>
      
      <div className="space-y-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {isArgentina ? 'Consultar por WhatsApp' : 'Ask via WhatsApp'}
        </a>
        
        <div className="text-center">
          <p className="text-green-100 text-xs">
            {isArgentina 
              ? '✓ Respuesta garantizada en menos de 2 horas'
              : '✓ Guaranteed response within 2 hours'
            }
          </p>
        </div>
      </div>
    </div>
  );
};