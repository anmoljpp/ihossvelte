<script>
    import { goto } from "$app/navigation";

    let currentStep = 1;

    function initProgressBar() {
        // Update progress line colors based on the current step
        if (currentStep >= 2) {
            document.querySelector('.progress-line-1').style.backgroundColor = '#007BFF';
        }
        if (currentStep >= 3) {
            document.querySelector('.progress-line-2').style.backgroundColor = '#007BFF';
        }
        if (currentStep >= 4) {
            document.querySelector('.progress-line-3').style.backgroundColor = '#007BFF';
        }
    }

    function createHub() {
        const ihosAddress = document.getElementById('ihos-address').value;

        if (ihosAddress.trim() === "") {
            alert("Please enter your iHOS Hub address.");
        } else {
            alert(`Your iHOS Hub address is: ${ihosAddress}`);
            currentStep = 2;  // Move to 'Hub Connect' step
            initProgressBar(); // Update the progress bar
        }
    }

    function goTOHome() {
        goto('/hhome');
    }

    function goTOWifiSetup() {
        goto('/wifisetup');
    }
</script>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 513px;
        height: 324px;
        margin: 50px auto;
        padding: 20px;
        border: 2px solid #007BFF;
        border-radius: 10px;
        background-color: #f9f9f9;
        position: fixed;
        bottom: 20px;  /* Position the box 20px from the bottom */
        left: 50%;
        transform: translateX(-50%); /* Center it horizontally */
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
        border: 2px solid #007BFF;
    }

    .input-container button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        margin-top: 17px;
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
        background: #ddd; /* Make the line gray */
        position: absolute;
        left: 190px;
        top: 50%;
        z-index: 1;
        border-radius: 3px;
        transition: background-color 0.3s ease;
    }

    .progress-line-1 {
        background: #ddd; /* Keep it gray */
    }

    .progress-line-2 {
        background: #ddd; /* Keep it gray */
        margin-left: -10px;
        width: 205%;
    }

    .progress-line-3 {
        background: #ddd; /* Keep it gray */
    }

    .step:last-child .progress-line {
        display: none;
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
</style>

<!-- Progress Bar Section -->
<div class="container">
    <div class="steps">
        <div class="step">
            <span class="circle">1</span>
            <span class="step-text">Create Account</span>
            <div class="progress-line progress-line-1"></div>
        </div>
        <div class="step">
            <span class="circle">2</span>
            <span class="step-text">Hub Connect</span>
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
    <!-- iHOS Hub Address Section -->
    <div class="input-container">
        <label for="ihos-address">Enter your iHOS Hub Address:</label>
        <input type="text" id="ihos-address" placeholder="Enter your iHOS Hub address here" />
        <button on:click={createHub}>Create</button>
    </div>
</div>

<div class="rights">
    <img src="/logo/right.png" alt="Forward Icon" on:click={goTOWifiSetup}>
</div>

<div class="left">
    <img src="/logo/left.png" alt="Back Icon" on:click={goTOHome}>
</div>
