<script>
	import { goto } from '$app/navigation';

	let currentStep = 1;

	let homeCount = 0;

	function initProgressBar() {
		if (currentStep >= 2) {
			document.querySelector('.progress-line-1').style.backgroundColor = '#007BFF';
		}
		if (currentStep >= 3) {
			document.querySelector('.progress-line-2').style.background =
				'linear-gradient(to right, #007BFF 10%, #ddd 10%)';
		}
		if (currentStep >= 4) {
			document.querySelector('.progress-line-3').style.backgroundColor = '#ddd';
		}
	}

	// Function to toggle the dropdown (show or hide the popup)
	function toggleDropdown(homeIndex) {
		const popup = document.getElementById(`popup-${homeIndex}`);
		if (popup.style.display === 'none' || popup.style.display === '') {
			popup.style.display = 'block'; // Show the popup
		} else {
			popup.style.display = 'none'; // Hide the popup
		}
	}

	// Function to handle editing the name
	function editName(homeIndex) {
		const homeName = document.getElementById(`headingText-${homeIndex}`).textContent;
		document.getElementById(`editInput-${homeIndex}`).value = homeName; // Set the current name into the input
		const popup = document.getElementById(`popup-${homeIndex}`);
		popup.style.display = 'block'; // Show the popup
	}

	// Function to update the name
	function updateName(homeIndex) {
		const newName = document.getElementById(`editInput-${homeIndex}`).value;
		if (newName.trim() !== '') {
			document.getElementById(`headingText-${homeIndex}`).textContent = newName; // Update the home name
			closePopup(homeIndex); // Close the popup
		} else {
			alert('Please enter a name.');
		}
	}

	// Function to delete the home
	function deleteItem(homeIndex) {
		const homeElement = document.getElementById(`home-${homeIndex}`);
		homeElement.remove(); // Remove the home from the container
		closePopup(homeIndex); // Close the popup
	}

	// Function to close the popup
	function closePopup(homeIndex) {
		const popup = document.getElementById(`popup-${homeIndex}`);
		popup.style.display = 'none'; // Close the popup
	}

	function GoToIhos() {
		goto('/selecthub');
	}

	function showCreateHomePopup() {
		document.querySelector('.create-home-popup').style.display = 'block';
	}

	function createHome() {
		var homeName = document.getElementById('newHomeName').value;
		if (homeName.trim() !== '') {
			homeCount++; // Increment the home count

			// Create the new home HTML dynamically
			const newHomeHTML = `
    <div class="home" id="home-${homeCount}" style="border: 2px solid #007BFF; border-radius: 10px; height: 236px; width: 268px; margin-left: 20px; margin-top: 20px; position: relative; text-align: center; transition: border-color 0.3s ease; flex-shrink: 0; box-sizing: border-box;">

        <!-- Three dots at the top-right -->
        <div class="dots" onclick="toggleDropdown(${homeCount})" style="position: absolute; top: 10px; right: 10px; font-size: 30px; cursor: pointer; transition: transform 0.3s ease;">
            &#x22EE;
        </div>

        <!-- House image -->
        <img src="/logo/home.png" alt="" style="height: 150px; width: auto; position: relative; left: 59px; top: 22px;">

        <!-- Home name under the house image -->
        <div class="text" id="headingText-${homeCount}" style="margin-top: 10px; font-size: 38px; font-weight: bold;">
            ${homeName}
        </div>

        <!-- Popup for edit and delete -->
        <div class="popup" id="popup-${homeCount}" style="display: none; position: absolute; top: 10px; right: -170px; background-color: #f1f1f1; min-width: 160px; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); z-index: 1;">
            <div class="popup-content" style="padding: 12px 16px; text-align: center;">
                <input type="text" id="editInput-${homeCount}" placeholder="Enter new name" style="padding: 5px; font-size: 16px; width: 100%; margin-bottom: 10px; border-radius: 5px; border: 2px solid #007BFF;">
                <button onclick="updateName(${homeCount})" style="padding: 10px; font-size: 16px; cursor: pointer; background-color: #007BFF; color: #fff; border-radius: 10px; width: 100%; border: none;">Update</button>
                <button onclick="deleteItem(${homeCount})" style="padding: 10px; font-size: 16px; cursor: pointer; background-color: red; color: #fff; border-radius: 10px; width: 100%; margin-top: 10px; border: none;">Delete</button>
                <button onclick="closePopup(${homeCount})" style="padding: 10px; font-size: 16px; cursor: pointer; background-color: gray; color: #fff; border-radius: 10px; width: 100%; margin-top: 10px; border: none;">Close</button>
            </div>
        </div>

    </div>
`;

			// Add the new home to the container
			document.querySelector('#homeContainer').insertAdjacentHTML('beforeend', newHomeHTML);

			// Reset the input field for new home name
			document.getElementById('newHomeName').value = '';

			// Update progress bar step
			currentStep = 2;
			initProgressBar();

			// Close the popup
			document.querySelector('.create-home-popup').style.display = 'none';
		} else {
			alert('Please enter a home name.');
		}
	}
</script>

