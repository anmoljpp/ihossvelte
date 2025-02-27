<script>
	import { goto } from '$app/navigation';
import { writable } from 'svelte/store';

	let floorTitle = writable(''); // Store for the floor title (name)
	let floorLevel = writable(''); // Store for the floor level
	let floorTitleValue = ''; // Local variable to hold the floor title input
	let floorLevelValue = ''; // Local variable to hold the floor level input
	let rooms = writable([]); // Store for rooms (name and level)
	let roomName = ''; // Local variable for room name
	let roomLevel = ''; // Local variable for room level

	let floorNumbers = [1, 2, 3, 4, 5]; // Example floor levels

	// Function to open the modal for floor
	function openModal() {
		document.getElementById('floorModal').style.display = 'block';
	}

	// Function to close the modal for floor
	function closeModal() {
		document.getElementById('floorModal').style.display = 'none';
	}

    function GoToConfi() {
        goto('/confi');
    }

    function GoToWifi() {
        goto('/wifisetup');
    }

	// Function to handle floor form submission
	function createFloor() {
		if (floorTitleValue && floorLevelValue) {
			floorTitle.set(floorTitleValue); // Store the floor title
			floorLevel.set(floorLevelValue); // Store the floor level
			closeModal(); // Close the modal after creating the floor
			floorTitleValue = ''; // Clear the input fields
			floorLevelValue = '';
		} else {
			alert('Please enter both floor title and floor level');
		}
	}

	// Function to handle room form submission
	function createRoom() {
		if (roomName && roomLevel) {
			// Add the new room to the store
			rooms.update((currentRooms) => [...currentRooms, { roomName, roomLevel }]);
			roomName = ''; // Clear room name input
			roomLevel = ''; // Clear room level input
		} else {
			alert('Please enter both room name and room level');
		}
	}
</script>

<div class="container">
	<div class="steps">
		<div class="step">
			<span class="circle">1</span>
			<span class="step-text">Create Account</span>
			<div class="progress-line"></div>
		</div>
		<div class="step">
			<span class="circle">2</span>
			<span class="step-text">Wifi setup</span>
			<div class="progress-line"></div>
		</div>
		<div class="step">
			<span class="circle">3</span>
			<span class="step-text">Create Areas</span>
			<div class="progress-line"></div>
		</div>
		<div class="step">
			<span class="circle">4</span>
			<span class="step-text">Finish</span>
		</div>
	</div>
</div>

