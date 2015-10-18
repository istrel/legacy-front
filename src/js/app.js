'use strict';

require('../css/main.css');
require('./custom_marker');
require('./poll_responses');

require('eonasdan-bootstrap-datetimepicker');

import initApp      from './init_app';
import renderWishes from './render_wishes'

$(initApp.bind(null, renderWishes));
