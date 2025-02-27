<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  
  
  let usernameOrEmail = '';
  let password = '';
  let error = '';
  let isPasswordIncorrect = false;

  const images = [
    { src: "/logo/image1.jpg", alt: "", color: "" },
    { src: "/logo/image2.jpg", alt: "", color: "" },
    { src: "/logo/image3.jpg", alt: "", color: "" },
    { src: "/logo/image4.jpg", alt: "", color: "" },
  ];

  let currentIndex = 0;

  const changeImage = () => {
    currentIndex = (currentIndex + 1) % images.length;  
  };

  onMount(() => {
    const interval = setInterval(changeImage, 3000);
    return () => clearInterval(interval);
  });

  function goToforgotPage() {
    goto('/forgotpassword');
  }
  
//   function goToHomePage() {
//   goto('/hhome');
//   setTimeout(() => {
//     location.reload();
//   }, 100); 
// }

// function goToHomePage() {
//   goto('/hhome', { invalidateAll: true });
//   document.body.style.opacity = "0";
//   setTimeout(() => {
//     location.href = "/hhome"; // Full reload after navigation
//   }, 100); 

// }
    
function goToHomePage() {
  document.body.style.display = "none"; // Instantly hide current page
  location.href = "/hhome"; // Navigate and reload immediately
}




  function goTOFloor() {
    goto('/floor');
  }

  function handleLogin() {
    if (!usernameOrEmail || !password) {
      error = ''; 
      return;
    }

    if (password !== 'correctPassword') {
      isPasswordIncorrect = true;
      error = 'Incorrect password!';
      return;
    }

    error = '';
    isPasswordIncorrect = false;
    window.location.href = './dashboard.html';
  }

  function handleSocialLogin(provider) {
    alert(`You are logging in with ${provider}`);
  }

  function navigateToImage(index) {
    currentIndex = index;
  }

  function navigateNext() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function navigatePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
</script>

  
  <style>
    :global(body) {
      font-family: 'Arial', sans-serif;
      background: url('/logo/background.jpg') no-repeat center center fixed, 
                  linear-gradient(135deg, #205c94, #ff6347);
      background-size: cover;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
  
      height: 100vh;
      color: #fff;
      position: relative;
    }
  
   

    .slider {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: absolute;
      left: 220px;
    }
  
    .slider img {
      width: 722px;
      height: 543px;
      object-fit: cover;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .navigation-container {
      position: relative;
      top: 314px;
      left: -345px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .nav-button {
      font-size: 1.5rem;
      color: white;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      transition: background-color 0.3s ease;
    }
  
    .nav-button:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  
    .navigation-dots {
      display: flex;
      justify-content: center;
      margin: 0 10px;
    }
  
    .dot {
      height: 12px;
      width: 12px;
      margin: 0 5px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .dot.active {
      background-color: white;
    }
  
    .dot:hover {
      background-color: #4c58c7;
    }
  
    :global(.container) {
      background-color: rgba(255, 255, 255, 0.85);
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      width: 100%;
      max-width: 380px;
      text-align: center;
      animation: fadeIn 1s ease-out;
      position: absolute;
      right: 247px;
    }
  
    h1 {
      font-size: 2.2rem;
      color: #304841;
      margin-bottom: 30px;
      font-weight: 700;
    }
  
    .error {
      color: #ff4747;
      font-size: 1rem;
      animation: shake 0.5s ease-in-out;
      text-align: right;
      margin-right: 10px;
      position: absolute;
      left: 50px;
      bottom: 130px;
    }
  
    @keyframes shake {
      0% { transform: translateX(-10px); }
      25% { transform: translateX(10px); }
      50% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
      100% { transform: translateX(0); }
    }
  
    form {
      display: flex;
      flex-direction: column;
    }
  
    label {
      text-align: left;
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 1rem;
      color: #555;
    }
  
    input {
      padding: 14px;
      font-size: 1rem;
      color: #8e8e8e;
      margin-bottom: 18px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #f5f5f5;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }
  
    input:focus {
      border-color: #4c58c7;
      box-shadow: 0 0 5px rgba(76, 88, 199, 0.5);
      outline: none;
      background-color: #ffffff;
    }
  
    .social-login {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      gap: 10px;
      margin-bottom: 18px;
    }
  
    .social-login img {
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
  
    .social-login img:hover {
      transform: scale(1.1);
    }
  
    .forgot-password {
      color: #4c58c7;
      text-decoration: none;
      font-size: 1rem;
      position: relative;
      top: 5px;
      display: block;
      text-align: right;
    }
  
    .forgot-password:hover {
      text-decoration: underline;
    }
  
    .bottom-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      margin-top: 15px;
    }
  
    .login-button {
      background-color: #748687; /* Main color */
      color: white;
      font-size: 1.2rem;
      padding: 12px 16px; /* Reduced the left and right padding (16px) */
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      width: auto; /* Keep the width based on content */
    }
  
    .login-button:hover {
      background-color: #304841; /* Darker shade on hover */
      transform: scale(1.05); /* Slightly enlarge the button when hovered */
    }
  
    .login-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none; /* Remove scale effect on disabled button */
    }
  
    @media (max-width: 500px) {
      :global(.container) {
        padding: 20px;
        max-width: 90%;
      }
    }
  
    /* New styles for "Sign Up" hover effect */
    .login-link {
      color: #4c58c7;
      text-decoration: none;
      font-size: 1rem;
    }
  
    .sign-up {
      text-decoration: none;
      transition: text-decoration 0.3s ease;
    }
  
    .sign-up:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="slider">
    <img src="{images[currentIndex].src}" alt="{images[currentIndex].alt}" />
  </div>
  
  <div class="navigation-container">
    <button class="nav-button" on:click={navigatePrev}>{"<"}</button>
    <div class="navigation-dots">
      {#each images as _, index}
        <div class="dot {currentIndex === index ? 'active' : ''}" on:click={() => navigateToImage(index)}></div>
      {/each}
    </div>
    <button class="nav-button" on:click={navigateNext}>{">"}</button>
  </div>
  
  <div class="container">
    <h1>Log in</h1>
  
    <form on:submit|preventDefault={handleLogin}>
      <label for="usernameOrEmail">Username or Email:</label>
      <input type="text" id="usernameOrEmail" bind:value={usernameOrEmail} placeholder="Enter your username or email" />
  
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} placeholder="Enter your password" />
  
      <button type="submit" class="login-button" on:click={goToHomePage}>Log in</button> <!-- Button always visible, disabled when fields are empty -->
  
      <div class="bottom-links">
        {#if isPasswordIncorrect}
          <div class="error">{error}</div>
        {/if}
        <a href="/forgotpassword" on:click={goToforgotPage} class="forgot-password">Forgot Password?</a>
      </div>
    </form>
  
    <div class="social-login">
      <img src="/logo/google_logo.png" alt="Google Logo" id="class22" on:click="{() => handleSocialLogin('Google')}"/>
      <img src="/logo/apple_logo.png" alt="Apple Logo" on:click="{() => handleSocialLogin('Apple')}"/>
    </div>
  
    <!-- Updated "Don't have an account?" link with the "Sign Up" part in a span -->
    <a href="./signup.html" class="login-link">Don't have an account? <span class="sign-up">Sign up</span></a>
  </div>
  