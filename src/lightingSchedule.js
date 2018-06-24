var TowerInfo = function () {
    function handleFetch(callback) {
        fetch(`https://tower-lights.herokuapp.com/scheduleTest`).then(response => callback(response.json()));
    }

    function getSchedule(callback) {
        callback({ "month": "June", "dates": [{ "day": 1, "occasion": "ALS Awareness Month", "colour": "Purple" }, { "day": 1, "occasion": "Unplug to Connect - Boys and Girls Clubs of Canada", "colour": "Green" }, { "day": 2, "occasion": "World Eating Disorders Action Day", "colour": "Purple" }, { "day": 2, "occasion": "Let’s Go Marlies! Our regularly scheduled top of the hour light show celebrates the Toronto Marlies in the 2018 Calder Cup Playoffs!", "colour": "Blue" }, { "day": 3, "occasion": "Canadian Forces Day", "colour": "Red and white" }, { "day": 5, "occasion": "World Environment Day / Canadian Environment Week", "colour": "Green" }, { "day": 9, "occasion": "Ride to Conquer Cancer", "colour": "Blue and yellow" }, { "day": 12, "occasion": "Let’s Go Marlies! Our lighting celebrates the Toronto Marlies in the 2018 Calder Cup Final!", "colour": "Blue" }, { "day": 13, "occasion": "Brain Injury Awareness Month", "colour": "Blue and green" }, { "day": 14, "occasion": "Hepatitis C Awareness", "colour": "Red and yellow" }, { "day": 15, "occasion": "Tourette Awareness Month", "colour": "Teal" }, { "day": 15, "occasion": "National Deafblind Awareness Month", "colour": "Blue" }, { "day": 16, "occasion": "National Blood Donor Week", "colour": "Red and white" }, { "day": 17, "occasion": "International CDKL5 Awareness Day", "colour": "Lime green" }, { "day": 17, "occasion": "Father's Day and Prostate Cancer Awareness", "colour": "Dark blue and light blue" }, { "day": 18, "occasion": "Pollinator Awareness Month", "colour": "Yellow and black" }, { "day": 19, "occasion": "World Sickle Cell Awareness Day", "colour": "Red and white" }, { "day": 20, "occasion": "United Nations World Refugee Day", "colour": "Blue" }, { "day": 21, "occasion": "National Aboriginal Day", "colour": "Yellow, dark blue, dark red and white" }, { "day": 23, "occasion": "National Day of Remembrance for Victims of Terrorism", "colour": "Red and white" }, { "day": 23, "occasion": "Global HHT Awareness Day", "colour": "Red and blue" }, { "day": 24, "occasion": "Saint-Jean-Baptiste Day", "colour": "Red and white" }, { "day": 26, "occasion": "CN Tower's Birthday. Today the CN Tower turns 42.", "colour": "Red and white" }, { "day": 27, "occasion": "Canadian Milticulturalism Day", "colour": "Red and white" }, { "day": 29, "occasion": "National Scleroderma Awareness Month", "colour": "White and royal blue" }, { "day": 30, "occasion": "Arthrogryposis Multiplex Congenital Awareness", "colour": "Blue" }] });
        //handleFetch(callback);
    }

    function getStatus(day, dates) {
        let occasion = 'Standard lighting program';
        let colours = 'Red and White';

        const dayStatus = dates.filter((element) => {
            return element.day === day;
        }, day);

        if (dayStatus.length > 0) {
            occasion = dayStatus[0].occasion;
            colours = dayStatus[0].colour;
        }

        return { occasion: occasion, colours: colours };
    }

    function getStatusByDay(day, schedule) {
        return getStatus(day, schedule.dates);
    }

    this.getSchedule = getSchedule;
    this.getStatusByDay = getStatusByDay;
};

module.exports = TowerInfo;
