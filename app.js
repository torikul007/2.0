const API_URL = "https://script.google.com/macros/s/AKfycbxKd1U_Kw0sLtygol3b3VrngzyR47URCQKwgB1K182FIJn_d82EN3UUYWmyRghv6cQ/exec";

// 🔹 LOGIN (send data)
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
      body: new URLSearchParams({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    document.getElementById("msg").innerText =
      data.status === "success"
        ? "Saved successfully ✔"
        : "Something went wrong ❌";

  } catch (err) {
    console.error(err);
    document.getElementById("msg").innerText = "Server error ❌";
  }
}


// 🔹 LOAD MESSAGE (GET request)
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const msgBox = document.getElementById("msg");

    if (data.message && msgBox.innerText !== data.message) {
      msgBox.innerText = data.message;
    }

  } catch (err) {
    console.log("Message fetch error");
  }
}


// 🔹 START LOOP
window.onload = () => {
  loadMessage();
  setInterval(loadMessage, 1500);
};
