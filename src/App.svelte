<script>
  import Card from './components/Card.svelte';
  import Header from './components/Header.svelte';
  import Filters from './components/Filters.svelte';

  let visible = false;
  let lowerLimit = '';
  let upperLimit = '';
  let filterValue;
  $: properties = getProperties();

  async function handleEvent(filter, upper) {
    properties = getProperties(filter, upper);
  }
  async function getProperties(filter, upper) {
    const res = await fetch('/properties.json');
    const properties = await res.json();
    if (filter === 'descending') {
      return properties.sort((a, b) => b.price - a.price);
    } else if (filter === 'ascending') {
      return properties.sort((a, b) => a.price - b.price);
    } else if (filter && !upper) {
      return properties.filter((property) => property.unit.bedrooms === filterValue);
    } else if (filter && upper) {
      return properties.filter((property) => property.price >= filter && property.price <= upper);
    }
    return properties;
  }
</script>

<Header />
<button on:click={() => (visible = !visible)}>Price</button>
<form on:submit|preventDefault={handleEvent(lowerLimit, upperLimit)}>
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
<button class="button--simple" on:click={() => handleEvent('descending')}>Filter High to Low</button
>
<button class="button--simple" on:click={() => handleEvent('ascending')}>Filter Low to High</button>
<main>
  {#await properties}
    Loading...
  {:then data}
    <div class="grid">
      {#each data as property}
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
        />
      {/each}
    </div>
  {/await}
</main>

<style>
  main {
    padding: 1em;
    width: 95%;
    max-width: 1650px;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0.5em;
  }
  .button--simple {
    background: none;
    padding-right: 6px;
  }
</style>
