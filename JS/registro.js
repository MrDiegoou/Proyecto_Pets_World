document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.getElementById('form');
  const nombre = document.getElementById('Nombres');
  const apellidos = document.getElementById('Apellidos');
  const correo = document.getElementById('Mail');
  const fecha = document.getElementById('fecha');
  const number = document.getElementById('number');
  const password = document.getElementById('password');
  const password_2 = document.getElementById('password_2');
  const warnings = document.getElementById('warnings');

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validaciones
    if (nombre.value === "" || apellidos.value === "" || correo.value === "" || fecha.value === "" || number.value === "" || password.value === "" || password_2.value === "") {
      warnings.textContent = "Por favor, complete todos los campos.";
      return;
    }

    const correoRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!correoRegex.test(correo.value)) {
      warnings.textContent = "Por favor, ingrese un correo electrónico válido.";
      return;
    }

    const numberRegex = /^\d{10}$/;
    if (!numberRegex.test(number.value)) {
      warnings.textContent = "Ingrese un número de teléfono válido (10 dígitos).";
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (!passwordRegex.test(password.value)) {
      warnings.textContent = "La contraseña debe contener al menos un número, una letra minúscula, una letra mayúscula y tener entre 8 y 16 caracteres.";
      return;
    }
    if (password.value !== password_2.value) {
      warnings.textContent = "Las contraseñas no coinciden.";
      return;
    }

    warnings.textContent = "";
    
    // Datos a enviar al backend
    const data = {
      nombres: nombre.value,
      apellidos: apellidos.value,
      fechaNacimiento: fecha.value,
      correo: correo.value,
      telefono: number.value,
      contraseña: password.value
    };

    try {
      const response = await fetch("https://backend-pets-world.onrender.com/registro", { // Cambié la URL a "/registro" para representar la ruta adecuada en tu backend
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Redirigir a la página de registro exitoso o realizar alguna acción adicional
        window.location.href = "./Form-Register2.html";
      } else {
        alert("Error en el registro");
      }
    } catch (error) {
      console.log(error);
      alert("Error en la conexión");
    }

    // No es necesario guardar el correo y la contraseña en localStorage
  });
});
