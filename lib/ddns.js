

const ddns = function(options) {
  this.domain = options.domain;
  this.record = options.record;
  this.apiKey = options.apiKey;
};

ddns.prototype.getAllRecords = function() {
  
};


//exports factory function
module.exports = function(options) {
  //Return instance of ddns
  return new ddns(options);
};