const mongoose = require('mongoose');
const request = require('request');

const checkedInSchema = new mongoose.Schema({
  id: { type: String, unique: true },
}, { timestamps: true });

const CheckedIn = mongoose.model('AkademyCheckIn', checkedInSchema);

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

	if(typeof req.query.checkin !== 'undefined') {
		let attendee = {
			name: "No Attendee Found",
			email: "No Attendee Found",
			irc: "No Attendee Found",
			role: "No Attendee Found"
		}

		request('https://events.kde.org/api/registration/akademy2018?feifjw0efjwef=true', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				const conference = JSON.parse(body);

				const attendeeInformation = conference.registrations.filter((registration) => registration.id == parseInt(req.query.id.substr(0, req.query.id.length - 1)))

				if(!!attendeeInformation.length) {

					const newCheckIn = new CheckedIn({ id: parseInt(req.query.id.substr(0, req.query.id.length - 1)) });
					newCheckIn.save(console.log)

					const registration = attendeeInformation.pop();
					attendee = {
						name: registration.id,
						name: registration.profile.data.Full_Name,
						email: registration.profile.data.Email,
						irc: registration.profile.data.Irc_Nick,
						role: registration.profile.data.Primary_Role_in_KDE
					}
				}

				res.render('home_checkedin', {
				  title: 'Home',
				  attendee
				});
			}
		})
	} else {
		res.render('home', {
		  title: 'Home'
		});
	}

};
