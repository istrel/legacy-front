'use strict';

require('../css/main.css');
require('./custom_marker');
require('./wish_form');
require('./wish_popup');
require('./show_messages');
require('./gratify');
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
