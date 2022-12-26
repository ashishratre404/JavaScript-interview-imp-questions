const asyncSeriesExecuter_reducer = function(promises) {
  promises.reduce((acc, curr) => {
  return acc.then(() => {
  return curr.then(val => {console.log(val)});
  });
  }, Promise.resolve());
  }

const asyncTask = (taskNum) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Task ${taskNum} has been completed`);
    }, taskNum * 100);
  });
};

const promiseList = [asyncTask(3), asyncTask(10), asyncTask(9), asyncTask(4)];

asyncSeriesExecuter_reducer(promiseList);


