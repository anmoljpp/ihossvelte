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

	function goToSystem() {
		goto('/system')
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

	let showLogoutModal = writable(false);

	
	// Track if there are selected entities
	$: hasSelectedDevices = $selectedEntities.length > 0;

let sceneName = "";
let selectedIcon = "";
let selectedRoom = "";

const icons = ["Light", "Fan", "TV", "Speaker"]; // Add more as needed
const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom"];

let showTextAndBox = writable(false);

const toggleTextAndBox = () => {
    showTextAndBox.update(value => !value);
};

 let showPopup = false;

  function togglePopup() {
    showPopup = !showPopup;
  }

  
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

		

	{#if !$showTextAndBox} 
    <button class="add-scenes-button" on:click={toggleTextAndBox}>
        Add Scenes
    </button>
{/if}
<!-- Text and Box Structure -->
{#if $showTextAndBox}
	<div class="text-and-box">
		<!-- Clickable Text -->
		<p class="clickable-text">Create new scenes</p>

		<!-- Box Structure -->
		<div class="popup-box">
			<!-- Name Field -->
			<div class="form-group">
				<label for="scene-name">Name:</label>
				<input 
					type="text" 
					id="scene-name" 
					bind:value={sceneName} 
					placeholder="Enter scene name" 
				/>
			</div>

			<!-- Icon Dropdown -->
			<div class="form-group">
				<label for="icon-select">Icon:</label>
				<select id="icon-select" bind:value={selectedIcon}>
					<option value="" disabled>Select Icon</option>
					{#each icons as icon}
						<option value={icon}>{icon}</option>
					{/each}
				</select>
			</div>

			<!-- Room Dropdown -->
			<div class="form-group">
				<label for="room-select">Room:</label>
				<select id="room-select" bind:value={selectedRoom}>
					<option value="" disabled>Select Room</option>
					{#each rooms as room}
						<option value={room}>{room}</option>
					{/each}
				</select>
			</div>
			<!-- New Text Below Popup Content -->
			<div class="popup-description">
				<h3>Devices</h3>
				<p>Add device to your scenes and set them to match your desired ambiance.</p>
			  </div>

			  
		</div>

		<!-- New Box Below the Text -->
		<div class="device-box">
			<!-- You can add content here later (e.g., device list) -->
			<p>Add Device</p>
			<button class="plus-button" on:click={goToEditPage}>+</button>
		</div>

		<!-- Close Button inside the device-box -->
<button class="close-button" on:click={toggleTextAndBox}>Save</button>


	</div>
{/if}

<div class="right-section">
<!-- Selected Devices Container -->
<div class="selected-devices-row">
	{#each $entities as entity (entity.entity_id)}
		{#if $selectedEntities.includes(entity.entity_id)}
			<div class="selected-entity">
				<p>{entity.attributes.friendly_name}</p>
				<h6>{entity.state}</h6>
				<button on:click={() => handleToggle(entity.entity_id, entity.state)}>
					{entity.state === 'on' ? 'Turn Off' : 'Turn On'}
				</button>
				
			</div>
		{/if}
	{/each}
</div>
</div>

	
	<!-- edit dashboard button -->
	{#if $showPlusButton}
		<button class="plus-button" on:click={goToEditPage}>
			<img src="/logo/light.png" alt="" />
		</button>
	{/if}
</main>

<style>
	
	.selected-devices-row {
		position: absolute;
		top: 184px; /* Position below the top section */
		right: 0;
		width: calc(101% - 411px); /* Adjust width to fit beside other sections */
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		/* background-color: #f9f9f9; */
		padding: 10px;
		/* box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1); */
		overflow-x: auto;
	}

	.selected-entity {
		background-color: #ffffff;
		border-radius: 8px;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		min-width: 150px;
		max-width: 200px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.selected-entity p {
		font-size: 14px;
		color: #333;
		margin: 5px 0;
	}

	.selected-entity h6 {
		font-size: 12px;
		color: #666;
		margin: 5px 0;
	}

	.selected-entity button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.selected-entity button:hover {
		background-color: #0056b3;
	}

	.close-button {
    position: absolute;
    bottom: -250px;
    right: -110px;
    /* background-color: #ff5c5c; Red background */
    color: white;
    border: none;
    /* border-radius: 50%; */
    /* width: 25px;
    height: 25px; */
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
}


	.plus-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

	.device-box p {
  color: #333;
  font-size: 22px;
  margin: 13px 23px;
}

	 .device-box {
    width: 1307px;
    height: 417px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 20px auto;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
	position: relative;
	top: 292px;
	right: 18px;

  }
  
	.popup-description {
    margin-top: 50px;
    text-align: center;
	font-size: 19px;
	margin-left: -85px;
  }

  .popup-description h3 {
    font-size: 1.2em;
    margin-bottom: 5px;
	margin-right: 480px;
  }

  .popup-description p {
    color: #666;
    font-size: 0.9em;
  }

.form-group {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
}

.form-group label {
	width: 80px;
	font-size: 14px;
	color: #333;
}

.form-group input,
.form-group select {
	flex: 1;
	padding: 5px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

	.text-and-box {
	position: absolute;
	top: 220px;  /* Adjust to position under the Add Scenes button */
	left: 450px; /* Align with the right side of the left section */
	z-index: 20;
}

.clickable-text {
	font-size: 22px;
	/* color: #007bff; */
	cursor: pointer;
	/* text-decoration: underline; */
	margin-top: -23px;
	margin-left: -40px;
}

.popup-box {
	width: 600px;
	height: 300px;
	background-color: white;
	/* border: 2px solid #28a745; Green border to match the theme */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
}

	.popup-box {
	width: 600px;
	height: 188px;
	background-color: white;
	/* border: 2px solid #28a745; Green border to match the theme */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	position: absolute;
	top: 28px;  /* Adjust to position under the clickable text */
	left: -18px;  /* Align with the right side of the left section */
	z-index: 20;
	padding: 20px;
}

	.add-scenes-button {
		position: absolute;
		bottom: 20px; /* Position below the top-section */
		right: 42px; /* Align to the right side */
		background-color: #28a745; /* Green background */
		color: white;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.2s;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow */
	}

	.add-scenes-button:hover {
		background-color: #218838; /* Darker green on hover */
		transform: translateY(-5px); /* Lift effect on hover */
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
		left: 451px;
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
