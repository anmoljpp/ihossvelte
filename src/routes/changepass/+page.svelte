<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { entities, toggleEntity, connect } from '$lib/websocket';

	function goToMyProfile() {
		goto('/myprofile');
	}

	function goToMhome() {
		goto('/dashboard');
	}

	function goToEditPage() {
		goto('/edit');
	}

	function goToAddFloor() {
		goto('/sbfloor');
	}

	function goToAddRoom() {
		goto('/room');
	}

	function goToDevice() {
		goto('/device');
	}

	function goToHome() {
		goto('/hhome');
	}

	function goToAutomation() {
		goto('/automation');
	}

	function goToScenes() {
		goto('/scenes');
	}

    function goToSetting() {
		goto('/setting');
	}

    let showChangePasswordForm = writable(true); // Show the change password form immediately
	let currentPassword = writable('');
	let newPassword = writable('');
	let confirmPassword = writable('');

	const handleChangePassword = () => {
		// Your logic to handle password change (e.g., validation and API call)
		if ($newPassword === $confirmPassword) {
			alert('Password updated successfully!');
			// Add further logic for updating password via backend or API
		} else {
			alert('New password and confirm password do not match!');
		}
	};

	const selectedEntities = writable([]);

	let showPlusButton =     writable(false); // Track the visibility of the + button
	let showDropdown = writable(false); // Track the visibility of the dropdown

	// Track rotation state for each floor
	let isRotated = writable({
		Floor1: false,
		Floor2: false
	});

	onMount(() => {
		connect();
		const storedEntities = JSON.parse(localStorage.getItem('selectedEntities')) || [];
		selectedEntities.set(storedEntities);
	});

	const handleToggle = (entityId, currentState) => {
		toggleEntity(entityId, currentState);
	};

	// Close dropdown when clicked outside
	const closeDropdown = (event) => {
		if (!event.target.closest('.mainPB-button') && !event.target.closest('.dropdown-menu')) {
			showDropdown.set(false);
		}
	};

	document.addEventListener('click', closeDropdown);

	onDestroy(() => {
		document.removeEventListener('click', closeDropdown);
	});

	const handlePencilClick = () => {
		showPlusButton.update((value) => !value); // Toggle the visibility of the + button
	};

	const handlePlusClick = () => {
		showDropdown.update((value) => !value); // Toggle the visibility of the dropdown
	};

	const handleFloorToggle = (floor) => {
		// Toggle rotation state for the clicked floor (no room modal opening anymore)
		isRotated.update((state) => ({
			...state,
			[floor]: !state[floor] // Toggle the rotation of the floor button
		}));
	};

	// Track if there are selected entities
	$: hasSelectedDevices = $selectedEntities.length > 0;
</script>

