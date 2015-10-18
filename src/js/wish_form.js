'use strict';

import moment from 'moment';

$(function() {
  if (!location.href.match('map')) return;

  $('.wish-datepicker')
    .datetimepicker({
      inline: true,
      sideBySide: true
    })
    .data("DateTimePicker").date(moment().add(1, 'month').toDate());

  $('#createWishForm').submit(function() {
    $.post('/wishes.json', {
      wish: {
        title: $('#inputTitle').val(),
        description: $('#inputDescription').val(),
        close_date: $('.wish-datepicker').data('DateTimePicker').date().toISOString(),
        latitude: myLatLng.lat,
        longitude: myLatLng.lng
      }
    }).then(function() {
      $('#createWishModal').modal('hide');

      $.snackbar({
        content: 'Вы попросили "' + $('#inputTitle').val() + '"',
        timeout: 30000
      }).snackbar('show');
    });

    return false;
  });
});
