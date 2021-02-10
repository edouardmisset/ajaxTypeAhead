const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const resultList = document.querySelector(".suggestions");

document.querySelector("input.search").addEventListener("keyup", displayResult);
document
  .querySelector("input.search")
  .addEventListener("change", displayResult);

fetch(endpoint)
  .then((res) => res.json())
  .then((obj) => obj.forEach((city) => cities.push(city)))
  .catch((err) => console.warn(err));

// Filter
const filter = (arr = [], query = "") => {
  const reg = new RegExp(query, "gi");
  return arr.filter((item) => {
    let flag = false;
    for (prop in item) {
      if (reg.test(item[prop])) {
        flag = true;
      }
    }
    return flag;
  });
};

// Display result
function displayResult() {
  console.log(this.value);
  console.log(filter(cities, this.value));

  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }

  return filter(cities, this.value).forEach((city) => {
    newLi = document.createElement("li");
    newLi.innerHTML = city.city;
    resultList.appendChild(newLi);
  });
}
