function showContactForm() {
    document.getElementById('contact').classList.remove('hidden');
    window.scrollTo({
        top: document.getElementById('contact').offsetTop - 100,
        behavior: 'smooth'
    });
}

// Validación en tiempo real
document.getElementById('message').addEventListener('input', function(e) {
    const counter = document.querySelector('.char-counter span');
    counter.textContent = e.target.value.length;
});

// Manejo del formulario
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    const successMessage = document.getElementById('successMessage');

    // Validación adicional
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Simular envío (reemplazar con tu API)
    try {
        btnText.textContent = 'Enviando...';
        spinner.classList.remove('hidden');
        submitBtn.disabled = true;

        // Aquí iría el fetch a tu backend
        await new Promise(resolve => setTimeout(resolve, 1500));

        successMessage.classList.remove('hidden');
        form.reset();
        document.querySelector('.char-counter span').textContent = '0';
        
        // Ocultar mensaje después de 4 segundos
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 4000);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
        btnText.textContent = 'Enviar mensaje';
        spinner.classList.add('hidden');
        submitBtn.disabled = false;
    }
});

// Validación personalizada para el nombre
document.getElementById('name').addEventListener('input', function(e) {
    const errorSpan = this.nextElementSibling;
    const regex = /^[A-Za-zÁ-ú\s]{3,50}$/;
    
    if (!regex.test(e.target.value)) {
        errorSpan.textContent = 'Solo letras y espacios (3-50 caracteres)';
        errorSpan.style.opacity = '1';
    } else {
        errorSpan.style.opacity = '0';
    }
});
