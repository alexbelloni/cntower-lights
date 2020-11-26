var TowerInfo = function () {
    function _handleFetch(callback) {
        if(process.env.NODE_ENV === 'development'){
            setTimeout(() => {
                callback([{ "month": "November", "dates": [{ "day": 1, "configs": [{ "occasions": "Lennox-Gastaut Syndrome (LGS) Awareness Day", "colourCaption": "Green and purple", "colours": ["green", "purple"] }] }, { "day": 2, "configs": [{ "occasions": "Complex Regional Pain Syndrome (CRPS) / Reflex Sympathetic Dystrophy (RSD) Awareness", "colourCaption": "Orange", "colours": ["orange"] }] }, { "day": 3, "configs": [{ "occasions": "33rd Anniversary of Project Red Ribbon", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 4, "configs": [{ "occasions": "Treaties Recognition Week", "colourCaption": "Black, red, yellow and white", "colours": ["black", "red", "yellow", "white"] }] }, { "day": 5, "configs": [{ "occasions": "Crohn's and Colitis Awareness Month", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 10, "configs": [{ "occasions": "World Neuroendocrine Tumour (NET) Awareness Day", "colourCaption": "White and black", "colours": ["white", "black"] }] }, { "day": 11, "configs": [{ "occasions": "Remembrance Day - Today we remember those who bravely gave their lives to protect this nation.", "colourCaption": "Poppy Red", "colours": ["red"] }] }, { "day": 12, "configs": [{ "occasions": "World Pneumonia Day", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 13, "configs": [{ "occasions": "Brother-Sister Community Day", "colourCaption": "Blue and light pink", "colours": ["blue", "pink"] }] }, { "day": 14, "configs": [{ "occasions": "World Diabetes Day", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 15, "configs": [{ "occasions": "National Philanthropy Day", "colourCaption": "Red and white", "colours": ["red", "white"] }] }, { "day": 16, "configs": [{ "occasions": "Daily Bread Food Bank - \"Who's Hungry\" Report", "colourCaption": "Yellow and green", "colours": ["yellow", "green"] }] }, { "day": 17, "configs": [{ "occasions": "World Prematurity Day", "colourCaption": "Purple", "colours": ["purple"] }, { "occasions": "Cervical Cancer Elimination Campaign", "colourCaption": "Teal", "colours": ["teal"] }] }, { "day": 18, "configs": [{ "occasions": "Hockey Fights Cancer", "colourCaption": "Lavendar", "colours": [] }] }, { "day": 19, "configs": [{ "occasions": "Children's Grief Awareness Day", "colourCaption": "Blue and light blue", "colours": ["blue"] }, { "occasions": "World Pancreatic Cancer Day", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 20, "configs": [{ "occasions": "National Child Day and World Children's Day", "colourCaption": "Cyan blue", "colours": ["cyan", "blue"] }, { "occasions": "Transgender Day of Remembrance", "colourCaption": "Light blue, white and light pink", "colours": ["blue", "white", "pink"] }] }, { "day": 21, "configs": [{ "occasions": "International Survivors of Suicide Loss Day", "colourCaption": "Green, white and light green", "colours": ["green", "white"] }] }, { "day": 24, "configs": [{ "occasions": "Let’s Go Toronto FC!  Our lighting celebrates the Toronto FC in the playoffs.", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 25, "configs": [{ "occasions": "International Day for the Elimination of Violence Against Women", "colourCaption": "Orange", "colours": ["orange"] }] }, { "day": 29, "configs": [{ "occasions": "Lung Cancer Awareness Month", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 30, "configs": [{ "occasions": "Stomach Cancer Awareness Day", "colourCaption": "Peri-winkle", "colours": [] }] }] }])
            }, 2000); 
            return
        }

        const url = "https://tower-lights.herokuapp.com/scheduleComplete";
        //const url = "http://localhost:5000/scheduleComplete";
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
