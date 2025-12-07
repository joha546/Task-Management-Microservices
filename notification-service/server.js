import start from './config/rabbitmq.js';

async function init() {
  try {
    await start();
    console.log('Notification service ready');
  } catch (err) {
    console.error('Notification service failed to start:', err.message);
    process.exit(1);
  }
}

init();