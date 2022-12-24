// enum of states
const states = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

class MyPromise {
  // initialize the promise
  constructor(callback) {
    this.state = states.PENDING;
    this.value = undefined;
    this.handlers = [];
    try {
      callback(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }
  // helper function for resolve
  _resolve = (value) => {
    this._handleUpdate(states.FULFILLED, value);
  };
  // helper function for reject
  _reject = (value) => {
    this._handleUpdate(states.REJECTED, value);
  };
  // handle the state change
  _handleUpdate = (state, value) => {
    if (state === states.PENDING) {
      return;
    }
    setTimeout(() => {
      if (value instanceof MyPromise) {
        value.then(this._resolve, this._reject);
      }
      this.state = state;
      this.value = value;
      this._executeHandlers();
    }, 0);
  };
  // execute all the handlers
  // depending on the current state
  _executeHandlers = () => {
    if (this.state === states.PENDING) {
      return;
    }
    this.handlers.forEach((handler) => {
      if (this.state === states.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFailure(this.value);
    });
    this.handlers = [];
  };
  // add handlers
  // execute all if any new handler is added
  _addHandler = (handler) => {
    this.handlers.push(handler);
    this._executeHandlers();
  };
  // then handler
  // creates a new promise
  // assigned the handler
  then = (onSuccess, onFailure) => {
    // invoke the constructor
    // and new handler
    return new MyPromise((resolve, reject) => {
      this._addHandler({
        onSuccess: (value) => {
          if (!onSuccess) {
            return resolve(value);
          }
          try {
            return resolve(onSuccess(value));
          } catch (error) {
            reject(error);
          }
        },
        onFailure: (value) => {
          if (!onFailure) {
            return reject(value);
          }
          try {
            return reject(onFailure(value));
          } catch (error) {
            return reject(error);
          }
        },
      });
    });
  };
  // add catch handler
  catch = (onFailure) => {
    return this.then(null, onFailure);
  };
  // add the finally handler
  finally = (callback) => {
    // create a new constructor
    // listen the then and catch method
    // finally perform the action
    return new MyPromise((resolve, reject) => {
      let wasResolved;
      let value;
      this.then((val) => {
        value = val;
        wasResolved = true;
        return callback();
      }).catch((err) => {
        value = err;
        wasResolved = false;
        return callback();
      });
      if (wasResolved) {
        resolve(value);
      } else {
        reject(value);
      }
    });
  };
}

// Input:
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
});
promise.then((value) => {
  console.log(value);
});
// Output:
// "hello"
