<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Image slider logic
	const images = [
		{ src: '/logo/image1.jpg', alt: 'Image 1', color: '' },
		{ src: '/logo/image2.jpg', alt: 'Image 2', color: '' },
		{ src: '/logo/image3.jpg', alt: 'Image 3', color: '' },
		{ src: '/logo/image4.jpg', alt: 'Image 4', color: '' }
	];

	let currentIndex = 0;

	const changeImage = () => {
		currentIndex = (currentIndex + 1) % images.length;
	};

	onMount(() => {
		const interval = setInterval(changeImage, 3000);
		return () => clearInterval(interval);
	});

	function goToLoginPage() {
		goto('/login');
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

	// Signup form logic
	let name = '';
	let username = '';
	let password = '';
	let confirmpassword = '';
	let Email = '';
	let Country = '';
	let error = '';

	const countries = [
		'United States',
		'Canada',
		'United Kingdom',
		'Australia',
		'India',
		'Germany',
		'France',
		'Italy',
		'Spain',
		'Mexico',
		'Japan',
		'China',
		'Africa',
		'Brazil',
		'Russia',
		'Egypt',
		'South Korea',
		'Singapore',
		'Malaysia',
		'Thailand',
		'Nigeria',
		'Argentina',
		'Chile',
		'Colombia',
		'Belgium',
		'Denmark',
		'Finland',
		'Sweden',
		'Norway'
	];


















</script>

<div class="page-container">
	<!-- Image Slider -->
	<div class="slider-container">
		<div class="slider">
			<img src={images[currentIndex].src} alt={images[currentIndex].alt} />
		</div>
		<div class="navigation-container">
			<button class="nav-button" on:click={navigatePrev}>{'<'}</button>
			<div class="navigation-dots">
				{#each images as _, index}
					<div
						class="dot {currentIndex === index ? 'active' : ''}"
						on:click={() => navigateToImage(index)}
					></div>
				{/each}
			</div>
			<button class="nav-button" on:click={navigateNext}>{'>'}</button>
		</div>
	</div>
</div>

<!-- Signup Form -->
<div class="form-container">
	<div class="container">
		<h1><b>Signup to Innovate</b></h1>

		{#if error}
			<div class="error">{error}</div>
		{/if}

		<form>
			<input type="text" id="name" bind:value={name} placeholder="Enter your name" />
			<input type="text" id="username" bind:value={username} placeholder="Enter your username" />
			<input type="text" id="Email" bind:value={Email} placeholder="Enter your Email" />
			<input type="password" id="password" placeholder="Enter your password" />
			<input type="password" id="confirmpassword" placeholder="Confirm your password" />

			<select id="country" bind:value={Country} placeholder="Country">
				<option value="" disabled selected>Select your country</option>
				{#each countries as countryOption}
					<option value={countryOption}>{countryOption}</option>
				{/each}
			</select>

			<button type="submit">Sign up</button>
		</form>

		<div class="social-login">
			<img src="/logo/google_logo.png" alt="Google Logo" />
			<img src="/logo/apple_logo.png" alt="Apple Logo" />
		</div>

		<a href="/login" class="login-link"
			>Already have an account? <span class="login-text">Log in</span></a
		>
	</div>
</div>

<style>
	/* Global body styles */
	:global(body) {
		font-family: 'Arial', sans-serif;
		background:
			url('/logo/background.jpg') no-repeat center center fixed,
			linear-gradient(135deg, #205c94, #ff6347);
		background-size: cover;
		margin: 0;
		padding: 0;
		min-height: 100vh;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.page-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: 1200px;
		height: 100vh;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	/* Slider styles */
	.slider-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.slider {
		overflow: hidden;
	}

	.slider img {
		width: 100%;
		max-width: 922px;
		height: auto;
		object-fit: cover;
		border-radius: 20px;
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.2),
			0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.navigation-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
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

	/* Form container styles */
	.form-container {
		/* flex: 1;
    display: flex; */
		width: 40vw;
		padding-right: 1vw;
		padding-left: 6vw;
		justify-content: center;
		align-items: center;

		/* padding: px; */
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
	}

	h1 {
		font-size: 30px;
		color: #304841;
		margin-bottom: 20px;
		/* font-weight: 700; */
	}

	.error {
		color: #ff4747;
		font-size: 1rem;
		margin-bottom: 20px;
		animation: shake 0.5s ease-in-out;
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
		color: #304841;
	}

	input {
		padding: 14px;
		font-size: 1rem;
		margin-bottom: 20px;
		border: 1px solid #ccc;
		border-radius: 10px;
		background-color: #f5f5f5;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			background-color 0.3s ease;
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
		transition:
			background-color 0.3s ease,
			transform 0.3s ease,
			box-shadow 0.3s ease;
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
		margin-bottom: 18px;
		padding: 14px;
		border: 1px solid rgb(219, 198, 198);
		border-radius: 10px;
		background-color: white;
		color: #304841;
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

	.login-link {
		display: block;
		margin-top: 20px;
		font-size: 1rem;
		color: #4c58c7;
		text-decoration: none;
	}

	.login-text {
		text-decoration: none;
	}

	.login-text:hover {
		text-decoration: underline;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.page-container {
			flex-direction: column;
			height: auto;
			padding: 20px;
		}

		.slider-container {
			display: none; /* Hide slider on mobile/tablet */
		}

		.form-container {
			flex: none;
			width: 100%;
			padding-left: 10%;
			padding-right: 10%;
		}

		.container {
			max-width: 100%;
			padding: 20px;
		}

		input,
		#country,
		button {
			font-size: 0.9rem;
			padding: 12px;
		}

		button {
			width: 100%;
		}
	}
</style>
