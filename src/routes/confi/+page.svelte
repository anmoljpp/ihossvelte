<script>
    import { goto } from '$app/navigation';

    let showPopup = false; // Controls the visibility of the popup
    let searchQuery = ''; // Holds the value of the search input
    let selectedIntegrations = []; // Stores selected integrations

    function GoTODashboard() {
        goto('/dashboard');
    }

    function GoToFloor() {
        goto('/floor');
    }

    function togglePopup() {
        showPopup = !showPopup;
    }

    function handleSearch(event) {
        searchQuery = event.target.value;
    }

    function closePopup() {
        showPopup = false;
    }

    // Add selected integration to the list
    function addIntegration(integration) {
        if (!selectedIntegrations.includes(integration)) {
            selectedIntegrations = [...selectedIntegrations, integration];
        }
    }

    // List of hardcoded integrations (brands)
    const integrations = [
        'APPLE', 'aqara', 'mi', 'xiaomi', 'TUYA', 'amazon alexa', 'google-cast', 
        'esphone', 'blink', 'zigbee home automation', 'KNX', 'ring', 'smart things', 
        'matter', 'nanoleaf', 'genric camera', 'onvif', 'reolink', 'broadlink', 
        'lutron', 'phillips hue', 'sonoff', 'shelly', 'deCONZ', 'matt broker', 
        'tasmota', 'tapo', 'tplink', 'z-wave', 'local tuya', 'control4', 'crestran', 
        'unifi', 'android TV', 'amazon fire TV', 'B&O', 'denon AVR', 'LG', 'phillips TV', 
        'sonos', 'sony', 'tesla', 'xiaomi TV', 'LG webos TV', 'Bluetooth', 'proximity', 
        'parasonic', 'samsung smart TV', 'huawei', 'hikivision', 'hitachi', 'echobee', 'thread'
    ];
</script>

<div class="container">
    <!-- Steps Section -->
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

<!-- Border Container -->
<div class="border">
    <div class="configured-heading">Configured</div>
    <!-- Display the selected integrations -->
    <div class="configured-list">
        {#each selectedIntegrations as integration}
            <div class="configured-item">{integration}</div>
        {/each}
    </div>
    <button class="add-integration-button" on:click={togglePopup}>Add Integration</button>
</div>

<!-- Right and Left Navigation Icons -->
<div class="rights">
    <img src="/logo/right.png" alt="Forward Icon" on:click={GoTODashboard} />
</div>

<div class="left">
    <img src="/logo/left.png" alt="Forward Icon" on:click={GoToFloor} />
</div>

<!-- Popup Modal -->
{#if showPopup}
    <div class="popup-overlay" on:click={closePopup}>
        <div class="popup-content" on:click|preventDefault>
            <!-- Close Button -->
            <button class="close-popup-btn" on:click={closePopup}>Close</button>
            <input 
                type="text" 
                class="search-bar" 
                placeholder="Search for a brand" 
                bind:value={searchQuery} 
                on:input={handleSearch}
            />
            <div class="integration-list">
                <!-- Filtered integration items based on search query -->
                {#each integrations.filter(integration => integration.toLowerCase().includes(searchQuery.toLowerCase())) as integration}
                    <div class="integration-item" on:click={() => addIntegration(integration)}>
                        {integration}
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    .rights img,
    .left img {
        width: 79px;
        height: 112px;
    }

    .rights {
        position: absolute;
        right: -6px;
        top: 450px;
    }

    .left {
        position: absolute;
        left: -6px;
        top: 450px;
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
        padding: 20px;
    }

    .configured-heading {
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 40px;
        font-weight: bold;
        color: #333;
    }

    .configured-list {
        margin-top: 60px;
        font-size: 16px;
    }

    .configured-item {
        padding: 10px;
        font-size: 18px;
        border-bottom: 1px solid #ddd;
    }

    .add-integration-button {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 50px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-integration-button:hover {
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

    .step:last-child .progress-line {
        display: none;
    }
    
    /* Popup Modal Styles */
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .popup-content {
        background: white;
        padding: 56px;
        border-radius: 10px;
        width: 80%;
        max-width: 600px;
        position: relative;
        height: 70%;
        overflow-y: auto;
    }

    .close-popup-btn {
        position: absolute;
        bottom: 20px;
        right: 193px;
        font-size: 16px;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        height: 70px;
        width: 220px;
    }

    .close-popup-btn:hover {
        background-color: #0056b3;
    }

    .search-bar {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .integration-list {
        max-height: 400px;
        overflow-y: auto;
    }

    .integration-item {
        padding: 10px;
        font-size: 18px;
        border-bottom: 1px solid #ddd;
    }

    .integration-item:hover {
        background-color: #f1f1f1;
    }
</style>
