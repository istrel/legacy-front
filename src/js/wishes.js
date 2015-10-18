'use strict';

import { apiUrl } from './config';

const POLLING_INTERVAL = 3000;

const Wishes = {
  wishes: [],

  callbacks: [],

  poll() {
    this.fetch();

    this.interval = setInterval(this.fetch.bind(this), POLLING_INTERVAL);
  },

  stopPolling() {
    clearInterval(this.interval);
  },

  fetch() {
    $.ajax({
      url: `${apiUrl}/wishes.json`,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    }).then( (wishes) => {
      this.updateWishes(wishes);
    });
  },

  updateWishes(newWishes) {
    this.wishes = newWishes;

    this.callbacks.forEach(function(cb) {
      cb(newWishes);
    });
  },

  bind(cb) {
    this.callbacks.push(cb);
  }
};

export default Wishes;
