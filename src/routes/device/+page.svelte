<div class="heading">Devices</div>

<button class="Bbutton">Back</button>
<button class="Cbutton">Continue</button>
<button class="button">+ Add Device</button>

<style>

    :global(body){
        background-color: white;
    }
    
    .heading {
        font-size: 50px;
        margin-left: 30px;
        margin-top: 20px;
        position: relative;
    }

    .heading::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px; /* Adjust distance from text */
        width: 95%;
        height: 6px; /* Adjust thickness of the line */
        background-color: rgb(46, 41, 41); /* Change the color of the underline */
    }

    .button {
        border: 1px solid black;
        font-size: 30px;
        border-radius: 5px;
        height: 74px;
        width: 191px;
        position: absolute;
        bottom: 50px;
        right: 60px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .button:hover {
        background-color: green;
        transform: translateY(-5px);
    }

    .Cbutton {
        border: 1px solid black;
        font-size: 30px;
        border-radius: 5px;
        height: 74px;
        width: 191px;
        position: absolute;
        bottom: 50px;
        right: 281px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .Cbutton:hover {
        background-color: green;
        transform: translateY(-5px);
    }

    .Bbutton {
        border: 1px solid black;
        font-size: 30px;
        border-radius: 5px;
        height: 74px;
        width: 191px;
        position: absolute;
        bottom: 50px;
        right: 500px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .Bbutton:hover {
        background-color: green;
        transform: translateY(-5px);
    }
</style>
