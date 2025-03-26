  // GANTI DENGAN NOMOR WHATSAPP ANDA (format: 6281234567890)
  const YOUR_WHATSAPP_NUMBER = "6283188681324";
  let userResponse = null;

  // Fungsi untuk memilih respons (Ya/Tidak)
  function chooseResponse(accepted) {
      userResponse = accepted;
      showVisualResponse(accepted);
  }

  // Fungsi untuk mengirim pesan ke WhatsApp
  function sendToWhatsApp() {
      let message = userResponse === true ?
          "Ya, aku mau, mari kita mulai dengan bismillah" :
          "Aku butuh waktu untuk memikirkannya, tapi aku menghargai perasaanmu";

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

      // Update tampilan tombol
      const button = document.getElementById(userResponse ? 'whatsappButtonYa' : 'whatsappButtonTidak');
      button.innerHTML = userResponse ?
          '<i class="fas fa-heart"></i> Pesan Terkirim!' :
          '<i class="fas fa-clock"></i> Pesan Terkirim!';
      button.style.background = 'linear-gradient(to right, #4CAF50, #2E7D32)';

      // Reset tombol setelah 3 detik
      setTimeout(() => {
          button.innerHTML = userResponse ?
              '<i class="fab fa-whatsapp"></i> Kirim Pesan Cintaku' :
              '<i class="fab fa-whatsapp"></i> Kirim Pesan Harapanku';
          button.style.background = 'linear-gradient(to right, #25D366, #128C7E)';
      }, 3000);
  }

  // Create stars
  function createStars() {
      for (let i = 0; i < 50; i++) {
          let star = document.createElement("div");
          star.classList.add("star");
          star.style.width = `${Math.random() * 4 + 2}px`;
          star.style.height = star.style.width;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.top = `${Math.random() * 100}vh`;
          star.style.animationDelay = `${Math.random() * 2}s`;
          document.body.appendChild(star);
      }
  }

  // Create falling petals
  function createPetals() {
      for (let i = 0; i < 15; i++) {
          let petal = document.createElement("div");
          petal.classList.add("petal");
          petal.style.left = `${Math.random() * 100}vw`;
          petal.style.top = `${Math.random() * -100}px`;
          petal.style.opacity = Math.random() * 0.5 + 0.3;
          petal.style.width = `${Math.random() * 20 + 10}px`;
          petal.style.height = petal.style.width;
          petal.style.animationDuration = `${Math.random() * 10 + 5}s`;
          petal.style.animationDelay = `${Math.random() * 5}s`;
          document.body.appendChild(petal);
      }
  }

  // Create floating hearts
  function createFloatingHearts() {
      for (let i = 0; i < 30; i++) {
          let heart = document.createElement("div");
          heart.classList.add("heart");
          heart.textContent = "❤️";
          document.body.appendChild(heart);
          let x = Math.random() * window.innerWidth;
          let y = window.innerHeight;
          heart.style.left = `${x}px`;
          heart.style.top = `${y}px`;
          heart.style.animationDuration = `${Math.random() * 4 + 2}s`;
          setTimeout(() => {
              heart.style.transition = "opacity 1s";
              heart.style.opacity = "0";
              setTimeout(() => heart.remove(), 1000);
          }, 1000);
      }
  }

  // Show current step and hide others
  function nextStep(currentStep) {
      document.getElementById(`step${currentStep}`).classList.add("hidden");
      document.getElementById(`step${currentStep+1}`).classList.remove("hidden");

      // Animate messages
      const messages = document.querySelectorAll(`#step${currentStep+1} .confession, #step${currentStep+1} .message`);
      messages.forEach((msg, index) => {
          setTimeout(() => {
              msg.style.opacity = "1";
              msg.style.transform = "translateY(0)";
          }, index * 500);
      });

      // Add hearts on important steps
      if (currentStep >= 2) {
          createFloatingHearts();
      }
  }

  // Show response buttons
  function showResponseButtons() {
      document.getElementById("responseButtons").style.display = "flex";
      document.getElementById("showResponseBtn").style.display = "none";
      createFloatingHearts();
  }

  // Show visual response
  function showVisualResponse(accepted) {
      document.getElementById("step4").classList.add("hidden");

      if (accepted) {
          document.getElementById("positiveResponse").classList.remove("hidden");
          // Create celebration hearts
          for (let i = 0; i < 50; i++) {
              setTimeout(() => createFloatingHearts(), i * 100);
          }
      } else {
          document.getElementById("neutralResponse").classList.remove("hidden");
      }

      // Animate response messages
      const responses = document.querySelectorAll(`#${accepted ? 'positive' : 'neutral'}Response .confession`);
      responses.forEach((msg, index) => {
          setTimeout(() => {
              msg.style.opacity = "1";
              msg.style.transform = "translateY(0)";
          }, index * 800);
      });
  }

  // Initialize
  window.onload = function() {
      createStars();
      createPetals();

      // Tambahkan event listener untuk tombol WhatsApp
      document.getElementById('whatsappButtonYa').addEventListener('click', sendToWhatsApp);
      document.getElementById('whatsappButtonTidak').addEventListener('click', sendToWhatsApp);

      // Show first message
      setTimeout(() => {
          document.getElementById("greetingMessage").style.opacity = "1";
      }, 1000);
  };