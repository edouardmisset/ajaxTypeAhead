const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const resultList = document.querySelector('.suggestions');
const input = document.querySelector('.search');

input.addEventListener('change', displayResult);
input.addEventListener('keyup', displayResult);

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data))
  .catch(err => console.warn(err));

// Filter
const findQuery = (query, cities = []) => {
  const regex = new RegExp(query, 'gi');
  return cities.filter(
    ({ city, state }) => city.match(regex) || state.match(regex)
  );
};

// Format numbers
const formatNumber = someNumber => {
  return someNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Display result
function displayResult() {
  const matchedQuery = findQuery(this.value, cities);

  const html = matchedQuery
    .map(({ city, state, population }) => {
      const regex = RegExp(this.value, 'gi'),
        cityName = city.replace(regex, `<span class="hl">${this.value}</span>`),
        stateName = state.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="name">${formatNumber(population)}</span>
    </li>
  `;
    })
    .join('');

  resultList.innerHTML = html;
}
