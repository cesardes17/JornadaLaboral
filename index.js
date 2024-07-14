import calculoJornada from "./calculo.js";

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

let diasLaboralesCiclo = 4;
let diasDescansoCiclo = 2;
let año = 2024;
let inicioVacaciones = new Date(2024, 1, 1);
let finVacaciones = new Date(2024, 1, 1);

let arrayJornadaLaboral = calculoJornada(
  diasLaboralesCiclo,
  diasDescansoCiclo,
  año,
  inicioVacaciones,
  finVacaciones
);

for (let i = 0; i < 12; i++) {
  console.log(meses[i] + " " + arrayJornadaLaboral[i]);
}
