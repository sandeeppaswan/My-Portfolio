const menuIcon = document.querySelector('#menu-icon');
const navLink = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLink.classList.toggle('active');
 }

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://web3forms.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Success! Your message has been sent to Sandeep.");
            contactForm.reset();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error(error);
        alert("Blocked by browser/ad-blocker or offline. Try disabling ad-blockers or hosting on GitHub Pages!");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
