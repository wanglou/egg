'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
	  enable: true,
	  package: 'egg-cors'
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  }
}
