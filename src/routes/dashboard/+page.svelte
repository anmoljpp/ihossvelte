<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { entities, toggleEntity, connect } from '$lib/websocket';

	const showModal = writable(false); // Show or hide the modal
	const selectedEntity = writable(null); // Track the entity being edited
	const brightnessPercentage = writable(0); // Store for brightness percentage

	const openEditModal = (entity) => {
		selectedEntity.set(entity); // Set the selected entity
		showModal.set(true); // Show the modal
		showColorWheel1 = true; // Show the color wheel by default
		showColorWheel2 = false; // Hide the temperature wheel
	};

	const closeModal = () => {
		showModal.set(false); // Close the modal
		selectedEntity.set(null); // Clear selected entity
	};

	const updateSliderBackground = (event) => {
		const brightnessValue = event.target.value;
		const percentage = brightnessValue;
		// Correct the linear-gradient syntax
		event.target.style.background = `linear-gradient(to right, #ffffff ${percentage}%, #ccc ${percentage}%)`;
		brightnessPercentage.set(percentage);

		// Send the brightness value to Home Assistant
		if ($selectedEntity) {
			const brightness = Math.round((percentage / 100) * 255); // Convert percentage to 0-255 range
			setBrightness($selectedEntity.entity_id, brightness);
		}
	};

	let message = '';
	let showColorWheel1 = false; // To show rainbow color wheel
	let showColorWheel2 = false; // To show white-to-warm-white color wheel

	function button1Click() {
		// Show the rainbow color wheel and hide the warm white color wheel
		showColorWheel1 = true;
		showColorWheel2 = false;
	}

	function button2Click() {
		// Show the warm white color wheel and hide the rainbow color wheel
		showColorWheel1 = false;
		showColorWheel2 = true;
	}

	// const openEditModal = (entity) => {
	// 	selectedEntity.set(entity); // Set the selected entity
	// 	showModal.set(true); // Show the modal
	// };

	function goToScenes() {
		goto('/scenes');
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

	function goTOSetting() {
		goto('/setting');
	}

	const selectedEntities = writable([]);

	let showPlusButton = writable(false); // Track the visibility of the + button
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
			<div class="sid"><img src="/logo/home.png" alt="" class="icon" />Home</div>
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
		<div class="sid1 setting-button" on:click={goTOSetting}>
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
			<div class="control-item" on:click={goToScenes}>
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

		<button class="pencil-button" on:click={handlePencilClick}>
			<img src="/logo/pencil.png" alt="" />
		</button>
	</div>

	<div class="right-section">
		<div class="heading">Dashboard</div>
		<div class="dashboard">
			<div class="dashboard-item">
				<div class="title">CPU</div>
				<div class="value">
					<span class="load">50%</span>
					<span class="temp">35°C</span>
				</div>
			</div>
			<div class="dashboard-item">
				<div class="title">RAM</div>
				<div class="progress-bar">
					<div class="progress-fill" style="width: 60%;"></div>
				</div>
				<div class="title">Storage</div>
				<div class="progress-bar">
					<div class="progress-fill" style="width: 80%;"></div>
				</div>
			</div>
			<div class="dashboard-item">
				<div class="title">Working Accessories</div>
				<div class="value">80</div>
			</div>
			<div class="dashboard-item">
				<div class="title">Accessories Not Working</div>
				<div class="value">5</div>
			</div>
			<div class="dashboard">
				{#each $entities as entity (entity.entity_id)}
					{#if $selectedEntities.includes(entity.entity_id)}
						<div class="entity">
							<p>{entity.attributes.friendly_name}</p>
							<h6>{entity.state}</h6>

							<h5>{entity.currentState}</h5>
							<button on:click={() => handleToggle(entity.entity_id, entity.state)}>
								{entity.state === 'on' ? 'Turn Off' : 'Turn On'}
							</button>
							<!-- Clickable Icon (No Button) -->
							<img
								src="/logo/light.png"
								alt="Edit"
								class="clickable-icon"
								on:click={() => openEditModal(entity)}
							/>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- edit dashboard button -->
	{#if $showPlusButton}
		<button class="plus-button" on:click={goToEditPage}>
			<img src="/logo/plus.png" alt="" />
		</button>
	{/if}

	{#if $showModal}
		<div class="modal">
			<div class="modal-content">
				<!-- Close Button (X) at the top-right corner -->
				<button class="close-button" on:click={closeModal}>X</button>

				<!-- Display the name of the selected light at the top of the modal -->
				{#if $selectedEntity}
					<h2 class="device-name">{$selectedEntity.attributes.friendly_name}</h2>
					<!-- Light's name -->

					<!-- Add "Toggle" Text -->
					<div class="toggle-label">
						<span>Toggle</span>
					</div>

					<!-- Toggle Switch -->
					<div class="toggle-container">
						<label class="switch">
							<input
								type="checkbox"
								checked={$selectedEntity.state === 'on'}
								on:change={() => handleToggle($selectedEntity.entity_id, $selectedEntity.state)}
							/>
							<span class="slider"></span>
						</label>
					</div>

					<!-- Brightness Bar -->
					<label for="brightness" class="brightness-label">Brightness</label>
					<div class="brightness-bar-container">
						<input
							type="range"
							id="brightness"
							name="brightness"
							min="0"
							max="100"
							value="0"
							class="brightness-slider"
							on:input={updateSliderBackground}
						/>
						<span class="brightness-percentage">{$brightnessPercentage}%</span>
					</div>

					<div class="button-container">
						<button on:click={button1Click} class="btn-left">Color</button>
						<button on:click={button2Click} class="btn-right">Temperature</button>
					</div>

					<div class="box">
						{#if message}
							<p>{message}</p>
						{/if}

						{#if showColorWheel1}
							<!-- Simple static color wheel with rainbow colors -->
							<div class="color-wheel rainbow"></div>
						{/if}

						{#if showColorWheel2}
							<!-- Static color wheel with shades of white and warm white -->
							<div class="color-wheel warm-white"></div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>

<style>
	.clickable-icon {
		width: 24px;
		height: 24px;
		cursor: pointer;
		position: relative;
		bottom: 35px;
		left: 181px;
	}

	.clickable-icon:hover {
		opacity: 0.7; /* Optional hover effect */
	}

	.brightness-percentage {
		font-size: 18px;
		font-weight: bold;
		margin-left: -12px;
		color: #333;
	}

	.button-container {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border: 2px solid #ccc; /* Add a border to the button */
		background-color: #fff;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	.btn-left {
		border-top-left-radius: 20px; /* Add left border radius to Button 1 */
		border-bottom-left-radius: 20px;
		width: 250px;
	}

	.btn-right {
		border-top-right-radius: 20px; /* Add right border radius to Button 2 */
		border-bottom-right-radius: 20px;
		width: 250px;
	}

	/* Hover effect for the buttons */
	button:hover {
		background-color: #f0f0f0;
		/* border-color: #888; */
	}

	/* Styling the message box under the buttons */
	.box {
		margin-top: 20px;
		padding: 20px;
		/* border: 2px solid #ccc;
    background-color: #f9f9f9;
    width: 80%;
    max-width: 300px;
    height: 300px; */
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}

	/* Styling for the first color wheel (Rainbow wheel) */
	.color-wheel {
		width: 250px;
		height: 250px;
		border-radius: 50%;
		margin: 0px auto;
		cursor: pointer;
		overflow: hidden;
	}

	/* Rainbow Color Wheel */
	.rainbow {
		background: conic-gradient(red, orange, yellow, green, cyan, blue, violet, red);
	}

	/* White to Warm White Color Wheel */
	.warm-white {
		background: conic-gradient(
			#fff,
			#fef5e2,
			#f5e1c4,
			#f0db9f,
			#e8d88f,
			#e0d37f,
			#d8ca6f,
			#d0c25f,
			#c8b75f,
			#d4c27d,
			#d9d3bf,
			#fff
		);
	}

	.brightness-bar-container {
		margin-top: 10px;
	}

	/* Brightness Slider */
	.brightness-slider {
		-webkit-appearance: none; /* Remove default styling */
		width: 87%; /* Adjust width as needed */
		height: 44px; /* Adjust height (making it thinner) */
		background: #ccc; /* Slider track color */
		border: 1px solid black;
		margin-right: 56px;
		border-radius: 5px; /* Rounded corners */
		outline: none;
		opacity: 0.7; /* Slightly transparent */
		transition:
			opacity 0.2s,
			background 0.3s ease-in-out;
	}

	.brightness-slider:hover {
		opacity: 1; /* Fully opaque on hover */
	}

	/* Remove the slider thumb */
	.brightness-slider::-webkit-slider-thumb {
		-webkit-appearance: none; /* Remove thumb */
	}

	.brightness-slider::-moz-range-thumb {
		width: 0; /* Make the thumb invisible */
	}

	.brightness-label {
		margin-bottom: 10px; /* Space between the "Toggle" text and the switch */
		padding-bottom: 10px;
		font-size: 19px; /* Font size for the text */
		margin-right: 376px;
		font-weight: bold; /* Make it bold */
		color: #333; /* Color of the text */
	}

	/* Style for "Toggle" text */
	.toggle-label {
		margin-bottom: -24px; /* Space between the "Toggle" text and the switch */
		font-size: 19px; /* Font size for the text */
		margin-right: 376px;
		font-weight: bold; /* Make it bold */
		color: #333; /* Color of the text */
	}

	main {
		text-align: center;
	}
	.dashboard {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
	.entity {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		text-align: center;
	}
	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		border: none;
		/* border-radius: 5px; */
		background-color: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	button:hover {
		background-color: #0056b3;
	}

	/* Edit Button Style */
	.edit-button {
		background-color: #28a745;
		margin-left: 1rem;
	}
	.edit-button:hover {
		background-color: #218838;
	}

	/* Modal Styles */
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal-content {
		background-color: #ededed;
		padding: 2rem;
		border-radius: 8px;
		width: 414px;
		height: 676px;
		text-align: center;
		position: relative;
	}

	/* Close Button (X) Styles */
	.close-button {
		position: absolute;
		top: -12px;
		right: 4px;
		border: none;
		background: none;
		font-size: 24px;
		color: #000;
		cursor: pointer;
	}

	.close-button:hover {
		color: #ff0000;
	}

	/* Device Name Styles */
	.device-name {
		font-size: 24px; /* Font size for the device name */
		font-weight: bold;
		color: #333; /* Text color */
		margin-bottom: 20px; /* Space below the device name */
		text-align: initial; /* Align text in the center */
		margin-top: -20px;
		margin-left: -1;
	}

	/* Toggle Switch Styles */
	.toggle-container {
		margin-top: 34px;
		margin-right: 387px;
	}
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		border-radius: 50%;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #4caf50;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	/* Optional: Add focus effect */
	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}
	.dashboard1 {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		position: absolute;
		top: 420px; /* Adjust the vertical positioning */
		right: 103px;
		padding: 20px; /* Add padding for better spacing around entities */
		background-color: #f9f9f9; /* Light background color */
		border-radius: 10px; /* Rounded corners */
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
		width: 100%; /* Full width to fit entities comfortably */
		box-sizing: border-box;
	}

	.entity {
		width: 280px; /* Adjust the width of each entity box */
		background-color: #fff; /* White background for each entity */
		border-radius: 8px; /* Rounded corners for each entity */
		padding: 20px; /* Padding inside each entity */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease; /* Smooth animation on hover */
	}

	.entity:hover {
		transform: translateY(-5px); /* Lift effect on hover */
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
	}

	.entity p {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		color: #333;
	}

	.entity h6 {
		font-size: 14px;
		color: #666;
		margin-bottom: 15px;
	}

	.entity h5 {
		font-size: 20px;
		color: #28a745; /* Green color for the current state */
		margin-bottom: 15px;
	}

	.entity button {
		padding: 10px 20px;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 25px; /* Rounded button */
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s ease;
	}

	.entity button:hover {
		background-color: #218838; /* Darker green on hover */
	}

	/* Style for the Dashboard items */
	.dashboard-item {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 15px;
		text-align: center;
		width: 343px;
		height: 141px;
		margin-bottom: 20px; /* Added margin to separate the items */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
	}

	.dashboard-item .title {
		font-weight: bold;
		margin-bottom: 10px;
	}

	.dashboard-item .value {
		font-size: 18px;
	}

	.dashboard-item .progress-bar {
		height: 10px;
		background-color: #ddd;
		border-radius: 5px;
		margin-top: 5px;
	}

	.dashboard-item .progress-fill {
		height: 100%;
		background-color: #28a745; /* Green color */
		border-radius: 5px;
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

	.heading {
		font-size: 50px;
		margin-left: 10px;
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

	.right-section {
		width: 79%;
		position: absolute;
		left: 391px;
		top: 185px;
		height: calc(100vh - 185px); /* Make it take up the remaining space below the top section */
		overflow-y: auto; /* Enable vertical scrolling */
		padding-right: 20px; /* Add some padding on the right to avoid scrollbar overlap */
	}

	.dashboard {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		margin-left: 10px;
		gap: 1rem;
	}

	.dashboard-item {
		background-color: #f0f0f0;
		border: 1px solid black;
		border-radius: 5px;
		padding: 15px;
		text-align: center;
		width: 343px;
		height: 141px;
		margin-bottom: 20px; /* Space between items */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
	}

	.dashboard-item .title {
		font-weight: bold;
		margin-bottom: 10px;
	}

	.dashboard-item .value {
		font-size: 18px;
	}

	.progress-bar {
		height: 10px;
		background-color: #ddd;
		border-radius: 5px;
		margin-top: 5px;
	}

	.progress-fill {
		height: 100%;
		background-color: #28a745; /* Green color */
		border-radius: 5px;
	}

	/* Pencil, Main, and Plus Buttons (Circular) */
	.pencil-button,
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

	.pencil-button:hover,
	.mainPB-button:hover,
	.plus-button:hover {
		background-color: #218838; /* Darker green on hover */
		transform: translateY(-5px); /* Lift effect on hover */
	}

	.pencil-button img,
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

	.pencil-button {
		position: absolute;
		right: 178px;
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
