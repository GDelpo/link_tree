// Date utilities

/**
 * Calculate age given a birth date string in format DD.MM.YYYY
 */
export function calcularEdad(fechaNacimiento) {
  const [dia, mes, anio] = fechaNacimiento.split('.').map(Number);
  const hoy = new Date();
  const fechaNac = new Date(anio, mes - 1, dia); // Month is 0-indexed
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();
  if (mesActual < fechaNac.getMonth() || (mesActual === fechaNac.getMonth() && diaActual < fechaNac.getDate())) {
    edad--;
  }
  return edad;
}
