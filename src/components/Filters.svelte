<script>
  import { createEventDispatcher } from 'svelte';

  export let value = '';

  const dispatch = createEventDispatcher();
  let visible = false;

  function setValue(num) {
    return function () {
      value = num;
      submit();
    };
  }
  function submit() {
    dispatch('submit');
  }
</script>

<div class="filters">
  <button on:click={() => (visible = !visible)}>Bedrooms</button>
  <div class={'filters__options ' + (visible ? 'visible' : '')}>
    <button on:click={setValue(0)}>Studio</button>
    <button on:click={setValue(1)}>1</button>
    <button on:click={setValue(2)}>2</button>
    <button on:click={setValue(3)}>3</button>
    <button on:click={setValue(4)}>4</button>
  </div>
</div>

<style>
  button {
    padding-right: 24px;
    margin: 0;
    height: 100%;
    width: 100%;
  }
  .filters {
    font-size: 14px;
    margin: 0 16px 0.5em 0;
    position: relative;
    width: auto;
  }
  .filters__options {
    display: none;
  }
  .visible {
    display: flex;
    background: white;
    box-shadow: -10px 10px 17px 0 rgba(0, 0, 0, 0.28);
    position: absolute;
    top: 50px;
    left: 0;
    padding: 16px;
  }
  .filters__options button {
    background: white;
    border: 1px solid #ccc;
    border-right: 0;
    border-radius: 0;
    text-align: center;
    padding: 6px 12px;
  }
  .filters__options button:last-of-type {
    border-right: 1px solid #ccc;
  }
</style>
