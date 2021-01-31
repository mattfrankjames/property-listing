import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    ready: false,
  },
});

// Tells the window when Google maps script is ready
window.initMap = function ready() {
  app.$set({ ready: true });
};

export default app;
