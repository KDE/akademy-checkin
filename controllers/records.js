const mongoose = require('mongoose');
const request = require('request');

const checkedInSchema = new mongoose.Schema({
  id: { type: String, unique: true },
}, { timestamps: true });

const CheckedIn = mongoose.model('AkademyCheckIn');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

	request('https://events.kde.org/api/registration/akademy2018?feifjw0efjwef=true', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const conference = JSON.parse(body);

			const records = CheckedIn.find((err, checkIns) => {
				res.render('records', {
				  title: 'Records',
				  checkins: checkIns.map((item) => Object.assign({createdAt: item.createdAt}, conference.registrations.filter((reg) => reg.id == item.id).pop()))
				});
			})
		}
	});


};
