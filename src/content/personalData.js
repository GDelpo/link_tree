// 1. Definimos la información base (los datos fijos)
const personalInfoBase = {
  nacimiento: '01.07.1996',
  ciudad: 'Buenos Aires, Argentina',
  email: 'juancruzarbelais@gmail.com',
  telefono: '+54 9 11 2398 2555',
};

// 2. Utilidad para calcular edad
import { calcularEdad } from '@/utils/dateUtils.js';

// 3. Creamos el objeto final que vamos a exportar
export const personalInfo = {
  ...personalInfoBase, // Copiamos toda la info base
  edad: calcularEdad(personalInfoBase.nacimiento), // Y le sumamos la edad calculada
};

export const education = [
  {
    date: '2018 - 2022',
    title: 'Ingeniería en Informática',
    subtitle: 'Universidad de Buenos Aires',
  },
  {
    date: '2020',
    title: 'Bootcamp Full Stack',
    subtitle: 'Coderhouse',
  },
];

export const experience = [
  {
    date: '2022 - Presente',
    title: 'Desarrollador Frontend',
    subtitle: 'Mercado Libre',
  },
  {
    date: '2020 - 2022',
    title: 'Desarrollador Web Jr.',
    subtitle: 'Startup X',
  },
];