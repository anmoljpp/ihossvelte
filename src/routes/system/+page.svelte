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

	function goToChangePass() {
		goto('/changepass');
	}
	// Function for restarting the hub
	const restartHub = () => {
		// You can replace this with actual logic to restart the hub
		alert('Hub is restarting...');
		// You can implement your restart logic here, e.g., calling an API, or sending a command to the backend
	};

	// Function for restarting the application
	const restartApp = () => {
		// You can replace this with actual logic to restart the application
		alert('Application is restarting...');
		// You can implement your restart logic here
	};

	const selectedEntities = writable([]);

	let showPlusButton = writable(false); // Track the visibility of the + button
	let showDropdown = writable(false); // Track the visibility of the dropdown

	// Track rotation state for each floor
	let isRotated = writable({
		Floor1: false,
		Floor2: false
	});

	// Define writable store for user details
	let userDetails = writable({
		name: 'xyz',
		username: 'xyz',
		email: 'xyz@mail.com',
		country: 'USA'
	});

	// List of countries for the dropdown
	const countries = [
		'USA',
		'Canada',
		'United Kingdom',
		'Australia',
		'Germany',
		'France',
		'India',
		'Mexico',
		'Japan',
		'China'
		// Add more countries here
	];

	let showAppModal = writable(false);

	const openAppModal = () => {
         showAppModal.set(true);
	};

	const closeAppModal = () => {
		showAppModal.set(false); // Close the modal when the cancel button is clicked
	};

	// Variable to hold the selected country
	let selectedCountry = 'India'; // Default selected country

	let showModal = writable(false); // Track the visibility of the modal

	const openModal = () => {
		showModal.set(true); // Show the modal when the restart button is clicked
	};

	const closeModal = () => {
		showModal.set(false); // Close the modal when the cancel button is clicked
	};

	const confirmRestart = () => {
		restartHub();
		closeModal(); // Close the modal after confirming the restart
	};

	const saveProfile = () => {
		alert('Profile saved!');
		goto('/setting');
		// You can implement saving the details here, e.g., an API call or localStorage
	};

	// Function to handle input change (update store)
	const handleInputChange = (field, value) => {
		userDetails.update((details) => {
			details[field] = value;
			return details;
		});
	};

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

// // Trigger the restart process
// const restartApp = () => {
//   alert('Application is restarting...');
//   closeAppModal(); // Close the modal after confirming the restart
// };

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
			<h2>System</h2>
		</div>

		<div class="restart-buttons-container">
			<button class="restart-button" on:click={openModal}>
				<img src="/logo/restart.png" alt="" />Restart Hub
			</button>
			{#if $showModal}
				<div class="modal-overlay" on:click={closeModal}>
					<div class="modal-content" on:click|stopPropagation>
						<!-- Close (X) button -->
						<button class="close-modal-button" on:click={closeModal}> X </button>

						<p>Are you sure you want to restart your hub?</p>
						<div class="modal-buttons">
							<button class="modal-button" on:click={confirmRestart}>Restart</button>
							<button class="modal-button" on:click={closeModal}>Cancel</button>
						</div>
					</div>
				</div>
			{/if}

			<button class="restart-button" on:click={openAppModal}>
				<img src="/logo/restart.png" alt="" />Restart Application
			</button>
			{#if $showAppModal}
  <div class="modal-overlay" on:click={closeAppModal}>
    <div class="modal-content" on:click|stopPropagation>
      <!-- X Button to close the modal for Restart Application -->
      <button class="close-modal" on:click={closeAppModal}>X</button>

      <p>Are you sure you want to restart your application?</p>
      <div class="modal-buttons">
        <button class="modal-button" on:click={restartApp}>Restart</button>
        <button class="modal-button" on:click={closeAppModal}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
		</div>

		<!-- edit dashboard button -->
		{#if $showPlusButton}
			<button class="plus-button" on:click={goToEditPage}>
				<img src="/logo/plus.png" alt="" />
			</button>
		{/if}
	</div>
</main>

<style>
	.close-modal {
		position: relative;
		bottom: 32px;
		left: 170px;
		background: none;
		border: none;
		color: #333;
		font-size: 24px;
		font-weight: bold;
		cursor: pointer;
		transition: color 0.3s;
	}

	.close-modal:hover {
		color: #e74c3c; /* Change color on hover */
	}

	.close-modal-button {
		position: relative;
		bottom: 32px;
		left: 170px;
		background: none;
		border: none;
		color: #333;
		font-size: 24px;
		font-weight: bold;
		cursor: pointer;
		transition: color 0.3s;
	}

	.close-modal-button:hover {
		color: #e74c3c; /* Change color on hover */
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000; /* Make sure modal is on top */
	}

	/* Modal Content */
	.modal-content {
		background-color: white;
		padding: 20px;
		border-radius: 10px;
		width: 300px;
		text-align: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	}

	.modal-content p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	/* Modal Buttons */
	.modal-buttons {
		display: flex;
		justify-content: space-around;
		height: 40px;
		font-size: 16px;
		width: 354px;
	}

	.modal-button {
		padding: 0.6rem 1.2rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.modal-button:hover {
		background-color: #218838; /* Darker green on hover */
	}

	.modal-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.modal-content {
		padding: 20px;
		background-color: white;
		border-radius: 10px;
		text-align: center;
		width: 396px;
		height: 233px;
		align-content: center;
	}

	.modal-button {
		padding: 0.6rem 1.2rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.modal-button:hover {
		background-color: #218838;
	}

	/* Flex container for the buttons */
	.restart-buttons-container {
		display: flex;
		justify-content: space-evenly; /* Align the buttons evenly */
		gap: 20px; /* Optional: add space between buttons */
		margin-top: 70px; /* Space between the heading and buttons */
		width: 100%; /* Ensure buttons take full available width */
		max-width: 600px; /* Set a max width if you want to restrict the button's width */
	}

	/* Button styles */
	.restart-button {
		padding: 0.6rem; /* Optional: adjust padding */
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.2s;
		display: flex;
		align-items: center;
		/* justify-content: center; 
    gap: 10px;  */
		font-size: 16px;
		width: 200px; /* Set fixed width for both buttons */
	}

	.restart-button:hover {
		transform: translateY(-5px); /* Lift effect on hover */
	}

	.restart-button img {
		width: 20px;
		height: auto;
		object-fit: contain;
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

	.setting-heading {
		position: absolute;
		top: 20px; /* Adjust to position it at the top-left corner */
		left: 20px; /* Adjust as needed for the left distance */
		font-size: 34px;
		font-weight: bold;
		color: #333;
		position: absolute;
		top: 3px;
		right: 3px;
	}

	.setting-heading {
		font-size: 34px;
		font-weight: bold;
		color: #333;
		width: 163px;
		margin-left: -22px;
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
