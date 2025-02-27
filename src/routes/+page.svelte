<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Image slider logic
  const images = [
    { src: "/logo/image1.jpg", alt: "Image 1", color: "" },
    { src: "/logo/image2.jpg", alt: "Image 2", color: "" },
    { src: "/logo/image3.jpg", alt: "Image 3", color: "" },
    { src: "/logo/image4.jpg", alt: "Image 4", color: "" },
  ];

  let currentIndex = 0; // Index to track the current image

  const changeImage = () => {
    currentIndex = (currentIndex + 1) % images.length; // Circular image change
  };

  onMount(() => {
    const interval = setInterval(changeImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  });


  function goToLoginPage() {
    goto('/login'); // Navigates to the login page
  }

  function navigateToImage(index: number) {
    currentIndex = index;
  }

  function navigateNext() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function navigatePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  // Signup form logic
  let name: string = '';
  let username: string = '';
  let password: string = '';
  let confirmpassword: string = '';
  let Email: string = '';
  let Country: string = '';
  let error: string = '';

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'India', 
    'Germany', 'France', 'Italy', 'Spain', 'Mexico', 'Japan', 'China',
    'Africa', 'Brazil', 'Russia', 'Egypt', 'South Korea', 'Singapore', 
    'Malaysia', 'Thailand', 'Nigeria', 'Argentina', 'Chile', 'Colombia',
    'Belgium', 'Denmark', 'Finland', 'Sweden', 'Norway'
  ];

  function handleSubmit(): void {
    if (!username || !password) {
      error = 'Please fill in all fields!';
      return;
    }

    window.location.href = './user-info.html'; // Redirect to the user info page
    username = '';
    password = '';                                                                          
    error = '';
  }

  function handleSocialLogin(provider: string): void {
    alert(`You are logging in with ${provider}`);
  }
</script>

<style>
  /* Global body styles */
  :global(body) {
    font-family: 'Arial', sans-serif;
    background: url('/logo/background.jpg') no-repeat center center, 
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

  .container {
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

  /* Image Slider styles (no change here) */
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute; /* Keep the original position for the slider */
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
    width: 1px;
  }

  .nav-button {
    font-size: 1.5rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s ease;
    margin-bottom: 21px;
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

  /* Rest of the styles for the form */
  h1 {
    font-size: 2.2rem;
    color: #304841;
    margin-bottom: 30px;
    font-weight: 700;
  }

  .error {
    color: #ff4747;
    font-size: 1rem;
    margin-bottom: 20px;
    animation: shake 0.5s ease-in-out;
  }

  /* Animation for error shaking */
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

  button {
    padding: 14px;
    background-color: #4c58c7;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    margin-top: 21px;
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  button:hover {
    background-color: #3551a3;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: scale(1);
    box-shadow: none;
  }

  #country {
    font-weight: lighter;
    font-size: 1.1rem;
    margin-bottom: 10px;
    display: block;
    color: #333;
    padding: 14px;
    border: 1px solid rgb(219, 198, 198);
    border-radius: 10px;
    background-color: white;
  }

  .social-login {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
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

  /* Styles for the login link */
  .login-link {
    display: block;
    margin-top: 20px;
    font-size: 1rem;
    color: #4c58c7;
    text-decoration: none;
  }

  .login-text {
    text-decoration: none; /* Prevent underline on the "Log in" text by default */
  }

  .login-text:hover {
    text-decoration: underline; /* Underline only when hovering over "Log in" */
  }







.parent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 8px;
}
    
.div3 {
    grid-column: span 5 / span 5;
    grid-row: span 4 / span 4;
    /* padding: 1000px 100px 100px 100px; */
}

.div4 {
    grid-column-start: 3;
    grid-row-start: 5;
}
#img {
  width: 500px;
    height: 70px;
    padding-left: 20%;
    /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1); */
}
        
</style>

<!-- Image Slider -->
<!-- <div class="slider">
  <img src="{images[currentIndex].src}" alt="{images[currentIndex].alt}" />
  
    
    <a href="#" class="login-link">Already have an account? <span class="login-text">Log in</span></a>
  </div> -->


  <!-- </div> -->

<!-- Signup Form -->
<!-- <div class="container">
  <h1>Signup to Innovate</h1>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} placeholder="Enter your name" />

    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} placeholder="Enter your username" />

    <label for="Email">Email:</label>
    <input type="text" id="Email" bind:value={Email} placeholder="Enter your Email" />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} placeholder="Enter your password" />

    <label for="Confirmpassword">Confirm Password:</label>
    <input type="password" id="confirmpassword" bind:value={confirmpassword} placeholder="Confirm your password" />

    <label for="country">Country:</label>
    <select id="country" bind:value={Country}>
      <option value="" disabled selected>Select your country</option>
      {#each countries as countryOption}
        <option value={countryOption}>{countryOption}</option>
      {/each}
    </select>

    <button type="submit" disabled={!username || !password}>Sign up</button>
  </form>

  <div class="social-login">
    <img src="/logo/google_logo.png" alt="Google Logo" on:click="{() => handleSocialLogin('Google')}" />
    <img src="/logo/apple_logo.png" alt="Apple Logo" on:click="{() => handleSocialLogin('Apple')}" />
  </div> -->



<div class="parent">
  <div class="div3">
    <!-- <div class="slider">   -->
      <img class="img" src="{images[currentIndex].src}" alt="{images[currentIndex].alt}" />
    </div>
  <!-- </div> -->

<div class="div4">
  <a href="/signup" class="login-link">Signup To Explore <span class="login-text">Explore</span></a>
</div>
</div>