<main>
	<div class="left-section">
		<div class="company-name">
			<h1>iHOS App</h1>
		</div>
		<div class="search-bar">
			<input type="text" placeholder="Search..." />
			<button class="search-button">
				<img src="//logo/search.png" alt="" class="search-icon" />
			</button>
		</div>
		<div class="LSB">
			<div class="sid" on:click={goToMhome}>
				<img src="/logo/home.png" alt="" class="icon" />Home
			</div>
			<div class="sid" on:click={() => handleFloorToggle('Floor1')}>
				<img src="/logo/tiles.png" alt="" class="icon" />Floor1
				<div class="expand-button {$isRotated.Floor1 ? 'rotated' : ''}">></div>
			</div>
			<div class="sid" on:click={() => handleFloorToggle('Floor2')}>
				<img src="/logo/tiles.png" alt="" class="icon" />Floor2
				<div class="expand-button {$isRotated.Floor2 ? 'rotated' : ''}">></div>
			</div>
		</div>
		<div class="sid1 setting-button">
			<img src="/logo/circle.png" alt="" class="icon" />Default
		</div>
		<div class="sid1 setting-button">
			<img src="/logo/renewable-energy.png" alt="" class="icon" />Energy
		</div>
		<div class="sid1 setting-button">
			<img src="/logo/history.png" alt="" class="icon" />History
		</div>
		<div class="sid1 setting-button">
			<img src="/logo/settings.png" alt="" class="icon" />Setting
		</div>
	</div>

	<!-- Top Section with Curved Controls -->
	<div class="top-section">
		<div class="top-controls">
			<div class="control-item">
				<span>Camera</span>
			</div>
			<div class="control-item">
				<span>Automations</span>
			</div>
			<div class="control-item">
				<span>Scenes</span>
			</div>
		</div>

		<!-- nav main button -->
		<button class="mainPB-button" on:click={handlePlusClick}>
			<img src="/logo/plus.png" alt="" />
		</button>

		<!-- Dropdown menu -->
		{#if $showDropdown}
			<div class="dropdown-menu">
				<button class="dropdown-item" on:click={goToAddFloor}>Add Floor</button>
				<button class="dropdown-item" on:click={goToAddRoom}>Add Room</button>
				<button class="dropdown-item" on:click={goToDevice}>Add Device</button>
				<button class="dropdown-item" on:click={goToAutomation}>Automations</button>
				<button class="dropdown-item" on:click={goToScenes}>Scenes</button>
				<button class="dropdown-item" on:click={goToHome}>Add Home</button>
			</div>
		{/if}
	</div>

    <div class="right-section">
        <div class="setting-heading">
			<h2>Change Pasword</h2>
		</div>
		<!-- Change Password Section -->
		{#if $showChangePasswordForm}
			<div class="change-password-box">
				<h2>Change Password</h2>
				<form on:submit|preventDefault={handleChangePassword}>
					<div class="form-group">
						<label for="current-password">Current Password</label>
						<input type="password" id="current-password" bind:value={$currentPassword} required />
					</div>
					<div class="form-group">
						<label for="new-password">New Password</label>
						<input type="password" id="new-password" bind:value={$newPassword} required />
					</div>
					<div class="form-group">
						<label for="confirm-password">Confirm Password</label>
						<input type="password" id="confirm-password" bind:value={$confirmPassword} required />
					</div>
					<button type="submit" class="asdf" on:click={goToSetting}>Update Password</button>
				</form>
			</div>
		{:else}
			<!-- Button to trigger the Change Password form -->
			<button on:click={() => showChangePasswordForm.set(true)}>
				Change Password
			</button>
		{/if}
	</div>

	<!-- edit dashboard button -->
	{#if $showPlusButton}
		<button class="plus-button" on:click={goToEditPage}>
			<img src="/logo/plus.png" alt="" />
		</button>
	{/if}
</main>

<style>
    .asdf {
        width: 243px;
        height: 50px;
        font-size: 19px;
    }
    .change-password-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 648px;
		height: 531px;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		font-family: 'Arial', sans-serif;
        position: absolute;
  top: 164px;
  left: 350px;
	}

	.change-password-box h2 {
		font-size: 24px;
		font-weight: bold;
		color: #333;
		margin-bottom: 20px;
	}

	.form-group {
		width: 100%;
		margin-bottom: 15px;
	}

	.form-group label {
		font-size: 16px;
		color: #333;
		display: block;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border: 2px solid #28a745;
		border-radius: 5px;
	}

	.form-group input:focus {
		border-color: #218838;
	}

	button {
		padding: 0.6rem 1.2rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
		width: 100%;
	}

	button:hover {
		background-color: #218838;
	}


	.right-section {
    /* border: 1px solid black; */
    position: absolute;
    top: 194px; /* Adjust as needed */
    left: 415px; /* Right side of the left-section */
    font-size: 34px;
    font-weight: bold;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
	
}
	/* General Styles */
	:global(body) {
		font-family: 'Arial', sans-serif;
		background-color: #f1f8f4; /* Soft background color */
		color: #333;
		margin: 0;
		padding: 0;
	}

	main {
		display: flex;
		height: 100vh;
		flex-direction: row;
		justify-content: space-between;
		background-color: white;
	}

	/* Top Section */
	.top-section {
		width: 100%; /* Full width */
		height: 180px;
		margin-left: 5px;
		background-color: #ffffff; /* Same background as left section */
		padding-top: 30px;
		padding-left: 42px; /* Same left padding as left section */
		padding-right: 42px; /* Adjust the padding */
		border-bottom: 2px solid #e0e0e0; /* Add border at the bottom */
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Pencil, Main, and Plus Buttons (Circular) */

	.mainPB-button,
	.plus-button {
		background-color: #9ba29c; /* Green background */
		border: none;
		border-radius: 50%; /* Circular shape */
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 10px;
		width: 50px; /* Fixed width */
		height: 50px; /* Fixed height */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow */
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.mainPB-button:hover,
	.plus-button:hover {
		background-color: #218838; /* Darker green on hover */
		transform: translateY(-5px); /* Lift effect on hover */
	}

	.mainPB-button img,
	.plus-button img {
		width: 24px; /* Adjust icon size */
		height: 24px; /* Adjust icon size */
		object-fit: contain; /* Ensure the image fits well */
	}

	.plus-button {
		position: fixed;
		bottom: 20px;
		left: 412px;
	}

	/* Dropdown Styles */
	.dropdown-menu {
		position: absolute;
		top: 141px; /* Adjust this to position it right below the + button */
		right: 255px;
		background-color: #c9c1c1;
		border-radius: 5px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		z-index: 10;
		width: 200px;
	}

	.dropdown-item {
		padding: 10px 15px;
		background-color: #a09fa4;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 16px;
		height: 50px;
		width: 200px;
	}

	.dropdown-item:hover {
		background-color: #28a745;
		color: white;
	}

	.top-controls {
		display: flex;
		justify-content: space-between;
		margin-right: 202px;
		width: 50%; /* Adjust width as needed */
		background-color: #ffffff; /* Same background as left section */
		padding: 15px;
		border-radius: 30px; /* Curved edges */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow */
	}

	.control-item {
		display: flex;
		width: 150px;
		height: 44px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: rgb(15, 14, 14);
		background-color: #ced4d0;
		font-size: 16px;
		cursor: pointer;
		border: 1px solid rgb(116, 131, 119);
		border-radius: 30px;
	}

	.control-item:hover {
		transform: translateY(-5px);
	}

	.control-item span {
		font-size: 14px;
	}

	.left-section {
		width: 434px;
		background-color: #ffffff;
		padding-top: 30px;
		border-right: 2px solid #e0e0e0;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	.company-name h1 {
		font-size: 2.8rem;
		font-weight: bold;
		color: #28a745; /* Green color */
		margin-left: 50px;
	}

	.search-bar {
		display: flex;
		align-items: center;
		margin-top: 20px;
		margin-left: 40px;
		gap: 10px;
	}

	.search-bar input {
		padding: 0.6rem;
		width: 200px;
		border: 2px solid #28a745; /* Green border */
		border-radius: 5px;
		font-size: 1rem;
	}

	.search-button {
		padding: 0.6rem;
		background-color: #28a745; /* Green background */
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.search-button:hover {
		background-color: #218838; /* Darker green on hover */
	}

	.LSB {
		font-size: 18px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		position: relative;
		top: 80px;
		left: 16px;
	}

	.sid {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 13px 3%;
		width: 357px;
		border-radius: 5px;
		background-color: #f9f9f9;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.sid img.icon {
		width: 20px;
		height: auto;
		margin-right: 10px;
	}

	.sid:hover {
		background-color: #28a745; /* Green hover background */
		color: white;
		transform: translateX(5px);
	}

	.setting-button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 13px 3%;
		width: 364px;
		border-radius: 5px;
		background-color: #f9f9f9;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.2s;
		font-size: 18px;
		position: relative;
		right: 10px;
		top: 275px;
		margin-left: 24px;
		margin-bottom: 20px;
	}

	.setting-button img.icon {
		width: 20px;
		height: auto;
		margin-right: 10px;
	}

	.setting-button:hover {
		background-color: #28a745; /* Green hover background */
		color: white;
		transform: translateX(5px);
	}

	.expand-button {
		margin-left: 240px;
		transition: transform 0.3s ease;
	}

	.expand-button.rotated {
		transform: rotate(90deg);
	}

	.expand-button:hover {
		color: #28a745; /* Green hover color */
	}

	button {
		padding: 0.6rem 1.2rem;
		background-color: #28a745; /* Green background */
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #218838; /* Darker green on hover */
	}

	.search-icon {
		height: 27px;
	}
</style>