<div class="container">
	<div class="steps">
		<div class="step">
			<span class="circle">1</span>
			<span class="step-text">Create Account</span>
			<div class="progress-line progress-line-1"></div>
		</div>
		<div class="step">
			<span class="circle">2</span>
			<span class="step-text">Create Home</span>
			<div class="progress-line progress-line-2"></div>
		</div>
		<div class="step">
			<span class="circle">3</span>
			<span class="step-text">Create Areas</span>
			<div class="progress-line progress-line-3"></div>
		</div>
		<div class="step">
			<span class="circle">4</span>
			<span class="step-text">Finish</span>
		</div>
	</div>
</div>

<div class="border">
	<div class="home-container" id="homeContainer">
		<!-- Homes will be dynamically added here -->
	</div>

	<div class="home" id="homeSection" style="display: none;">
		<img src="/logo/home.png" alt="" />
		<div class="text" id="headingText"></div>
		<div class="dots" on:click={toggleDropdown}>&#x22EE;</div>
		<div class="dropdown">
			<a href="#" on:click={editName}>Edit Name</a>
			<a href="#" on:click={deleteItem}>Delete</a>
		</div>
		<div class="edit-container" style="display: none;">
			<div class="editname">
				<input type="text" id="editInput" placeholder="Enter new name" />
				<button on:click={updateName}>Create</button>
			</div>
		</div>
	</div>

	<div class="create-home-btn">
		<button on:click={showCreateHomePopup}>Create Home</button>
	</div>

	<div class="create-home-popup" style="display: none;">
		<div class="popup-content">
			<input type="text" id="newHomeName" placeholder="Enter Home Name" />
			<button on:click={createHome}>Create</button>
		</div>
	</div>
</div>

<div class="rights">
	<img src="/logo/right.png" alt="Forward Icon" on:click={GoToIhos} />
</div>

<style>
	.home-container {
		display: flex;
		overflow-x: auto; /* Enable horizontal scroll */
		padding-bottom: 10px; /* Space for the scroll bar */
		gap: 20px; /* Space between homes */
		margin-top: 20px;
		padding-left: 20px; /* Ensure padding inside the container */
		width: 100%;
		max-width: 100%;
		justify-content: flex-start; /* Align homes to the left */
	}

	.border {
		border: 2px solid black;
		height: 818px;
		width: 93%;
		margin-left: 64px;
		margin-top: 19px;
		border-radius: 10px;
		overflow: hidden; /* Ensures the content stays within the border */
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
		background: #ddd; /* Make the line gray, remove blue background */
		position: absolute;
		left: 190px;
		top: 50%;
		z-index: 1;
		border-radius: 3px;
		transition: background-color 0.3s ease;
	}

	.progress-line-1 {
		background: #ddd; /* Remove blue, keep it gray */
	}

	.progress-line-2 {
		background: #ddd; /* Remove blue, keep it gray */
		margin-left: -10px;
		width: 205%;
	}

	.progress-line-3 {
		background: #ddd; /* Remove blue, keep it gray */
	}

	.step:last-child .progress-line {
		display: none;
	}

	.home {
		border: 2px solid #007bff;
		border-radius: 10px;
		height: 277px; /* Fixed height */
		width: 323px; /* Fixed width */
		margin-left: 20px; /* Adjusted margin for consistent spacing */
		margin-top: 20px; /* Adjusted margin for consistent spacing */
		position: relative;
		text-align: center;
		transition: border-color 0.3s ease;
		flex-shrink: 0; /* Prevent shrinking */
		box-sizing: border-box; /* Ensure the padding and borders are included in the size */
	}

	.home img {
		height: 100px;
		width: 200px;
		position: relative;
		left: 59px;
		top: 22px;
	}

	.text {
		margin-top: 10px;
		font-size: 38px;
		font-weight: bold;
	}

	.dots {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 30px;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.dots:hover {
		transform: scale(1.1); /* Slight zoom effect on hover */
	}

	.dropdown {
		display: none;
		position: absolute;
		top: 10px;
		right: -170px;
		background-color: #f1f1f1;
		min-width: 160px;
		box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	.dropdown a {
		padding: 12px 37px;
		text-decoration: none;
		display: block;
		color: black;
		font-size: 14px;
	}

	.dropdown a:hover {
		background-color: #ddd;
	}

	.edit-container {
		display: none;
		position: fixed;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		text-align: center;
	}

	.editname {
		border: 2px solid #007bff;
		border-radius: 10px;
		height: 222px;
		width: 500px;
		margin-bottom: 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.editname input {
		padding: 5px;
		font-size: 16px;
		width: 300px;
		margin-bottom: 10px;
		border-radius: 5px;
		border: 2px solid #007bff;
	}

	.editname button {
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
		background-color: #007bff;
		border-radius: 10px;
		width: 105px;
		margin-top: 7px;
		position: relative;
		top: 28px;
		color: #fff;
		border: none;
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

	.create-home-btn {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.create-home-btn button {
		padding: 15px 30px;
		font-size: 18px;
		background-color: #007bff;
		color: #fff;
		border-radius: 10px;
		border: none;
		cursor: pointer;
		margin-bottom: 34px;
	}

	.create-home-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border: 2px solid #007bff;
		padding: 30px;
		border-radius: 10px;
		text-align: center;
		display: none;
	}

	.create-home-popup input {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		margin-bottom: 15px;
		border-radius: 5px;
		border: 2px solid #007bff;
	}

	.create-home-popup button {
		padding: 10px 20px;
		font-size: 16px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
