// //validacion para rectificar que al ingresar una fecha de nacimiento esta valide que la persona si es mayor de eddad y permita el registro
// const inputNacimiento = document.querySelector("#birth");
// //El evento blur es disparado cuando un elemento ha perdido su foco.
// inputNacimiento.addEventListener("blur", (evento) => {
//   validarNacimiento(evento.target);
// });

export function valida(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoInput, input);
  }
}
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Ingrese un nombre de usuario",
  },
  email: {
    valueMissing: "Ingrese un correo electrónico valido",
    typeMismatch: "El correo electrónico ingresado no es valido",
  },
  password: {
    valueMissing: "Ingrese una contraseña valida",
    patternMismatch:
      "La contraseña debe tener al menos 6 caracteres, una letra minúcula, una letra mayúscula, un número y no puede contener caracteres especiales",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debe ser mayor de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Debe ingresar solo numeros",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Ingrese la ciudad en la que habita",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Ingrese el estado en el que habita",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoInput][error]);
      mensaje = mensajesDeError[tipoInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debe ser mayor de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
