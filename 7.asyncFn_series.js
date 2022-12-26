// Method -1 : Using async await
const asyncSeriesExecuter = async function (promises) {
  for (let promise of promises) {
    try {
      const result = await promise;
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};

// Method-2 : Recursion
const asyncSeriesExecuter_rec = function (promises) {
  // get the top task
  let promise = promises.shift();
  //execute the task
  promise.then((data) => {
    //print the result
    console.log(data);
    //recursively call the same function
    if (promises.length > 0) {
      asyncSeriesExecuter(promises);
    }
  });
};

//   Method-3 : Reducer
const asyncSeriesExecuter_reducer = function (promises) {
  promises.reduce((acc, curr) => {
    return acc.then(() => {
      return curr.then((val) => {
        console.log(val);
      });
    });
  }, Promise.resolve());
};

// Input:
const asyncTask = function (i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Completing ${i}`), 100 * i);
  });
};
const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];
asyncSeriesExecuter(promises);
// Output:
// "Completing 3"
// "Completing 1"
// "Completing 7"
// "Completing 2"
// "Completing 5"
