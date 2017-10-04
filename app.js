const config = require('config')
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
	appId: config.get('application.appConfig.appId'),
	appPassword: config.get('application.appConfig.appPassword'),
});

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));


// Listen for messages from users 
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {

/*	var neo4j = require('neo4j');
	var db = new neo4j.GraphDatabase(config.get('application.neo4j.url'));

	db.cypher({
	    query: 'MATCH (toPerson:Person) WHERE ANY(name IN toPerson.Name WHERE name =~ \'(?i).*todd.*\') RETURN toPerson',
	    params: {
	        userName: 'todd',
	    },
	}, function (err, results) {
	    if (err) throw err;
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    } else {
	    	console.log(JSON.stringify(result, null, 4));
	        var user = result['toPerson'].properties.Name;
	        session.send("Did you mean %s?", JSON.stringify(user, null, 4));
	    }
	});
*/
	
	session.send("You said: %s", session.message.text);
});
