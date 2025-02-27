<script>
	import { goto } from '$app/navigation';
	 import { onMount } from 'svelte';

let wifiDropdownVisible = false;
let wifiSSID = '';
let wifiPassword = '';
let availableNetworks = [];

async function fetchWiFiNetworks() {
try {
	const response = await fetch("http://192.168.1.111:5000/");
	const data = await response.json();
	
	if (data.error) {
		console.error("Error fetching networks:", data.error);
		availableNetworks = ["Error fetching networks"];
	} else {
		availableNetworks = data
			.filter(net => net.ssid) // Remove empty SSIDs
			.map(net => net.ssid);   // Extract only SSID values
	}
} catch (error) {
	console.error("Error fetching WiFi networks:", error);
	availableNetworks = ["Error fetching networks"];
}
}


function toggleDropdown() {
	wifiDropdownVisible = !wifiDropdownVisible;
	if (wifiDropdownVisible) {
		fetchWiFiNetworks();
	}
}

function selectWiFi(ssid) {
	wifiSSID = ssid;
	wifiDropdownVisible = false;
}

async function connectWiFi() {
	if (wifiSSID || wifiPassword) {
		alert(wifiSSID, wifiPassword);
		return;
	}

	try {
		const response = await fetch('http://192.168.1.111:5000', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ssid: wifiSSID, password: wifiPassword }),
		});

		const result = await response.json();
		alert(result.status); // Display connection status
	} catch (error) {
		console.error('Error connecting to WiFi:', error);
	}
}

function GoToFloor() {
	goto('/floor');
}

function GoToHub() {
	goto('/selecthub');
}

</script>

<!-- Progress Bar Section -->
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
	<!-- Wi-Fi Connect Section -->
	<div class="input-container">
		<label for="wifi-ssid">Select Wi-Fi SSID:</label>
		<button class="wifi-select-btn" on:click={toggleDropdown}>
			{wifiSSID ? wifiSSID : 'Click to select Wi-Fi SSID'}
		</button>

		{#if wifiDropdownVisible}
		<div
			id="wifi-dropdown"
			class="wifi-dropdown"
			style:display={wifiDropdownVisible ? 'block' : 'none'}
		>
			<!-- Dropdown list of available networks -->
			{#each availableNetworks as ssid}
            <div class="wifi-dropdown-item" on:click={() => selectWiFi(ssid)}>
                {ssid}
            </div>
        {/each}
		</div>
		{/if}

		<!-- Add 'OR' text here -->
		<div class="or-text">OR</div>

		<label for="wifi-password">Enter SSID</label>
		<input type="password" id="wifi-password" placeholder="Enter SSID here" />

		<label for="wifi-password">Enter Wi-Fi Password:</label>
		<input type="password" id="wifi-password" placeholder="Enter Wi-Fi Password here" />

		<button>Connect</button>
	</div>
</div>

<div class="rights">
	<img src="/logo/right.png" alt="Forward Icon" on:click={GoToFloor}/>
</div>

<div class="left">
	<img src="/logo/left.png" alt="Forward Icon" on:click={GoToHub}/>
</div>

<style>
	.wifi-select-btn {
		width: 467px;
		padding: 10px 20px;
		background-color: #007bff;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		margin-top: 17px;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 513px;
		height: 457px;
		margin: 50px auto;
		padding: 20px;
		border: 2px solid #007bff;
		border-radius: 10px;
		background-color: #f9f9f9;
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.input-container label {
		font-size: 18px;
		margin-bottom: 10px;
	}

	.input-container input {
		padding: 10px;
		font-size: 16px;
		width: 100%;
		margin-bottom: 15px;
		border-radius: 5px;
		border: 2px solid #007bff;
	}

	.input-container button {
		padding: 10px 20px;
		background-color: #007bff;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		margin-bottom: 14px;
	}

	.input-container button:hover {
		background-color: #0056b3;
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
		border: 4px solid #007bff;
		background: #007bff;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
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

	.border {
		border: 2px solid black;
		height: 818px;
		width: 93%;
		margin-left: 64px;
		margin-top: 19px;
		border-radius: 10px;
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


	.wifi-dropdown {
		position: absolute;
		bottom: 81%; /* This will make it appear above the button */
		width: 100%;
		border: 1px solid #ddd;
		background-color: #fff;
		max-height: 500px; /* Increase the height for a bigger dropdown */
		overflow-y: auto;
		border-radius: 5px;
		z-index: 10;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add some shadow for better visibility */
		display: block;
		height: 386px;
		width: 467px;
	}
	.wifi-dropdown-item {
		padding: 12px;
		cursor: pointer;
		font-size: 16px; /* You can adjust the font size here */
	}

	.wifi-dropdown-item:hover {
		background-color: #f0f0f0;
	}
</style>
