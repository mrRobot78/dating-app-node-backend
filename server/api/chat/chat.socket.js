/* eslint-disable import/prefer-default-export */


import ChatEvents from './chat.events';

// Model events to emit
const events = ['save', 'remove'];
function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    ChatEvents.removeListener(event, listener);
  };
}
export function ChatSocket(socket) {
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    const event = events[i];
    const listener = createListener(`Chat:${event}`, socket);

    ChatEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

