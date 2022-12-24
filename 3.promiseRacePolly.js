const race = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        // resolve, when any of the input promise resolves
        .then(resolve, reject)
        // reject, when any of the input promise rejects
        .catch(reject);
    });
  });
};

// Input:
const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});
race([test1, test2, test3])
  .then(function (value) {
    // first two resolve, 3rd fails, but promise2 is faster
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });

// Output:
// "two"
