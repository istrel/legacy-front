'use strict';

import moment from 'moment';

import { apiUrl } from './config';

function createResponse(wishId) {
  $.post(apiUrl + '/responses.json', {
    response: {
      wish_id: wishId
    }
  }).then(function(response) {
    renderMessages(response.id);
  });
}

function renderMessages(responseId) {
  $.get(apiUrl + '/responses/' + responseId + '.json', function(response) {
    messagesContainer.innerHTML = '';

    response.messages.forEach(function(message) {
      var messageEl = document.createElement('div');
      messageEl.className = 'media msg';

      var img = new Image();
      img.className = 'media-object';
      img.style.width = '32px';
      img.style.height = '32px';
      img.src = message.avatar;

      var a = document.createElement('a');
      a.className = '.pull-left';
      a.href = '#';

      a.appendChild(img);

      messageEl.appendChild(a);

      var time = moment(message.created_at).format('hh:mm');

      var body = document.createElement('div');
      body.className = 'media-body';
      body.innerHTML =
       '<small class="pull-right time"><i class="fa fa-clock-o"></i> ' + time + '</small>' +

       '<h5 class="media-heading">' + message.name + '</h5>' +
       '<small class="col-md-10">' + message.text + '</small>';

      messageEl.appendChild(body);

      messagesContainer.appendChild( messageEl );
    });

    $('#showWishModal').modal('hide');
    $('#chat').modal('show');

    $('#sendButton')
      .off('click')
      .on('click', function() {
				sendMessage(response.id, $('#messageText').val())
					.then(function() {
						$('#messageText').val('');
					})
      });

    $('#gratifyBad').click(function() {
      gratifyBad(response.id);
    });
    $('#gratifyGood').click(function() {
      gratifyGood(response.id);
    });
    $('#gratifyBest').click(function() {
      gratifyBest(response.id);
    });
  });
}

function sendMessage(responseId, text) {
  return $.post(apiUrl + '/messages.json', {
    message: {
      response_id: responseId,
      text: text
    }
  }).done(function() {
    renderMessages(responseId);

    poll(responseId);
  });
}

function poll(responseId) {
    setTimeout(function() {
      if ( $('#chat').is(':visible') ) {
	renderMessages(responseId);

	poll(responseId);
      }
    }, 2000);
}
