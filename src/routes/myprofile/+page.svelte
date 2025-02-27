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

	// Variable to hold the selected country
	let selectedCountry = 'India'; // Default selected country

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
			<h2>My Profile</h2>
		</div>

		<!-- Settings Box -->
		<div class="profile-box">
			<div class="profile-heading">
				<h2>My Profile</h2>
			</div>
			<div class="profile-details">
				<!-- Editable Fields -->
				<div class="profile-item">
					<label for="name">Name:</label>
					<input
						type="text"
						id="name"
						bind:value={$userDetails.name}
						on:input={(e) => handleInputChange('name', e.target.value)}
					/>
				</div>
				<div class="profile-item">
					<label for="username">Username:</label>
					<input
						type="text"
						id="username"
						bind:value={$userDetails.username}
						on:input={(e) => handleInputChange('username', e.target.value)}
					/>
				</div>
				<div class="profile-item">
					<label for="email">Email:</label>
					<input
						type="email"
						id="email"
						bind:value={$userDetails.email}
						on:input={(e) => handleInputChange('email', e.target.value)}
					/>
				</div>
				<div class="profile-item">
                    <label for="country">Country:</label>
                    <select id="country" bind:value={selectedCountry}>
                      {#each countries as country}
                        <option value={country}>{country}</option>
                      {/each}
                    </select>
                  </div>
				  <button class="edit-button" on:click={saveProfile}>Save Profile</button>
				<div class="profile-actions">
                    <div class="action-buttons">
						<button class="asdf" on:click={goToHome}>Manage Home</button>
						<button class="asdf" on:click={goToEditPage}>Edit Profile</button>
                        <button class="asdf" on:click={goToChangePass}>Change Password</button>
                    </div>
				</div>
			</div>
            
		</div>
		<!-- edit dashboard button -->
		{#if $showPlusButton}
			<button class="plus-button" on:click={goToEditPage}>
				<img src="/logo/plus.png" alt="" />
			</button>
		{/if}
	</div>
</main>

<style>/* Container for buttons */
   
   .asdf {
	height: 50px;
	width: 100px;
	font-size: 12px;
   }
    
   .action-buttons {
	display: flex;
flex-direction: row;
gap: 125px;
   }
    /* Common button styling */
    .edit-button {
        background-color: #28a745;
        color: white;
        font-size: 16px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        width: 100%; /* Buttons will take full width, stacked vertically */
        margin-bottom: 10px; /* Space between buttons */
    }
    
    .edit-button:hover {
        background-color: #218838;
        transform: translateY(-3px);
    }
    
    .edit-button:active {
        transform: translateY(1px);
    }
    

    .profile-item select {
    padding: 10px;
    font-size: 16px;
    font-weight: 1;
    color: #333;
    background-color: #f1f8f4;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    appearance: none; /* For custom arrow styling */
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY2hlbWFzIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3Z2Ij4KPHBhdGggZD0iTTEwIDYwTDEzIDE2TDE3IDE2TDEwIDYwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgZmlsbC1ydWxlPSJldmVuIGxpbmVhciIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0ibm9uZSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
  }

  .profile-item select:focus {
    outline: none;
    border-color: #28a745;
  }
	.profile-box {
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin: 0 auto;
		font-family: 'Arial', sans-serif;
	}

	.profile-heading h2 {
		font-size: 28px;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 20px;
	}

	.profile-details {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.profile-item {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.profile-item label {
		font-size: 16px;
		color: #555;
		font-weight: 100px;
	}

	.profile-item input {
		padding: 10px;
		font-size: 16px;
        font-weight: 1;;
		color: #333;
		background-color: #f1f8f4;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 100%;
		cursor: pointer; /* Disable input for readonly fields */
		width: 545px;
	}

	.profile-item input:focus {
		outline: none;
		border-color: #28a745; /* Green border when focused */
	}

	


	.edit-button {
		background-color: #28a745;
		color: white;
		font-size: 16px;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.edit-button:hover {
		background-color: #218838;
		transform: translateY(-3px);
	}

	.edit-button:active {
		transform: translateY(1px);
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

	.profile-box {
		display: flex;
		flex-direction: column;
		align-items: center; /* Center items horizontally */
		justify-content: center; /* Center items vertically */
		width: 648px; /* Take full height of the right section */
		position: absolute;
		top: 164px;
		left: 350px;
		/* border: 2px solid black; */
		height: 626px;
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
