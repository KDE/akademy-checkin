const request = require('request');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

	request('https://events.kde.org/api/registration/akademy2018?feifjw0efjwef=true', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const conference = JSON.parse(body);
			conference.registrations = conference.registrations.sort((a, b) => {
				if(a.profile.data.Full_Name < b.profile.data.Full_Name) return -1;
				if(a.profile.data.Full_Name > b.profile.data.Full_Name) return 1;
				return 0;
			})

			res.render('attendees', {
				title: 'Attendees',
				conference
			});
		}
	});

}



// NB:- node's http client API has changed since this was written
// this code is for 0.4.x
// for 0.6.5+ see http://nodejs.org/docs/v0.6.5/api/http.html#http.request

