'use strict';

import { apiUrl } from './config';

const POLLING_INTERVAL = 3000;

const UserStatus = {
  user: {},

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
      url: `${apiUrl}/status`,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    }).then( ({user}) => {
      if (user) {
        this.updateUser(user);
      }
    });
  },

  updateUser(newValue) {
    this.user = newValue;

    this.callbacks.forEach(function(cb) {
      cb(newValue);
    });
  },

  bind(cb) {
    this.callbacks.push(cb);
  }
};

export default UserStatus;