<div class="border">
	<!-- This will only show after creating a floor -->
	{#if $floorTitle}
		<div class="heading">
			<span class="floor-name">{$floorTitle}</span>
			<div class="underline"></div>
		</div>
	{/if}

	<!-- Button for creating floors -->
	<button class="create-floor-button" on:click={openModal}>Create Floor</button>

	<!-- Button for creating rooms -->
	<button
		class="create-rooms-button"
		on:click={() => (document.getElementById('roomModal').style.display = 'block')}
		>Create Rooms</button
	>

	<!-- Modal for creating floor -->
	<div id="floorModal" class="modal">
		<div class="modal-content">
			<span class="close" on:click={closeModal}>&times;</span>
			<h2>Let's create your floor</h2>

			<form on:submit|preventDefault={createFloor}>
				<div>
					<label for="floor-title">Create your floor:</label>
					<input
						type="text"
						id="floor-title"
						name="floor-title"
						bind:value={floorTitleValue}
						placeholder="Enter Floor Name"
						required
					/>
				</div>

				<div>
					<label for="floor-level">Write your floor level:</label>
					<input
						type="text"
						id="floor-level"
						name="floor-level"
						bind:value={floorLevelValue}
						placeholder="Enter Floor Level"
						required
					/>
				</div>

				<button type="submit">Create</button>
			</form>
		</div>
	</div>

	<!-- Modal for creating rooms -->
	<div id="roomModal" class="modal">
		<div class="modal-content">
			<span
				class="close"
				on:click={() => (document.getElementById('roomModal').style.display = 'none')}>&times;</span
			>
			<h2>Let's create your room</h2>

			<form on:submit|preventDefault={createRoom}>
				<div>
					<label for="room-name">Room Name:</label>
					<input
						type="text"
						id="room-name"
						name="room-name"
						bind:value={roomName}
						placeholder="Enter Room Name"
						required
					/>
				</div>

				<div>
					<label for="room-level">Select Floor Level:</label>
					<!-- Dropdown for selecting floor -->
					<select id="room-level" name="room-level" bind:value={roomLevel} required>
						<option value="">Select Floor</option>
						{#each floorNumbers as floor}
							<option value={floor}>Floor {floor}</option>
						{/each}
					</select>
				</div>

				<button type="submit">Create Room</button>
			</form>
		</div>
	</div>

	<!-- Display the rooms dynamically with just the room name -->
	<div class="rooms-container">
		{#each $rooms as room}
			<div class="room-item">
				<p><strong>{room.roomName}</strong></p> <!-- Only show the room name -->
			</div>
		{/each}
	</div>
</div>

<div class="rights">
    <img src="/logo/right.png" alt="Forward Icon" on:click={GoToConfi}>
</div>

<div class="left">
    <img src="/logo/left.png" alt="Forward Icon" on:click={GoToWifi}>
</div>

<style>
	:global(body) {
		background-color: white;
	}
     
    .rights img {
        width: 79px;
        height: 112px;
    }

    .rights {
        position: absolute;
        right: -6px;
        top: 450px;
    }

    .rights:hover img {
        border-radius: 100px;
        cursor: pointer;
        width: 81px;
        height: 114px;
    }

    .left img {
        width: 79px;
        height: 112px;
    }

    .left {
        position: absolute;
        left: -6px;
        top: 450px;
    }

    .left:hover img {
        border-radius: 100px;
        cursor: pointer;
        width: 81px;
        height: 114px;
    }

	.container {
        max-width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 14px;
    }

    .steps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 94%;
        position: relative;
    }

    .step {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        color: #fff;
        font-size: 22px;
        font-weight: 500;
        border-radius: 50%;
        border: 4px solid #007BFF;
        background: #007BFF;
        transition: background-color 0.3s ease, color 0.3s ease;
        z-index: 2;
    }

    .step-text {
        font-size: 16px;
        font-weight: 500;
        margin-left: 20px;
        color: #333;
        white-space: nowrap;
    }

    .progress-line {
        width: 197%;
        height: 6px;
        background: #ddd;
        position: absolute;
        left: 190px;
        top: 50%;
        z-index: 1;
        border-radius: 3px;
        transition: background-color 0.3s ease;
    }

    /* Step 1 to 2: 100% blue */
    .progress-line-1 {
        background: #ddd; /* Keep it gray */
    }

    /* Step 2 to 3: 100% blue */
    .step:nth-child(2) .progress-line {
        background: #ddd;
        width: 242%;
        margin-left: -30px;
    }

    /* Step 3 to 4: No progress line */
    .progress-line-3 {
        background: #ddd; /* Keep it gray */
    }

    /* Step 4: No progress line */
    .step:last-child .progress-line {
        display: none;
    }

	.create-floor-button,
	.create-rooms-button {
		width: 300px;
		height: 75px;
		border: 2px solid black;
		border-radius: 10px;
		margin: 10px;
		background-color: rgb(239, 248, 239);
		transition:
			background-color 0.3s,
			transform 0.2s;
	}

	.create-floor-button:hover,
	.create-rooms-button:hover {
		background-color: green;
		transform: translateY(-5px);
	}

	.create-floor-button {
		position: absolute;
		bottom: 30px;
		left: 605px; /* Space from the bottom of the screen */
	}

	.create-rooms-button {
		position: absolute;
		left: 935px;
		bottom: 30px; /* Space from the bottom of the screen */
	}

	.heading {
		font-size: 50px;
		position: relative;
	}

	.floor-name {
		margin-left: 10px; /* Adds the margin-left to the floor title */
	}

	.underline {
		height: 2px;
		background-color: black;
		width: 100%;
		margin-top: 10px;
	}

	/* Modal styles */
	.modal {
		display: none; /* Hidden by default */
		position: fixed;
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4); /* Black background with opacity */
	}

	.modal-content {
		background-color: white;
		margin: 25% auto;
		padding: 20px;
		border: 1px solid #888;
		border-radius: 10px;
		width: 400px;
		text-align: center;
		position: relative;
	}

	.close {
		color: #aaa;
		font-size: 30px;
		font-weight: bold;
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	form {
		margin-top: 20px;
	}

	input[type='text'],
	select {
		padding: 8px;
		width: 80%;
		margin-bottom: 15px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	button[type='submit'] {
		padding: 10px 15px;
		background-color: green;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button[type='submit']:hover {
		background-color: darkgreen;
	}

	/* Room display styles */
	.rooms-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px; /* Space between the rooms */
		margin-top: 42px;
		margin-left: 77px;
		width: 91%;
	}

	.room-item {
		width: 297px;
		height: 80px;
		background-color: #fff;
		padding: 15px;
		border-radius: 10px;
		border: 2px solid #ccc;
        font-size: 30px;
        
	}

	.room-item p {
		margin: 0;
	}

	.border {
		border: 2px solid black;
		height: 818px;
		width: 93%;
		margin-left: 64px;
		margin-top: 19px;
		border-radius: 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
</style>