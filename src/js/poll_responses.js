import { apiUrl } from './config';

var responsesIds = JSON.parse(localStorage.responsesIds || '[]');

function fetchResponses() {
  if (!location.href.match('map')) return;

  $.get(apiUrl + '/closed_responses', function(responses) {
    responses.forEach(function(response) {
      if (responsesIds.indexOf(response.id) == -1) {
	responsesIds.push(response.id);

	snack('Вы получили плюс к карме');
      }
    });

    localStorage.responsesIds = JSON.stringify(responsesIds);
  });
}

function snack(message) {
  $.snackbar({
    content: message,
    timeout: 30000
  }).snackbar('show');
}

setInterval(fetchResponses, 3000);

