import { writable } from 'svelte/store';

export const entities = writable([]);

let socket;
const url = 'ws://192.168.1.41:6969/api/websocket';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwZjRiMjMxODk2OGQ0OTc5ODUwZWExMDlkN2NiNGQwNiIsImlhdCI6MTczODU4ODUzMiwiZXhwIjoyMDUzOTQ4NTMyfQ.AjxVUEHrtxht0gsetXu7J2phKRTjPO5IRhJJml9m2WY';

export const connect = () => {
  socket = new WebSocket(url);
  socket.onopen = () => {
    // Authenticate with Home Assistant WebSocket API
    socket.send(JSON.stringify({ type: 'auth', access_token: token }));
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    
    if (message.type === 'auth_ok') {
      // Request initial states
      socket.send(JSON.stringify({ id: 1, type: 'get_states' }));

      // Subscribe to state_changed events for real-time updates
      const subscriptionMessage = {
        id: 2, // Unique ID for the subscription request
        type: 'subscribe_events',
        event_type: 'state_changed'
      };
      socket.send(JSON.stringify(subscriptionMessage));
      console.log("Subscribed to state_changed events");
    } 
    
    // Handle initial state response
    else if (message.type === 'result' && message.id === 1) {
      entities.set(message.result);
    } 
    
    // Handle real-time updates for entity state changes
    else if (message.event && message.event.event_type === 'state_changed') {
      const updatedEntityId = message.event.data.entity_id;
      const newState = message.event.data.new_state;

      entities.update((currentEntities) =>
        currentEntities.map((entity) =>
          entity.entity_id === updatedEntityId
            ? { ...entity, state: newState.state } // Update the specific entity state
            : entity
        )
      );
    }
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const toggleEntity = (entityId, currentState) => {
  const newState = currentState === 'on' ? 'off' : 'on';
  socket.send(
    JSON.stringify({
      id: new Date().getTime(), // Unique ID for each request
      type: 'call_service',
      domain: 'homeassistant',
      service: `turn_${newState}`,
      service_data: { entity_id: entityId },
    })
  );

  // Optimistically update the state in the UI
  entities.update((current) =>
    current.map((entity) =>
      entity.entity_id === entityId ? { ...entity, state: newState } : entity
    )
  );
};
