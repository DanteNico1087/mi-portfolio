document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    // Capturamos los campos
    const nombre  = form.nombre.value.trim();
    const email   = form.email.value.trim();
    const asunto  = form.asunto.value.trim();
    const mensaje = form.mensaje.value.trim();

    // Simple validación
    const errors = [];
    if (!nombre)  errors.push('El nombre es obligatorio');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
                  errors.push('El email no es válido');
    if (!asunto)  errors.push('El asunto es obligatorio');
    if (!mensaje) errors.push('El mensaje es obligatorio');

    // Mostramos errores o procedemos
    const errorContainer = document.querySelector('.formcontato__errors');
    errorContainer?.remove();
    if (errors.length) {
      const ul = document.createElement('ul');
      ul.className = 'formcontato__errors';
      errors.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        ul.appendChild(li);
      });
      form.prepend(ul);
      return;
    }

    // Preparamos datos para el servidor
    const payload = { nombre, email, asunto, mensaje };

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(`Error ${resp.status}`);

      // Éxito: notificamos al usuario
      alert('Mensaje enviado correctamente. ¡Gracias!');
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Hubo un problema enviando el formulario. Intenta nuevamente más tarde.');
    }
  });
});
