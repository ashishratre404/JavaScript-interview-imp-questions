const any = function (promisesArray) {
  const promiseErrors = new Array(promisesArray.length);
  let counter = 0;
  //return a new promise
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve) // resolve, when any of the input promise resolves
        .catch((error) => {
          promiseErrors[counter] = error;
          counter = counter + 1;
          if (counter === promisesArray.length) {
            // all promises rejected, reject outer promise
            reject(promiseErrors);
          }
        });
    });
  });
};

// Input:
const test1 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, "one");
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, "two");
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});
any([test1, test2, test3])
  .then(function (value) {
    // first and third fails, 2nd resolves
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });

// Output:
// "two"
