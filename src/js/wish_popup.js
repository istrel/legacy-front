'use strict';

import { apiUrl } from './config';
import moment from 'moment';

export default function showWish(id) {
  $.get(apiUrl + '/wishes/' + id + '.json', function(wish) {
    $('#respondButton').toggle(!wish.mine);

    respondButton.onclick = function() {
      createResponse(wish.id);
    };

    wishModalTitle.innerText = wish.title;
    wishModalDescription.innerText = wish.description;
    wishAvatar.src = wish.avatar;

    wishModalDeadline.innerText = 'до ' + moment(wish.date).format('D MMM hh:mm');

    wishModalAgreed.innerHTML = '<b>' + wish.responses.length + '</b> человек согласнo помочь';

    wishKarmists.innerHTML = '';

    wish.responses.forEach(function(response) {
      var karmist = document.createElement('div');
      karmist.className = 'wish-karmist well';

      var avatar = new Image();
      avatar.src = response.avatar;

      var text = document.createElement('div');
      text.className = 'wish-karmist__text';

      var user  = document.createElement('div');
      user.className = 'wish-karmist__user';
      user.innerHTML = response.name;

      if (!response.message) {
	text.innerText = response.name + " хочет помочь";
      }
      else {
	text.innerText = response.message;
      }

      karmist.appendChild(user);

      $(user).prepend(avatar);
      karmist.appendChild(text);

      wishKarmists.appendChild(karmist);

      karmist.onclick = function() {
       	renderMessages(response.id);
      };
    });

    $('#showWishModal').modal('show');
  });
}
