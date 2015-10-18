'use strict';

import UserStatus   from './user_status';
import Wishes       from './wishes';

export default function initApp(renderWishes) {
  UserStatus.bind(user => {
    document.getElementById('karmaPoints').innerText = user.karma;
  });
  UserStatus.poll();

  Wishes.bind(renderWishes);
  Wishes.poll();
}
