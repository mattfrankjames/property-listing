<script>
  export let lat, lng;
  let container;
  $: map = '';
  let zoom = 15;
  let center = { lat, lng };
  import { afterUpdate } from 'svelte';
  afterUpdate(async () => {
    console.log(center);
    map = new google.maps.Map(container, {
      zoom,
      center,
    });
    const marker = new google.maps.Marker({
      position: center,
      map: map,
    });
  });
</script>

<div class="full-screen" bind:this={container} />

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
