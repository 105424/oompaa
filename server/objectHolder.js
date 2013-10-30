this.group = require('./objects/group').Group;
this.plusser = require('./objects/plusser').Plusser;
this.interest = require('./objects/interest').Interest;
this.video = require('./objects/video').Video;
this.image = require('./objects/image').Image;

// This is a very lazy workaround for the plussers plusser problem in the api url for posting
// Depending on this has very bad consiquences
this.groups = require('./objects/group').Group;
this.plussers = require('./objects/plusser').Plusser;
this.interests = require('./objects/interest').Interest;
this.videos = require('./objects/video').Video;
this.images = require('./objects/image').Image;