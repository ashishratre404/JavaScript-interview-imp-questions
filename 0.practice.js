const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
});
promise.then((value) => {
  console.log(value);
});
promise.catch((err)=>{
  console.log(err)
})
promise.finally((val)=>{
  console.log(val)
})
