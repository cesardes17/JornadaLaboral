const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const festivos = {
  2024: [
    "2024-01-01", // Año Nuevo
    "2024-01-06", // Reyes
    "2024-02-13", // Carnaval
    "2024-03-28", // Jueves Santo
    "2024-03-29", // Viernes Santo
    "2024-05-01", // Día del Trabajo
    "2024-05-30", // Día de Canarias
    "2024-06-24", // San Juan
    "2024-08-15", // Asunción de la Virgen
    "2024-10-12", // Fiesta Nacional de España
    "2024-11-01", // Día de Todos los Santos
    "2024-12-06", // Día de la Constitución Española
    "2024-12-09", // Día de la Constitución Española
    "2024-12-25", // Navidad
  ],
  2025: [
    "2025-01-01", // Año Nuevo
    "2025-01-06", // Reyes
    "2025-03-04",
    "2025-04-17",
    "2025-04-18",
    "2025-05-01",
    "2025-05-30",
    "2025-06-24",
    "2025-08-15",
    "2025-10-12",
    "2025-11-01",
    "2025-12-06",
    "2025-12-08",
    "2025-12-25", // Navidad
  ],
  2026: [
    "2026-01-01", // Año Nuevo
    "2026-01-06", // Reyes
    "2026-02-17",
    "2026-04-02",
    "2026-04-03",
    "2026-05-01",
    "2026-05-30",
    "2026-06-24",
    "2026-08-15",
    "2026-10-12",
    "2026-11-01",
    "2026-12-06",
    "2026-12-08",
    "2026-12-25", // Navidad
  ],
};

function getFestivosAsArray(año) {
  return festivos[año].map((dateString) => new Date(dateString));
}

function getVacacionesAsArray(inicioVacaciones, finVacaciones) {
  let fechasVacaciones = [];
  let fechaActual = new Date(inicioVacaciones);

  while (fechaActual <= finVacaciones) {
    fechasVacaciones.push(new Date(fechaActual));
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  fechasVacaciones.push(new Date(finVacaciones)); // Include the last day of vacation
  return fechasVacaciones;
}

function obtenerNumeroDeDiasDelMes(año, mes) {
  const fecha = new Date(año, mes + 1, 0);
  let dia = fecha.getDate();
  console.log(dia);
  return dia;
}

function esVacaciones(dia, fechasVacaciones) {
  return fechasVacaciones.some(
    (diaVacacion) =>
      diaVacacion.getDate() === dia.getDate() &&
      diaVacacion.getMonth() === dia.getMonth() &&
      diaVacacion.getFullYear() === dia.getFullYear()
  );
}

function esfestivo(dia, fechasFestivos) {
  return fechasFestivos.some(
    (festivo) =>
      festivo.getDate() === dia.getDate() &&
      festivo.getMonth() === dia.getMonth() &&
      festivo.getFullYear() === dia.getFullYear()
  );
}

function calculaJornadaLaboral(
  diasLaboralesCiclo,
  diasDescansoCiclo,
  año,
  inicioVacaciones,
  finVacaciones
) {
  let resultados = new Array(12).fill(0);
  let festivos = getFestivosAsArray(año);
  let vacaciones = getVacacionesAsArray(inicioVacaciones, finVacaciones);
  let diasCiclo = diasDescansoCiclo + diasLaboralesCiclo;
  let contadorDiasCiclo = 0;
  for (let mes = 0; mes < meses.length; mes++) {
    let diaActual;
    let nDias = obtenerNumeroDeDiasDelMes(año, mes);
    let diasTrabajadosMes = 0;
    for (let dia = 1; dia < nDias + 1; dia++) {
      contadorDiasCiclo++;
      diaActual = new Date(año, mes, dia);
      if (esVacaciones(diaActual, vacaciones)) {
      } else {
        if (contadorDiasCiclo <= diasLaboralesCiclo) {
          if (esfestivo(diaActual, festivos)) {
            // console.log(getFechaAsString(diaActual) + " es Festivo");
          } else {
            // console.log(getFechaAsString(diaActual) + " es Laboral");
            diasTrabajadosMes++;
          }
        }
        if (contadorDiasCiclo > diasLaboralesCiclo) {
          // console.log(getFechaAsString(diaActual) + " es Descanso");
        }
      }
      if (contadorDiasCiclo === diasCiclo) {
        contadorDiasCiclo = 0;
      }
    }
    resultados[mes] = diasTrabajadosMes;
  }

  return resultados;
}

export default calculaJornadaLaboral;
