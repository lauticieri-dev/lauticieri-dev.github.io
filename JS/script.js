



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
    emailjs.sendForm('service_se6yqmd', 'template_h6iypyi', '#reserva-form')
        .then(function (response) {
            alert('¡Reserva enviada correctamente!');
            document.getElementById('reserva-form').reset();
        }, function (error) {
            alert('Error al enviar la reserva. Intenta de nuevo.');
        });
}

