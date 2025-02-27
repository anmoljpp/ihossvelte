<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let password = ''; // Removed type declaration
  let confirmPassword = ''; // Removed type declaration
  let error = ''; // Removed type declaration
  let successMessage = ''; // Removed type declaration
  
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
  
  // Navigation button click handler
  const goToPreviousImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };
  
  const goToNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };
  
  onMount(() => {
    const interval = setInterval(changeImage, 3000);
    return () => clearInterval(interval);
  });

  // Handle password reset logic
  function handleResetPassword() {
    if (!password || !confirmPassword) {
      error = 'Please fill in both password fields!';
      return;
    }
  
    if (password !== confirmPassword) {
      error = 'Passwords do not match!';
      return;
    }
  
    // Simulate password reset (e.g., updating password in database)
    successMessage = 'Your password has been successfully reset!';
    error = ''; // Clear any previous errors
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
      bottom: 80px;
    }
  
    .success {
      color: #28a745;
      font-size: 1rem;
      text-align: center;
      position: absolute;
      bottom: 78px;
    }
  
    @keyframes shake {
      0% {
        transform: translateX(-10px);
      }
      25% {
        transform: translateX(10px);
      }
      50% {
        transform: translateX(-10px);
      }
      75% {
        transform: translateX(10px);
      }
      100% {
        transform: translateX(0);
      }
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
  
    .login-button {
      background-color: #748687; /* Main color */
      color: white;
      font-size: 1.2rem;
      padding: 12px 16px; /* Padding controls height */
      width: 180px; /* Set a specific width for the button */
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      margin-left: 100px;
      position: relative;
      top: 20px;
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
  
    .bottom-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      margin-top: 15px;
    }
  
    @media (max-width: 500px) {
      :global(.container) {
        padding: 20px;
        max-width: 90%;
      }
    }
  </style>
  
  <div class="container">
    <h1>Reset Your Password</h1>
  
    <form on:submit|preventDefault={handleResetPassword}>
      <label for="password">New Password:</label>
      <input type="password" id="password" bind:value={password} placeholder="Enter new password" />
  
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm your password" />
  
      <button type="submit" class="login-button" on:click={() => ('/hhome')}>Submit</button>
  
      {#if error}
        <div class="error">{error}</div>
      {/if}
  
      {#if successMessage}
        <div class="success">{successMessage}</div>
      {/if}
    </form>
  </div>
  
  <div class="slider">
    <img src="{images[currentIndex].src}" alt="{images[currentIndex].alt}" />
  </div>
  
  <div class="navigation-container">
    <button class="nav-button" on:click={goToPreviousImage}>{"<"}</button>
    <div class="navigation-dots">
      {#each images as _, index}
        <div class="dot {currentIndex === index ? 'active' : ''}" on:click={() => currentIndex = index}></div>
      {/each}
    </div>
    <button class="nav-button" on:click={goToNextImage}>{">"}</button>
  </div>
  