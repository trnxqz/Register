document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const user = getUserInput();

        const validationError = validateUserInput(user);
        if (validationError) {
            alert(validationError);
            return;
        }

        const users = getUsersFromStorage();

        if (isEmailRegistered(users, user.email)) {
            alert('Emailul este deja înregistrat!');
            return;
        }

        users.push(user);
        saveUsersToStorage(users);

        alert('Cont creat cu succes!');
        form.reset();
        window.location.href = 'login.html';
    });

    function getUserInput() {
        return {
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value
        };
    }

    function validateUserInput(user) {
        if (!user.firstName || !user.lastName || !user.phone || !user.email || !user.password || !user.confirmPassword) {
            return 'Toate câmpurile sunt obligatorii!';
        }

        if (!validateEmailFormat(user.email)) {
            return 'Formatul emailului este incorect!';
        }

        if (!validatePhoneNumber(user.phone)) {
            return 'Numărul de telefon trebuie să conțină doar cifre și să aibă cel puțin 8 caractere!';
        }

        if (user.password !== user.confirmPassword) {
            return 'Parolele nu coincid!';
        }

        if (user.password.length < 6) {
            return 'Parola trebuie să aibă cel puțin 6 caractere!';
        }

        return null;
    }

    function validateEmailFormat(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function validatePhoneNumber(phone) {
        const pattern = /^[0-9]{8,}$/;
        return pattern.test(phone);
    }

    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function saveUsersToStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function isEmailRegistered(users, email) {
        return users.some(user => user.email === email);
    }
});
