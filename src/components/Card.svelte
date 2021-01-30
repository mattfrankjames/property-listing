<script>
  export let address, region, price, bedrooms, bathrooms, type, imgFolder, imgFile, imgExtension;
</script>

<div class="card">
  <img
    loading="lazy"
    src={`https://dyn-images.triplemint.com/production/images/unit/${imgFolder}/x486/${imgFile}/${imgExtension}`}
    alt={address}
  />
  <div class="card__info">
    <h4>{address}</h4>
    <span class="subtext">{region}</span>
    <div>${price}</div>
    <div class="subtext">
      {bedrooms} BD, {bathrooms} BA, {type}
    </div>
  </div>
</div>

<style>
  img {
    aspect-ratio: 1.5/1;
  }
  .card {
    border: 1px solid #d8d8d8;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
  }
  .card__info {
    padding: 10px;
  }
  .subtext {
    color: #767676;
    font-size: 14px;
  }
  h4 {
    margin-top: 0.5em;
    margin-bottom: 0;
  }
</style>
