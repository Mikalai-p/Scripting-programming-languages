const radioBtns = document.querySelectorAll(".radiocontainer input[type='radio']");
const checkbox = document.getElementById('bstu');
const aboutTextarea = document.getElementById('about');
const charCount = document.getElementById('charCount');

const form = document.getElementById('registrationForm');

form.addEventListener('input', function(e) {
    saveFormToSessionStorage();
});

checkbox.addEventListener('change', function() {
    saveFormToSessionStorage();
});

radioBtns.forEach(radio => {
    radio.addEventListener('change', function() {
        saveFormToSessionStorage();
    });
});

function saveFormToSessionStorage() {
    const formData = {
        surname: document.getElementById('surname').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        city: document.getElementById('city').value,
        bstu: document.getElementById('bstu').checked,
        about: document.getElementById('about').value
    };
    
    const selectedCourse = document.querySelector('input[name="course"]:checked');
    if (selectedCourse) {
        formData.course = selectedCourse.value;
    }
    
    sessionStorage.setItem('formData', JSON.stringify(formData));
    
    charCount.textContent = formData.about.length;
}

aboutTextarea.addEventListener('input', function() {
    charCount.textContent = this.value.length;
});

// Включение радио-кнопок только если отмечен чекбокс БГТУ
checkbox.addEventListener("change", function() {
    radioBtns.forEach((btn) => {
        btn.disabled = !this.checked;
    });
    
    // Если чекбокс снят, снимаем выбор с радио-кнопок
    if (!this.checked) {
        radioBtns.forEach(btn => btn.checked = false);
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
});

window.addEventListener('DOMContentLoaded', function() {
    loadFormFromSessionStorage();
});

function loadFormFromSessionStorage() {
    const savedData = sessionStorage.getItem('formData');
    
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            
            document.getElementById('surname').value = formData.surname || '';
            document.getElementById('name').value = formData.name || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('city').value = formData.city || '';
            document.getElementById('about').value = formData.about || '';
            
            document.getElementById('bstu').checked = formData.bstu || false;
            
            radioBtns.forEach(btn => {
                btn.disabled = !formData.bstu;
            });
            
            if (formData.course) {
                const courseRadio = document.querySelector(`input[name="course"][value="${formData.course}"]`);
                if (courseRadio) {
                    courseRadio.checked = true;
                }
            }
            
            charCount.textContent = formData.about ? formData.about.length : 0;
            
        } catch (error) {
            console.error('Ошибка при загрузке данных из sessionStorage:', error);

            sessionStorage.removeItem('formData');
        }
    }
}

function validateForm() {
    
    document.querySelectorAll('.error').forEach(errorElem => errorElem.textContent = '');
    
    let hasError = false;
    
    const surname = document.getElementById('surname').value.trim();
    const surnameRegex = /^[a-zA-Zа-яА-Я]+$/;
    
    if (!surname) {
        hasError = true;
        document.getElementById('surname_err').textContent = 'Поле не должно быть пустым!';
    } else if (surname.length > 20) {
        hasError = true;
        document.getElementById('surname_err').textContent = 'Поле не должно содержать более 20 символов!';
    } else if (!surnameRegex.test(surname)) {
        hasError = true;
        document.getElementById('surname_err').textContent = 'Поле должно содержать только буквы русского и английского алфавита';
    }
    
    const name = document.getElementById('name').value.trim();
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    
    if (!name) {
        hasError = true;
        document.getElementById('name_err').textContent = 'Поле не должно быть пустым!';
    } else if (name.length > 20) {
        hasError = true;
        document.getElementById('name_err').textContent = 'Поле не должно содержать более 20 символов!';
    } else if (!nameRegex.test(name)) {
        hasError = true;
        document.getElementById('name_err').textContent = 'Поле должно содержать только буквы русского и английского алфавита';
    }
    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[a-zA-Z]{2,5}\.[a-zA-Z]{2,3}$/;
    
    if (!email) {
        hasError = true;
        document.getElementById('email_err').textContent = 'Поле не должно быть пустым!';
    } else if (!emailRegex.test(email)) {
        hasError = true;
        document.getElementById('email_err').textContent = 'Недопустимый формат! Допустимый формат: xxx@xx.xxx';
    }
    
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;
    
    if (!phone) {
        hasError = true;
        document.getElementById('phone_err').textContent = 'Поле не должно быть пустым!';
    } else if (!phoneRegex.test(phone)) {
        hasError = true;
        document.getElementById('phone_err').textContent = 'Недопустимый формат! Должен быть (0xx)xxx-xx-xx';
    }
    
    const city = document.getElementById('city').value;
    
    if (!city) {
        hasError = true;
        document.getElementById('city_err').textContent = 'Выберите город!';
    }
    
    const isBstuStudent = checkbox.checked;
    const selectedCourse = document.querySelector('input[name="course"]:checked');
    
    if (isBstuStudent && !selectedCourse) {
        hasError = true;
        document.getElementById('course_err').textContent = 'Выберите курс обучения!';
    }
    
    const about = document.getElementById('about').value.trim();
    
    if (!about) {
        hasError = true;
        document.getElementById('about_err').textContent = 'Поле не должно быть пустым!';
    } else if (about.length > 250) {
        hasError = true;
        document.getElementById('about_err').textContent = 'Длина не может превышать 250 символов!';
    }
    
    if (hasError) {
        return;
    }
    
    const isCorrectCity = city === 'Минск';
    const isCorrectCourse = selectedCourse && selectedCourse.value === '3';
    const isCorrectConditions = isCorrectCity && isCorrectCourse && isBstuStudent;
    
    if (!isCorrectConditions) {
        let message = 'Вы уверены в выборе:\n';
        if (!isCorrectCity) message += '- Город: ' + city + ' ( Минск)\n';
        if (!isCorrectCourse) message += '- Курс: ' + (selectedCourse ? selectedCourse.value : 'не выбран') + ' ( 3)\n';
        if (!isBstuStudent) message += '- Статус: не студент БГТУ \n';
        message += '\nПродолжить отправку формы?';
        
        if (!confirm(message)) {
            return; 
        }
    }
    
    alert('Форма успешно отправлена!');
    
    sessionStorage.removeItem('formData');
    
    document.getElementById('registrationForm').reset();
    
    charCount.textContent = '0';
    
    radioBtns.forEach(btn => {
        btn.disabled = true;
        btn.checked = false;
    });
}