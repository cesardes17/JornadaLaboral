import calculoJornada from "./calculo.js";

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botonCalcular").addEventListener("click", async (event) => {

    let diasLaboralesCiclo = parseInt(document.getElementById("work-days").value);;
    let diasDescansoCiclo = parseInt(document.getElementById("off-days").value);;
    let año = parseInt(document.getElementById("year").value);
    let inicioVacaciones = new Date(document.getElementById("start-date").value);
    let finVacaciones = new Date(document.getElementById("end-date").value);
    let horasJornadaLaboral = document.getElementById("daily-hours").value
    let horasAnualesRequeridas = document.getElementById("annual-hours").value

    if (diasLaboralesCiclo === "" ||
      diasDescansoCiclo === "" ||
      año === "" ||
      inicioVacaciones === "" ||
      finVacaciones === "" ||
      horasJornadaLaboral === "" ||
      horasAnualesRequeridas === "") {
      // Mostrar mensaje de error o realizar alguna acción apropiada
      alert("Todos los campos son obligatorios. Por favor, asegúrate de completarlos.");
      return false; // Indicar que la validación ha fallado
    }


    document.getElementById("form-container").style.display = "none";
    document.getElementById("loading").style.display = "block";




    let arrayJornadaLaboral = await calculoJornada(
      diasLaboralesCiclo,
      diasDescansoCiclo,
      año,
      inicioVacaciones,
      finVacaciones
    );

    mostrarDatos(arrayJornadaLaboral, horasJornadaLaboral, horasAnualesRequeridas);
  });
  document.getElementById("botonVolver").addEventListener("click", () => {
    document.getElementById("contenedorDatos").style.display = "none";
    document.getElementById("form-container").style.display = "none";
    document.getElementById("loading").style.display = "block";

    document.getElementById("work-days").value = "";
    document.getElementById("off-days").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("daily-hours").value = "";
    let diasDescansoCiclo = parseInt(document.getElementById("off-days").value);;
    let año = parseInt(document.getElementById("year").value);
    let inicioVacaciones = new Date(document.getElementById("start-date").value);
    let finVacaciones = new Date(document.getElementById("end-date").value);

    document.getElementById("loading").style.display = "none";
    document.getElementById("form-container").style.display = "block";

  })
});

function mostrarDatos(arrayJornadaLaboral, horasJornadaLaboral, horasAnualesRequeridas) {
  let tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = ""; // Limpiar tabla antes de agregar datos

  let totalDias = 0;
  let totalHoras = 0;

  for (let i = 0; i < meses.length; i++) {
    let row = tablaBody.insertRow();
    let cellMes = row.insertCell(0);
    let cellDias = row.insertCell(1);
    let cellHoras = row.insertCell(2);

    cellMes.textContent = meses[i];
    cellDias.textContent = arrayJornadaLaboral[i];
    let horasTrabajadas = arrayJornadaLaboral[i] * 8; // 8 horas diarias
    cellHoras.textContent = horasTrabajadas.toFixed(2);

    totalDias += arrayJornadaLaboral[i];
    totalHoras += horasTrabajadas;
  }

  let filaSumatorio = document.getElementById("filaSumatorio");
  filaSumatorio.cells[1].textContent = totalDias;
  filaSumatorio.cells[2].textContent = totalHoras.toFixed(2);

  // Diferencias con horas requeridas anuales (asumiendo 8 horas diarias)
  let horasRequeridasAnuales = parseFloat(horasAnualesRequeridas);
  let diffHoras = horasRequeridasAnuales - totalHoras;
  let diffDias = diffHoras / parseInt(horasJornadaLaboral); // 8 horas diarias

  document.getElementById("diffHoras").textContent = diffHoras.toFixed(2);
  document.getElementById("diffDias").textContent = diffDias.toFixed(2);

  document.getElementById("contenedorDatos").style.display = "block";
  document.getElementById("loading").style.display = "none";
}
