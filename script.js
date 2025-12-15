// -------------------- Page Navigation System --------------------
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  const selectedPage = document.getElementById(pageName + '-page');
  if (selectedPage) selectedPage.classList.remove('hidden');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) link.classList.add('active');
  });

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------- Hamburger Menu --------------------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// -------------------- Navigation Links --------------------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const page = this.dataset.page;
    if (page) showPage(page);
  });
});

// -------------------- Phone Validation --------------------
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });
  phoneInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(String.fromCharCode(e.which))) e.preventDefault();
  });
}

// -------------------- Stream Dropdown --------------------
const streamSelect = document.getElementById('stream');
const otherStreamField = document.getElementById('otherStreamField');
const otherStreamInput = document.getElementById('otherStream');
if (streamSelect && otherStreamField && otherStreamInput) {
  streamSelect.addEventListener('change', function() {
    if (this.value === 'others') {
      otherStreamField.style.display = 'block';
      otherStreamInput.required = true;
    } else {
      otherStreamField.style.display = 'none';
      otherStreamInput.required = false;
      otherStreamInput.value = '';
    }
  });
}

// -------------------- Drive Link Validation & Paste Button --------------------
const driveLinkInput = document.getElementById('driveLink');
const pasteBtn = document.getElementById('pasteBtn');

if (driveLinkInput) {
  driveLinkInput.addEventListener('blur', function() {
    const url = this.value.trim();
    if (url && !url.includes('drive.google.com')) {
      alert('Please enter a valid Google Drive link');
      this.focus();
    }
  });
}

// Paste Button Functionality
if (pasteBtn && driveLinkInput) {
  pasteBtn.addEventListener('click', async function() {
    try {
      const text = await navigator.clipboard.readText();
      driveLinkInput.value = text;
      driveLinkInput.focus();
      
      // Add visual feedback
      this.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white"/>
        </svg>
        Pasted!
      `;
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" fill="white"/>
          </svg>
          Paste
        `;
      }, 2000);
      
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      alert('Unable to paste. Please use Ctrl+V or Cmd+V to paste the link.');
    }
  });
}

// -------------------- Modal Handling --------------------
const submissionForm = document.getElementById('submissionForm');
const successModal = document.getElementById('successModal');

function closeModal() {
  if (successModal) successModal.style.display = 'none';
}

window.addEventListener('click', function(e) {
  if (e.target === successModal) closeModal();
});



 // Initialize EmailJS with your public key
  (function() {
      emailjs.init("Du6U4z3LkTawgYelQ"); // 🔹 Replace with your actual EmailJS public key
  })();

  // Handle form submission
  document.getElementById("submissionForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Collect form data
      const formData = {
          paperTitle: document.getElementById("paperTitle").value,
          authorName: document.getElementById("authorName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          totalAuthors: document.getElementById("totalAuthors").value,
          doi: document.getElementById("doi").value,
          stream: document.getElementById("stream").value,
          driveLink: document.getElementById("driveLink").value
      };

      // Send the email using EmailJS
      emailjs.send("service_hia8ruk", "template_x4cqazp", formData)
      .then(function(response) {
          console.log("SUCCESS!", response.status, response.text);

          // Show success modal
          document.getElementById("successModal").style.display = "flex";

          // Reset the form
          document.getElementById("submissionForm").reset();
      }, function(error) {
          console.error("FAILED...", error);
          alert("Failed to send submission. Please try again later.");
      });
  });

  // Function to close modal
  function closeModal() {
      document.getElementById("successModal").style.display = "none";
  }


