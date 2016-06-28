var jackrabbit = require('jackrabbit');
var database = './database.js';

var rabbit = jackrabbit(database.mq);
var exchange = rabbit.default();

var task_queue =  exchange.queue({name: 'task_queue', durable: true});


modules.export = function(submission, submissionId){
    exchange.publish({submission : submission, id: submissionId}, {key : 'task_queue'});
}