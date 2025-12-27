// WordPress Password Hash Generator
// Uses bcrypt.js for WordPress-compatible password hashing

// Fix bcrypt reference - the CDN exposes it as dcodeIO.bcrypt
if (typeof dcodeIO !== 'undefined' && typeof dcodeIO.bcrypt !== 'undefined') {
    window.bcrypt = dcodeIO.bcrypt;
}

// Utility Functions
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy to clipboard');
    });
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (!password) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Enter a password to check strength';
        strengthText.style.color = 'var(--text-muted)';
        return;
    }

    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;

    // Character variety checks
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

    // Update strength bar
    strengthBar.style.width = strength + '%';

    // Set color and text based on strength
    if (strength < 40) {
        strengthBar.style.background = 'var(--danger)';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = 'var(--danger)';
    } else if (strength < 70) {
        strengthBar.style.background = 'var(--warning)';
        strengthText.textContent = 'Medium password';
        strengthText.style.color = 'var(--warning)';
    } else {
        strengthBar.style.background = 'var(--success)';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = 'var(--success)';
    }
}

// WordPress Password Hashing (using bcrypt)
function generateWordPressHash(password) {
    // WordPress uses bcrypt with cost factor 10
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

// Toggle Password Visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('.iconify');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.setAttribute('data-icon', 'mdi:eye-off');
    } else {
        passwordInput.type = 'password';
        icon.setAttribute('data-icon', 'mdi:eye');
    }
});

// Password strength checker and auto-generate hash on input
let hashDebounceTimer;
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    checkPasswordStrength(password);

    // Auto-generate hash with debounce (wait 500ms after user stops typing)
    clearTimeout(hashDebounceTimer);
    if (password) {
        hashDebounceTimer = setTimeout(() => {
            const hash = generateWordPressHash(password);
            document.getElementById('hashOutput').textContent = hash;
            document.getElementById('hashResult').style.display = 'block';
        }, 500);
    } else {
        document.getElementById('hashResult').style.display = 'none';
    }
});

// Generate Hash
document.getElementById('generateHash').addEventListener('click', function () {
    const password = document.getElementById('password').value;

    if (!password) {
        showToast('Please enter a password');
        return;
    }

    const hash = generateWordPressHash(password);
    document.getElementById('hashOutput').textContent = hash;
    document.getElementById('hashResult').style.display = 'block';

    // Smooth scroll to result
    document.getElementById('hashResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Generate SQL Query
document.getElementById('generateSQL').addEventListener('click', function () {
    const username = document.getElementById('sqlUsername').value;
    const password = document.getElementById('sqlPassword').value;
    const tablePrefix = document.getElementById('tablePrefix').value || 'wp_';

    if (!username || !password) {
        showToast('Please enter username and password');
        return;
    }

    const hash = generateWordPressHash(password);
    const sqlQuery = `UPDATE ${tablePrefix}users 
SET user_pass = '${hash}' 
WHERE user_login = '${username}';`;

    document.getElementById('sqlOutput').textContent = sqlQuery;
    document.getElementById('sqlResult').style.display = 'block';

    document.getElementById('sqlResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Generate PHP Script
document.getElementById('generateScript').addEventListener('click', function () {
    const userId = document.getElementById('scriptUserId').value;
    const password = document.getElementById('scriptPassword').value;

    if (!password) {
        showToast('Please enter a password');
        return;
    }

    const phpScript = `<?php
require_once('wp-load.php');

// Reset password for user ID ${userId}
$user_id = ${userId};
$new_password = '${password}';

wp_set_password($new_password, $user_id);

echo "✅ Password successfully updated!<br>";
echo "User ID: " . $user_id . "<br>";
echo "New Password: " . $new_password . "<br><br>";
echo "<strong style='color: red;'>⚠️ DELETE THIS FILE IMMEDIATELY!</strong>";
?>`;

    document.getElementById('scriptOutput').textContent = phpScript;
    document.getElementById('scriptResult').style.display = 'block';

    document.getElementById('scriptResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Secure Password Generator
function generateSecurePassword(length, options) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (options.uppercase) charset += uppercase;
    if (options.lowercase) charset += lowercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    if (!charset) {
        showToast('Please select at least one character type');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

// Password Length Slider
document.getElementById('passwordLength').addEventListener('input', function () {
    document.getElementById('lengthValue').textContent = this.value;
});

// Generate Password Button
document.getElementById('generatePassword').addEventListener('click', function () {
    const length = parseInt(document.getElementById('passwordLength').value);
    const options = {
        uppercase: document.getElementById('includeUppercase').checked,
        lowercase: document.getElementById('includeLowercase').checked,
        numbers: document.getElementById('includeNumbers').checked,
        symbols: document.getElementById('includeSymbols').checked
    };

    const password = generateSecurePassword(length, options);

    if (password) {
        document.getElementById('generatedPassword').textContent = password;
        document.getElementById('passwordResult').style.display = 'block';

        document.getElementById('passwordResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// Copy Buttons
document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const text = targetElement.textContent;
        copyToClipboard(text);
    });
});

// Smooth Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for Nav Active State
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.querySelector('.card').id || entry.target.id;

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.iconify');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.setAttribute('data-icon', 'mdi:weather-night');
}

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
        themeIcon.setAttribute('data-icon', 'mdi:weather-night');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.setAttribute('data-icon', 'mdi:weather-sunny');
        localStorage.setItem('theme', 'dark');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    console.log('WordPress Password Hash Generator loaded successfully!');
    console.log('All password hashing is done client-side. Your passwords never leave your device.');
});
