'use strict';

import UserStatus   from './user_status';
import renderWishes from './render_wishes';
import Wishes       from './wishes';

export default function initApp() {
  UserStatus.bind(user => {
    document.getElementById('karmaPoints').innerText = user.karma;
  });
  UserStatus.poll();

  Wishes.bind(renderWishes);
  Wishes.poll();
}
