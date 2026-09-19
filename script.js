// @ts-nocheck
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BASIC HELPERS
  ========================= */

  const $ = (id) => document.getElementById(id);
  const all = (selector) => document.querySelectorAll(selector);

  let currentScene = 1;
  let dontClickCount = 0;
  let candleBlown = false;

  function showScene(number) {
    all(".scene").forEach((scene) => {
      scene.classList.remove("active");
    });

    const target = $("scene" + number);

    if (target) {
      target.classList.add("active");
      currentScene = number;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function burstHearts(amount = 12) {
    const container = $("floatingEffects");

    if (!container) return;

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent = Math.random() > 0.5 ? "💗" : "✨";

      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDelay = Math.random() * 0.6 + "s";
      heart.style.animationDuration = 3 + Math.random() * 2 + "s";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5500);
    }
  }

  function createConfetti(amount = 80) {
    const container = $("confettiContainer");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti-piece";
      piece.textContent = Math.random() > 0.6 ? "♥" : "";

      piece.style.left = Math.random() * 100 + "%";
      piece.style.animationDelay = Math.random() * 1.5 + "s";
      piece.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      piece.style.transform =
        "rotate(" + Math.random() * 360 + "deg)";

      container.appendChild(piece);
    }

    setTimeout(() => {
      container.innerHTML = "";
    }, 7000);
  }

  function sparkleBurst() {
    const container = $("fireworkContainer");

    if (!container) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 35; i++) {
      const spark = document.createElement("span");

      spark.className = "spark";

      const angle = (Math.PI * 2 * i) / 35;
      const distance = 80 + Math.random() * 120;

      spark.style.left = centerX + "px";
      spark.style.top = centerY + "px";
      spark.style.setProperty(
        "--x",
        Math.cos(angle) * distance + "px"
      );
      spark.style.setProperty(
        "--y",
        Math.sin(angle) * distance + "px"
      );

      container.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 1200);
    }
  }


  /* =========================
     BACKGROUND DECOR
  ========================= */

  function createBackgroundDecor() {
    const container = $("backgroundDecor");

    if (!container) return;

    const decorations = [
      "✦",
      "·",
      "♡",
      "✧",
      "⋆",
      "❀",
      "·",
      "✦"
    ];

    for (let i = 0; i < 25; i++) {
      const item = document.createElement("span");

      item.textContent =
        decorations[Math.floor(Math.random() * decorations.length)];

      item.className = "background-star";

      item.style.left = Math.random() * 100 + "%";
      item.style.top = Math.random() * 100 + "%";
      item.style.animationDelay =
        Math.random() * 5 + "s";

      container.appendChild(item);
    }
  }

  createBackgroundDecor();


  /* =========================
     SCENE 1
  ========================= */

  const startButton = $("startButton");

  if (startButton) {
    startButton.addEventListener("click", () => {
      burstHearts(10);
      showScene(2);
    });
  }


  /* =========================
     SCENE 2 — ENVELOPE
  ========================= */

  const envelope = $("envelope");
  const letterInside = $("letterInside");
  const envelopeHint = $("envelopeHint");
  const envelopeContinue = $("envelopeContinue");

  function openEnvelope() {
    if (!envelope) return;

    if (envelope.classList.contains("opened")) return;

    envelope.classList.add("opened");

    if (envelopeHint) {
      envelopeHint.textContent =
        "Ek chhoti si wish tumhare liye 💗";
    }

    setTimeout(() => {
      if (letterInside) {
        letterInside.classList.remove("hidden");
        letterInside.classList.add("show");
      }
    }, 650);

    setTimeout(() => {
      if (envelopeContinue) {
        envelopeContinue.classList.remove("hidden");
      }
    }, 1200);

    burstHearts(8);
  }

  if (envelope) {
    envelope.addEventListener("click", openEnvelope);

    envelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openEnvelope();
      }
    });
  }

  if (envelopeContinue) {
    envelopeContinue.addEventListener("click", () => {
      showScene(3);
      startWalkingAnimation();
    });
  }


  /* =========================
     SCENE 3 — WALKING SURPRISE
  ========================= */

  let walkingStarted = false;

  function startWalkingAnimation() {
    if (walkingStarted) return;

    walkingStarted = true;

    const character = $("walkingCharacter");
    const note = $("walkingNote");
    const message = $("walkingMessage");

    if (character) {
      character.classList.add("walking-active");
    }

    if (note) {
      setTimeout(() => {
        note.classList.add("note-arrive");
      }, 1300);
    }

    if (message) {
      setTimeout(() => {
        message.textContent =
          "Dekha? Surprise khud tum tak aa gaya. 🧸💌";
        message.classList.add("message-show");
      }, 2300);
    }
  }

  const scene3Continue = $("scene3Continue");

  if (scene3Continue) {
    scene3Continue.addEventListener("click", () => {
      showScene(4);
      burstHearts(8);
    });
  }


  /* =========================
     SCENE 4 — GIFTS
  ========================= */

  const giftButtons = all(".gift-card");
  const giftResult = $("giftResult");
  const giftsContinue = $("giftsContinue");

  const giftMessages = {
    wish: {
      icon: "🌷",
      text: "Dil se ek wish — tumhari har chhoti khushi bhi special lage. 💗"
    },

    smile: {
      icon: "😊",
      text: "Ek smile free mein mili hai... bas ise aise hi sambhal ke rakhna. ✨"
    },

    secret: {
      icon: "🤫",
      text: "Secret bas itna hai... kuch log bina zyada kuch kiye bhi din ko special bana dete hain. 💌"
    },

    special: {
      icon: "🎀",
      text: "Aur last gift? Tumhare liye bahut saari achhi wishes. 🌸"
    }
  };

  function showGiftPopup(type) {
    const popup = $("giftPopup");
    const icon = $("popupGiftIcon");
    const text = $("popupGiftText");

    const data = giftMessages[type];

    if (!popup || !data) return;

    if (icon) {
      icon.textContent = data.icon;
    }

    if (text) {
      text.textContent = data.text;
    }

    popup.classList.remove("hidden");
    popup.classList.add("show");

    burstHearts(6);
  }

  giftButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.gift;

      showGiftPopup(type);

      button.classList.add("gift-opened");

      setTimeout(() => {
        button.classList.remove("gift-opened");
      }, 700);

      if (giftResult) {
        giftResult.textContent =
          "Ek surprise mil gaya... 💗";
      }

      const opened =
        document.querySelectorAll(".gift-card.gift-used").length;

      if (!button.classList.contains("gift-used")) {
        button.classList.add("gift-used");
      }

      const totalOpened =
        document.querySelectorAll(".gift-card.gift-used").length;

      if (totalOpened >= 4 && giftsContinue) {
        giftsContinue.classList.remove("hidden");
      }
    });
  });


  /* =========================
     GIFT POPUP CLOSE
  ========================= */

  const closeGiftPopup = $("closeGiftPopup");
  const popupDone = $("popupDone");
  const giftPopup = $("giftPopup");

  function closePopup() {
    if (!giftPopup) return;

    giftPopup.classList.remove("show");

    setTimeout(() => {
      giftPopup.classList.add("hidden");
    }, 250);
  }

  if (closeGiftPopup) {
    closeGiftPopup.addEventListener("click", closePopup);
  }

  if (popupDone) {
    popupDone.addEventListener("click", closePopup);
  }

  if (giftPopup) {
    giftPopup.addEventListener("click", (event) => {
      if (event.target === giftPopup) {
        closePopup();
      }
    });
  }


  /* =========================
     GIFTS CONTINUE
  ========================= */

  if (giftsContinue) {
    giftsContinue.addEventListener("click", () => {
      showScene(5);

      dontClickCount = 0;

      if ($("clickCounter")) {
        $("clickCounter").textContent = "0 / 3";
      }

      if ($("dontClickMessage")) {
        $("dontClickMessage").textContent = "";
      }
    });
  }


  /* =========================
     SCENE 5 — DON'T CLICK
  ========================= */

  const dontClickButton = $("dontClickButton");
  const dontClickMessage = $("dontClickMessage");
  const clickCounter = $("clickCounter");

  const clickMessages = [
    "Maine kaha tha na... 👀",
    "Ek aur? Tum sach mein curious ho 😭",
    "Okay... ab asli surprise ke liye ready ho. 💗"
  ];

  if (dontClickButton) {
    dontClickButton.addEventListener("click", () => {

      if (dontClickCount >= 3) return;

      dontClickCount++;

      if (clickCounter) {
        clickCounter.textContent =
          dontClickCount + " / 3";
      }

      if (dontClickMessage) {
        dontClickMessage.textContent =
          clickMessages[dontClickCount - 1];
      }

      dontClickButton.classList.remove("shake-button");

      void dontClickButton.offsetWidth;

      dontClickButton.classList.add("shake-button");

      burstHearts(4);

      if (dontClickCount === 3) {
        dontClickButton.disabled = true;
        dontClickButton.textContent =
          "Okay... surprise! ✨";

        setTimeout(() => {
          showCountdown();
        }, 900);
      }
    });
  }


  /* =========================
     SCENE 6 — COUNTDOWN
  ========================= */

  function showCountdown() {
    showScene(6);

    const number = $("countdownNumber");
    const message = $("countdownMessage");

    if (!number) return;

    const sequence = [
      {
        number: "3",
        text: "Bas thoda sa wait... 💗"
      },
      {
        number: "2",
        text: "Almost there... ✨"
      },
      {
        number: "1",
        text: "Ready? 🎀"
      }
    ];

    let index = 0;

    function nextNumber() {
      if (index >= sequence.length) {
        setTimeout(() => {
          showBirthdayReveal();
        }, 500);

        return;
      }

      number.classList.remove("countdown-pop");

      void number.offsetWidth;

      number.textContent =
        sequence[index].number;

      number.classList.add("countdown-pop");

      if (message) {
        message.textContent =
          sequence[index].text;
      }

      index++;

      setTimeout(nextNumber, 900);
    }

    nextNumber();
  }


  /* =========================
     SCENE 7 — BIRTHDAY REVEAL
  ========================= */

  function showBirthdayReveal() {
    showScene(7);

    createConfetti(100);
    sparkleBurst();
    burstHearts(20);

    const title = document.querySelector(".birthday-title");

    if (title) {
      title.classList.add("birthday-pop");
    }
  }

  const birthdayContinue = $("birthdayContinue");

  if (birthdayContinue) {
    birthdayContinue.addEventListener("click", () => {
      showScene(8);
      burstHearts(8);
    });
  }


  /* =========================
     SCENE 8 — FINAL LETTER
  ========================= */

  const letterContinue = $("letterContinue");

  if (letterContinue) {
    letterContinue.addEventListener("click", () => {
      showScene(9);

      candleBlown = false;

      if ($("candleMessage")) {
        $("candleMessage").textContent =
          "Candle ko tap karo 🕯️";
      }

      if ($("cakeContinue")) {
        $("cakeContinue").classList.add("hidden");
      }

      const candle = $("candle");

      if (candle) {
        candle.classList.remove("blown");
      }
    });
  }


  /* =========================
     SCENE 9 — CAKE
  ========================= */

  const candle = $("candle");
  const candleMessage = $("candleMessage");
  const cakeContinue = $("cakeContinue");

  function blowCandle() {
    if (candleBlown) return;

    candleBlown = true;

    if (candle) {
      candle.classList.add("blown");
    }

    if (candleMessage) {
      candleMessage.textContent =
        "Wish complete... ✨💗";
    }

    if (cakeContinue) {
      setTimeout(() => {
        cakeContinue.classList.remove("hidden");
      }, 700);
    }

    burstHearts(12);
    sparkleBurst();
  }

  if (candle) {
    candle.addEventListener("click", blowCandle);

    candle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        blowCandle();
      }
    });
  }

  if (cakeContinue) {
    cakeContinue.addEventListener("click", () => {
      showScene(10);

      createConfetti(90);
      sparkleBurst();
      burstHearts(18);
    });
  }


  /* =========================
     SCENE 10 — RESTART
  ========================= */

  const restartButton = $("restartButton");

  if (restartButton) {
    restartButton.addEventListener("click", () => {

      currentScene = 1;
      dontClickCount = 0;
      candleBlown = false;
      walkingStarted = false;

      all(".scene").forEach((scene) => {
        scene.classList.remove("active");
      });

      $("scene1").classList.add("active");

      if ($("envelope")) {
        $("envelope").classList.remove("opened");
      }

      if ($("letterInside")) {
        $("letterInside").classList.remove("show");
        $("letterInside").classList.add("hidden");
      }

      if ($("envelopeContinue")) {
        $("envelopeContinue").classList.add("hidden");
      }

      if ($("dontClickButton")) {
        $("dontClickButton").disabled = false;
        $("dontClickButton").textContent =
          "Don't click me 👀";
      }

      if ($("clickCounter")) {
        $("clickCounter").textContent = "0 / 3";
      }

      if ($("dontClickMessage")) {
        $("dontClickMessage").textContent = "";
      }

      if ($("giftResult")) {
        $("giftResult").textContent = "";
      }

      all(".gift-card").forEach((card) => {
        card.classList.remove("gift-used");
      });

      if ($("giftsContinue")) {
        $("giftsContinue").classList.add("hidden");
      }

      if ($("candle")) {
        $("candle").classList.remove("blown");
      }

      if ($("cakeContinue")) {
        $("cakeContinue").classList.add("hidden");
      }

      if ($("candleMessage")) {
        $("candleMessage").textContent =
          "Candle ko tap karo 🕯️";
      }

      if ($("birthdayConfetti")) {
        $("birthdayConfetti").innerHTML = "";
      }

      if ($("confettiContainer")) {
        $("confettiContainer").innerHTML = "";
      }

      burstHearts(10);
    });
  }


  /* =========================
     ESC KEY SUPPORT
  ========================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });


  /* =========================
     TOUCH FEEDBACK
  ========================= */

  all("button, .envelope").forEach((element) => {

    element.addEventListener(
      "touchstart",
      () => {
        element.classList.add("touching");
      },
      { passive: true }
    );

    element.addEventListener(
      "touchend",
      () => {
        setTimeout(() => {
          element.classList.remove("touching");
        }, 120);
      },
      { passive: true }
    );
  });


  /* =========================
     STARTUP
  ========================= */

  showScene(1);

  setTimeout(() => {
    burstHearts(5);
  }, 700);

});
