<script>
  import Card from './components/Card.svelte';
  import Header from './components/Header.svelte';
  import Filters from './components/Filters.svelte';
  import Map from './components/Map.svelte';

  // Will not run Google Maps script until this is 'true'
  export let ready;

  let visible = false;
  let lowerLimit = '';
  let upperLimit = '';
  $: lat = '';
  $: lng = '';

  let filterValue;
  $: properties = fetchProperties();
  let fullListings;

  async function handleEvent(filter, upper) {
    // set properties to fullListings for repeat filtering
    properties = fullListings;
    properties = filterProperties(filter, upper);
  }
  async function fetchProperties() {
    const res = await fetch('/properties.json');
    const listings = await res.json();
    properties = await listings;
    // make a copy of listings for filtering. Avoids repeat fetch()
    fullListings = await listings;
  }

  async function filterProperties(filter, upper) {
    if (filter === 'descending') {
      return properties.sort((a, b) => b.price - a.price);
    } else if (filter === 'ascending') {
      return properties.sort((a, b) => a.price - b.price);
    } else if (filter && !upper) {
      return properties.filter((property) => property.unit.bedrooms === filterValue);
    } else if (filter && upper) {
      return properties.filter((property) => property.price >= filter && property.price <= upper);
    }
  }
  function showAllListings() {
    // set properties back to copy
    properties = fullListings;
  }
  function setCoords(latitude, longitude) {
    lat = latitude;
    lng = longitude;
  }
</script>

<svelte:head
  ><script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDaxsJ5GDZM0iGildmlnMra6PGfzMb4yX8&callback=initMap&libraries=&v=weekly">
  </script></svelte:head
>
<Header />
<div class="filter-list">
  <button class="button--caret" on:click={() => (visible = !visible)}
    >{visible ? 'Close' : 'Price'}</button
  >
  <form
    class={visible ? 'visible' : ''}
    on:submit|preventDefault={handleEvent(lowerLimit, upperLimit)}
  >
    <label for="minprice"
      >Min Price<input
        id="minprice"
        type="text"
        placeholder="ex: $500,000"
        bind:value={lowerLimit}
      /></label
    >
    <label for="max-price"
      >Max Price<input
        id="max-price"
        type="text"
        placeholder="ex: $1,000,000"
        bind:value={upperLimit}
      /></label
    >
    <button class="button--simple" type="submit">Search</button>
  </form>
  <Filters bind:value={filterValue} on:submit={handleEvent} />
  <button class="button--simple" on:click={() => handleEvent('descending')}
    >Filter High to Low</button
  >
  <button class="button--simple" on:click={() => handleEvent('ascending')}
    >Filter Low to High</button
  >
  <button class="button--simple" on:click={showAllListings}>Show All Listings</button>
</div>
<div class="content-wrap">
  <main>
    {#await properties}
      Loading...
    {:then data}
      <h4>Click a property to see its location</h4>
      <div class="grid">
        {#each data as property}
          <button
            class="property__button"
            on:click={setCoords(
              property.unit.building.position.latitude,
              property.unit.building.position.longitude
            )}
          >
            <Card
              address={property.display_address}
              region={property.unit.building.region.text}
              price={property.price}
              bedrooms={property.unit.bedrooms}
              bathrooms={property.unit.bathrooms}
              type={property.unit.building.type}
              imgFolder={property.unit.dyn_images[0]['key'].split('unit_')[1].slice(0, -2)}
              imgFile={property.unit.dyn_images[0].key}
              imgExtension={property.unit.dyn_images[0].extension}
              latitude={property.unit.building.position.latitude}
              longitude={property.unit.building.position.longitude}
            /></button
          >
        {/each}
      </div>
    {/await}
  </main>
  <aside>
    {#if ready && lat && lng}
      <Map {lat} {lng} />
    {:else}
      <strong>No map loaded, click a property</strong>
    {/if}
  </aside>
</div>

<style>
  main {
    padding: 0 1em;
    width: 95%;
    max-width: 1650px;
    margin: 0 auto;
  }
  h4 {
    margin-top: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0.5em;
  }
  .button--caret {
    padding-right: 24px;
  }
  .button--simple {
    background: none;
    padding-right: 6px;
  }

  .filter-list {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    padding: 14px 24px;
    position: relative;
  }
  form {
    display: none;
  }
  .visible,
  label {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }
  .visible {
    background: white;
    box-shadow: -10px 10px 17px 0 rgba(0, 0, 0, 0.28);
    position: absolute;
    top: 50px;
    left: 24px;
    padding: 16px;
  }
  [type='submit'] {
    text-align: center;
  }
  .property__button {
    padding: 0;
    text-align: left;
    border: none;
  }
  aside {
    width: 100%;
    height: 100vh;
  }
  @media (min-width: 975px) {
    .content-wrap {
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
    .filter-list {
      flex-direction: row;
      align-items: stretch;
    }
    aside {
      height: 50%;
      padding-top: 43px;
    }
  }
</style>
