var TowerInfo = function () {
    function _handleFetch(callback) {
        fetch(`https://tower-lights.herokuapp.com/schedule`).then(response => callback(response.json()));
    }

    //[{"day":3,"configs":[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]}]
    function _getSchedule(callback) {
        callback({"month":"June","dates":[{"day":1,"configs":[{"occasions":"ALS Awareness Month","colourCaption":"Purple","colours":["purple"]},{"occasions":"Unplug to Connect - Boys and Girls Clubs of Canada","colourCaption":"Green","colours":["green"]}]},{"day":2,"configs":[{"occasions":"World Eating Disorders Action Day","colourCaption":"Purple","colours":["purple"]},{"occasions":"Let’s Go Marlies! Our regularly scheduled top of the hour light show celebrates the Toronto Marlies in the 2018 Calder Cup Playoffs!","colourCaption":"Blue","colours":["blue"]}]},{"day":3,"configs":[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":5,"configs":[{"occasions":"World Environment Day / Canadian Environment Week","colourCaption":"Green","colours":["green"]}]},{"day":9,"configs":[{"occasions":"Ride to Conquer Cancer","colourCaption":"Blue and yellow","colours":["blue","yellow"]}]},{"day":12,"configs":[{"occasions":"Let’s Go Marlies! Our lighting celebrates the Toronto Marlies in the 2018 Calder Cup Final!","colourCaption":"Blue","colours":["blue"]}]},{"day":13,"configs":[{"occasions":"Brain Injury Awareness Month","colourCaption":"Blue and green","colours":["blue","green"]}]},{"day":14,"configs":[{"occasions":"Hepatitis C Awareness","colourCaption":"Red and yellow","colours":["red","yellow"]}]},{"day":15,"configs":[{"occasions":"Tourette Awareness Month","colourCaption":"Teal","colours":["teal"]},{"occasions":"National Deafblind Awareness Month","colourCaption":"Blue","colours":["blue"]}]},{"day":16,"configs":[{"occasions":"National Blood Donor Week","colourCaption":"Red and white","colours":["red","white"]}]},{"day":17,"configs":[{"occasions":"International CDKL5 Awareness Day","colourCaption":"Lime green","colours":["lime","green"]},{"occasions":"Father's Day and Prostate Cancer Awareness","colourCaption":"Dark blue and light blue","colours":["dark","blue","light"]}]},{"day":18,"configs":[{"occasions":"Pollinator Awareness Month","colourCaption":"Yellow and black","colours":["yellow","black"]}]},{"day":19,"configs":[{"occasions":"World Sickle Cell Awareness Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":20,"configs":[{"occasions":"United Nations World Refugee Day","colourCaption":"Blue","colours":["blue"]}]},{"day":21,"configs":[{"occasions":"National Indigenous Peoples Day","colourCaption":"Yellow, dark blue, dark red and white","colours":["yellow","dark","blue","red","white"]}]},{"day":23,"configs":[{"occasions":"National Day of Remembrance for Victims of Terrorism","colourCaption":"Red and white","colours":["red","white"]},{"occasions":"Global HHT Awareness Day","colourCaption":"Red and blue","colours":["red","blue"]}]},{"day":24,"configs":[{"occasions":"Saint-Jean-Baptiste Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":26,"configs":[{"occasions":"CN Tower's Birthday. Today the CN Tower turns 42.","colourCaption":"Red and white","colours":["red","white"]}]},{"day":27,"configs":[{"occasions":"Canadian Milticulturalism Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":29,"configs":[{"occasions":"National Scleroderma Awareness Month","colourCaption":"White and royal blue","colours":["white","royal","blue"]}]},{"day":30,"configs":[{"occasions":"Arthrogryposis Multiplex Congenital Awareness","colourCaption":"Blue","colours":["blue"]}]}]});
        //_handleFetch(callback);
    }

    //[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]
    function _getConfigs(day, dates) {
        let occasion = 'Standard lighting program';
        let colours = 'Red and White';
        let configs = [{occasions: occasion, colourCaption: colours, colours: ["red", "white"]}];

        const dayStatus = dates.filter((element) => {
            return element.day === day;
        }, day);

        if (dayStatus.length > 0 && dayStatus[0].configs.length > 0) {
            configs = dayStatus[0].configs;
        }

        return configs;
    }

    function _getConfigsByDay(day, schedule) {
        return _getConfigs(day, schedule.dates);
    }

    this.getSchedule = _getSchedule;
    this.getConfigsByDay = _getConfigsByDay;
};

module.exports = TowerInfo;
