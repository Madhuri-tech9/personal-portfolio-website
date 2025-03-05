document.addEventListener("DOMContentLoaded", function () {
    // Navbar toggle functionality
    let menuIcon = document.getElementById('menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        // Toggle the menu visibility and icon when clicked
        menuIcon.addEventListener('click', function () {
            navbar.classList.toggle('active'); 
            menuIcon.classList.toggle('bx-x'); 
        });
    }

    // Animated Text: Removing the cursor after the animation ends
    let animatedText = document.querySelector(".animated-text");
    if (animatedText) {
        animatedText.addEventListener("animationend", function () {
            animatedText.style.borderRight = "none"; 
        });
    }

    // Smooth Scrolling for anchor links in the navbar
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Scroll to the target section smoothly
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile navbar after a link is clicked
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });

    // Active Navigation Link Highlighting
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            
    // Highlight the active link based on the current section in view
            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    });

    // Modal Functionality for open/close actions
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    // Open modal when button is clicked
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block'; 
            }
        });
    });

    // Close modal when close button is clicked
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none'; 
            }
        });
    });
});

     // Contact Form Validation
    let contactForm = document.getElementById('contact-form');
    if (contactForm) {
         let nameInput = document.getElementById('name');
         let emailInput = document.getElementById('email');
         let mobileInput = document.getElementById('mobile');
         let subjectInput = document.getElementById('subject');
         let messageInput = document.getElementById('message');

    // Function to create and display error messages
    function createErrorMessage(inputElement, message) {
        let errorMessage = document.createElement('span');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.display = 'none';
        errorMessage.textContent = message;
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
        return errorMessage;
    }

    // Create error messages for all input fields
      let nameError = createErrorMessage(nameInput, 'Name should be at least 3 characters long.');
      let emailError = createErrorMessage(emailInput, 'Please enter a valid email address.');
      let mobileError = createErrorMessage(mobileInput, 'Enter a valid 10-digit mobile number (numbers only).');
      let subjectError = createErrorMessage(subjectInput, 'Subject is required.');
      let messageError = createErrorMessage(messageInput, 'Message must be at least 2 characters long.');

    // Full Name Validation
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim().length < 3) {
            nameError.style.display = 'block';
        } else {
            nameError.style.display = 'none';
        }
    });

    // Email Validation
    emailInput.addEventListener('input', function () {
        if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });

    // Mobile Number Validation (Numbers only)
    mobileInput.addEventListener('input', function () {
        let value = this.value;
        if (/[^0-9]/.test(value) || value.length > 10) {
            this.value = value.replace(/[^0-9]/g, '').slice(0, 10);
            mobileError.style.display = 'block';
            mobileError.textContent = 'Enter a valid 10-digit mobile number (numbers only).';
        } else if (this.value.length !== 10) {
            mobileError.style.display = 'block';
            mobileError.textContent = 'Mobile number must be exactly 10 digits.';
        } else {
            mobileError.style.display = 'none';
        }
    });

    // Subject Validation
    subjectInput.addEventListener('input', function () {
        if (subjectInput.value.trim() === '') {
            subjectError.style.display = 'block';
        } else {
            subjectError.style.display = 'none';
        }
    });

    // Message Validation
    messageInput.addEventListener('input', function () {
        if (messageInput.value.trim().length < 2) {
            messageError.style.display = 'block';
        } else {
            messageError.style.display = 'none';
        }
    });

    // Form Submission Validation
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

    // Trigger input validation manually before submission
        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        mobileInput.dispatchEvent(new Event('input'));
        subjectInput.dispatchEvent(new Event('input'));
        messageInput.dispatchEvent(new Event('input'));

        // Check all fields before submission
        if (
            nameInput.value.trim().length < 3 ||
            !/^\S+@\S+\.\S+$/.test(emailInput.value.trim()) ||
            mobileInput.value.trim().length !== 10 ||
            subjectInput.value.trim() === '' ||
            messageInput.value.trim().length < 2
        ) {
            alert('Please fix the errors in the form.');
            return false;
        }

        alert('Message sent successfully!');
        contactForm.reset();
        
        // Hide all error messages after successful submission
        [nameError, emailError, mobileError, subjectError, messageError].forEach(error => {
            error.style.display = 'none';
        });
    });
}
