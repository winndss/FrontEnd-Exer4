function showLogin() {
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
  }
  
  function showRegister() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
  }
  
  function register(event) {
    event.preventDefault();
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
  
    alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
    //data ke backend
  }
  
  function login(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    alert(`Login successful!\nEmail: ${email}`);
    //auth ke backend
  }