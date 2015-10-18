'use strict';

import UserStatus   from './user_status';
import Wishes       from './wishes';
import getClusters  from './get_clusters';

export default function initApp(renderWishes) {
  UserStatus.bind(user => {
    document.getElementById('karmaPoints').innerText = user.karma;
  });
  UserStatus.poll();

  Wishes.bind(function(wishes) {
    renderWishes( getClusters(wishes) );
  });
  Wishes.poll();
}
