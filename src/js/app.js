'use strict';

require('../css/main.css');
require('./custom_marker');
require('./poll_responses');

require('eonasdan-bootstrap-datetimepicker');

import UserStatus   from './user_status';
import renderWishes from './render_wishes';
import Wishes       from './wishes';

$(() => {
  UserStatus.bind(user => {
    document.getElementById('karmaPoints').innerText = user.karma;
  });
  UserStatus.poll();

  Wishes.bind(renderWishes);
  Wishes.poll();
});
