<div class="heading">Add Rooms</div>

<div class="floor">Room1</div>

<button class="leftbutton"><img src="/logo/left-icon.png" alt=""></button>
<button class="rightbutton"><img src="/logo/right-icon.png" alt=""></button>

<style>

    :global(body){
        background-color: white;
    }
    
    .heading {
        font-size: 50px;
        margin-left: 30px;
        margin-top: 20px;
    }

    .floor {
        font-size: 40px;
        margin-top: 38px;
        margin-left: 100px;
        position: relative;
    }

    .floor::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px; /* Adjust distance from text */
    width: 95%;
    height: 6px; /* Adjust thickness of the line */
    background-color: rgb(46, 41, 41); /* Change the color of the underline */
}

    .rightbutton {
        border: 2px solid black;
        font-size: 30px;
        height: 74px;
        width: 74px;
        border-radius: 50%;
        position: absolute;
        bottom: 50px;
        right: 160px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .rightbutton:hover {
        background-color: green;
        transform: translateY(-5px);
    }

    .leftbutton {
        border: 2px solid black;
        font-size: 30px;
        border-radius: 50%;
        height: 74px;
        width: 74px;
        position: absolute;
        bottom: 50px;
        right: 281px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .leftbutton img,
    .rightbutton img {
        display: initial;
    }
    
    .leftbutton:hover {
        background-color: green;
        transform: translateY(-5px);
    }
</style>
