'use strict';

function closeModals() {
  $('#gratifyModal').modal('hide');
  $('#chat').modal('hide');
}

export function gratifyBad(responseId) {
  closeModals();

  $.ajax({
    url: '/responses/' + responseId + '.json',
    type: 'DELETE', // Use DELETE
  });
}

export function gratifyGood(responseId) {
  closeModals();

  $.ajax({
    url: '/responses/' + responseId + '/gratify_1',
  });
}

export function gratifyBest(responseId) {
  closeModals();

  $.ajax({
    url: '/responses/' + responseId + '/gratify_5',
  });
}
