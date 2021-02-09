const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const arr = fetch(endpoint)
  .then((res) => res.json())
  .catch((err) => console.log(err));

const filterByValue = (arr = [], query = "") => {
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

document.querySelector("input.search").addEventListener("keyup", filterByValue);

// function filter(arr, query) {
//   query = this.value;
//   const reg = new RegExp(query, "i");
//   return arr.filter((item) => {
//     let flag = false;
//     for (prop in item) {
//       if (reg.test(item[prop])) {
//         flag = true;
//       }
//     }
//     return flag;
//   });
// }
