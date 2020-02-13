var TowerInfo = function () {
    function _handleFetch(callback) {
        // callback(JSON.parse(`{"month":"February","dates":[{"day":1,"configs":[{"occasions":"Black History Month","colourCaption":"Black, red and green","colours":["black","red","green"]}]},{"day":2,"configs":[{"occasions":"Eating Disorder Awareness Week","colourCaption":"Purple","colours":["purple"]}]},{"day":4,"configs":[{"occasions":"World Cancer Day","colourCaption":"Orange and blue","colours":["orange","blue"]}]},{"day":6,"configs":[{"occasions":"Toronto Board of Trade 175th Anniversary","colourCaption":"Blue, orange and green","colours":["blue","orange","green"]}]},{"day":11,"configs":[{"occasions":"National 211 Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":12,"configs":[{"occasions":"World Cholangiocarcinoma Day","colourCaption":"Green","colours":["green"]}]},{"day":14,"configs":[{"occasions":"Valetine's Day","colourCaption":"Red","colours":["red"]}]},{"day":15,"configs":[{"occasions":"National Flag of Canada Day","colourCaption":"Lighting on this night will feature a Canada flag image and red & white","colours":["lighting","on","this","night","will","feature","a","canada","flag","image","red","&","white"]}]},{"day":17,"configs":[{"occasions":"Heritage Day/Family Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":29,"configs":[{"occasions":"International Rare Disease Day","colourCaption":"Blue","colours":["blue"]}]}]}`))
        // return
        const url = `https://tower-lights.herokuapp.com/schedule`;
        fetch(url).then(function (res) {
            // res instanceof Response == true.
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data);
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });
    }

    //[{"day":3,"configs":[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]}]
    function _getSchedule(callback) {
        //callback({"month":"July","dates":[{"day":1,"configs":[{"occasions":"Happy Canada Day","colourCaption":"Red and white","colours":["red","white"]}]},{"day":5,"configs":[{"occasions":"National Injury Prevention Day","colourCaption":"Green","colours":["green"]}]},{"day":12,"configs":[{"occasions":"Masters' Indigenous Games","colourCaption":"Red, gold and dark blue","colours":["red","gold","dark","blue"]}]},{"day":15,"configs":[{"occasions":"Honda Indy","colourCaption":"Checkered flag","colours":["checkered","flag"]}]},{"day":18,"configs":[{"occasions":"50th Anniversary of JA Central Ontario","colourCaption":"Green an orange","colours":["green","an","orange"]}]},{"day":21,"configs":[{"occasions":"50th Anniversary of the Special Olympics","colourCaption":"Red","colours":["red"]}]},{"day":30,"configs":[{"occasions":"Gastroschisis Awareness Day","colourCaption":"Green","colours":["green"]}]}]});
        _handleFetch(callback);
    }

    //[{"occasions":"Canadian Forces Day","colourCaption":"Red and white","colours":["red","white"]}]
    function _getConfigs(day, dates) {
        let occasion = 'Standard lighting program';
        let colours = 'Red and White';
        let configs = [{ occasions: occasion, colourCaption: colours, colours: ["red", "white"] }];

        const dayStatus = dates.filter((element) => {
            return element.day === day;
        }, day);

        if (dayStatus.length > 0 && dayStatus[0].configs.length > 0) {
            configs = dayStatus[0].configs;
        }

        return configs;
    }

    function _getConfigsByDay(day, schedule) {
        if (!schedule.dates) {
            return [];
        }
        return _getConfigs(day, schedule.dates);
    }

    this.getSchedule = _getSchedule;
    this.getConfigsByDay = _getConfigsByDay;
};

module.exports = TowerInfo;
