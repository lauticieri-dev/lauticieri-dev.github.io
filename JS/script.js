



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input[name="fecha"]').addEventListener('change', function () {
        const horarios = {
            default: [
                "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
            ],
            domingo: [
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
            ],
            sábado: [
                "12:00", "12:30", "13:00", "13:30", "14:00",
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
            ]
        };
        const horaSelect = document.getElementById('hora');
        alert(this.value);
        const fechaParts = this.value.split('-');
        const fecha = new Date(fechaParts[0], fechaParts[1] - 1, fechaParts[2]);
        console.log(fecha);
        let opciones = horarios.default;

        // 0 = Domingo, 6 = Sábado
        if (!isNaN(fecha)) {
            if (fecha.getDay() === 0) {
                opciones = horarios.domingo;
            } else if (fecha.getDay() === 6) {
                opciones = horarios.sábado;
            }
        }

        // Limpiar opciones actuales
        horaSelect.innerHTML = '<option value="">Seleccione una hora</option>';
        // Agregar nuevas opciones
        opciones.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            horaSelect.appendChild(option);
        });
    });
});


function enviarReserva() {
    const form = document.getElementById('reserva-form');
    
    if (form.fecha.value < new Date().toISOString().split('T')[0]) {
        alert('La fecha de la reserva no puede ser en el pasado.');
        return;
    }
    if (!form.checkValidity()) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Crear parámetros del template
    const formData = new FormData(form);
    const templateParams = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        fecha: formData.get('fecha'),
        hora: formData.get('hora'),
        comensales: formData.get('comensales')
    };

    // Enviar usando templateParams
    emailjs.send('service_se6yqmd', 'template_h6iypyi', templateParams)
        .then(function (response) {
            alert('¡Reserva enviada correctamente!');
            document.getElementById('reserva-form').reset();
        }, function (error) {
            alert('Error al enviar la reserva. Intenta de nuevo.');
            console.error('Error:', error);
        });
}



function enviarContacto(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Obtener el valor del radio button seleccionado
    const satisfactionRadio = document.querySelector('input[name="satisfaction"]:checked');
    
    const templateParams = {
        name: formData.get('name'),                    // Cambiado de from_name a name
        email: formData.get('email'),                  
        telefono: formData.get('telefono'),            // Cambiado de phone a telefono
        message: formData.get('message'),
        satisfaction: satisfactionRadio ? satisfactionRadio.value : 'No especificado'
    };
    
    // Enviar email usando EmailJS
    emailjs.send('service_se6yqmd', 'template_gohw4kq', templateParams) // Reemplaza con tus IDs
        .then(function(response) {
            alert('¡Mensaje enviado exitosamente!');
            form.reset();
        })
        .catch(function(error) {
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            console.error('Error:', error);
        });
}

// Agregar event listener al formulario de contacto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('formCont');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarContacto);
    }
});

