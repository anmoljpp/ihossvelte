<script>
  import { onMount } from 'svelte';
  import { entities, connect } from '$lib/websocket';
  import { writable, get } from 'svelte/store';
  import { goto } from '$app/navigation';

  export const isEditing = writable(false);

  const selectedEntities = writable([]);

  onMount(() => {
    connect();
    const storedEntities = JSON.parse(localStorage.getItem('selectedEntities')) || [];
    selectedEntities.set(storedEntities);
  });

  const toggleSelection = (entityId) => {
    selectedEntities.update(current => {
      if (current.includes(entityId)) {
        return current.filter(id => id !== entityId);
      } else {
        return [...current, entityId];
      }
    });
  };

  const saveEntities = () => {
    localStorage.setItem('selectedEntities', JSON.stringify(get(selectedEntities)));
    goto('/dashboard');
    goto('/scenes');
  };
</script>

<main>
  <h1>Edit Dashboard</h1>

  <!-- Select Device Box with scrollable list -->
  <div class="select-device-box">
    <h2>Select Devices</h2>
    <div class="device-list">
      {#each $entities as entity (entity.entity_id)}
        <div class="entity">
          <p>{entity.attributes.friendly_name}</p>
          <input type="checkbox" checked={$selectedEntities.includes(entity.entity_id)} on:change={() => toggleSelection(entity.entity_id)} />
        </div>
      {/each}
    </div>
  </div>

  <!-- Continue Button -->
  <button on:click={saveEntities}>Continue</button>

</main>

<style>

  /* :global(body){
    background-color: rgb(16, 42, 90);
  } */

  h1{
    font-size: 50px;
  }
  main {
    text-align: center;
    padding: 1rem;
    margin-top: 134px;
    background-color: rgb(212, 217, 205);
  }

  .select-device-box {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    height: 500px; /* Increase the height to make the box taller */
  }

  .device-list {
    max-height: 80%; /* Adjust the height inside the box */
    overflow-y: auto; /* Make the list scrollable */
    margin-top: 1rem;
    padding-right: 10px; /* Add some space on the right for the scrollbar */
  }

  .entity {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .entity p {
    margin: 0;
  }

  .entity input {
    margin-left: 10px;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Optional: Customize scrollbar */
  .device-list::-webkit-scrollbar {
    width: 8px;
  }

  .device-list::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  .device-list::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
</style>
