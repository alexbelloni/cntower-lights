var TowerInfo = function () {
    function _handleFetch(callback) {
        // if(process.env.NODE_ENV === 'development'){
        //Active fake request to API because web scraping issue. 
        setTimeout(() => {
            callback([{ "fake": true, "month": "April", "dates": [{ "day": 1, "configs": [{ "occasions": "Mental Disorder (PMDD) Awareness Month", "colourCaption": "Teal", "colours": ["teal"] }] }, { "day": 2, "configs": [{ "occasions": "World Autism Awareness Day", "colourCaption": "Rainbow", "colours": [] }] }, { "day": 3, "configs": [{ "occasions": "Irritable Bowel Syndrome (IBS) Awareness Month", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 7, "configs": [{ "occasions": "#GreenShirtDay - Organ Donor Awareness & Registration", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 8, "configs": [{ "occasions": "Missing Children Awareness and Prevention", "colourCaption": "Purple", "colours": ["purple"] }, { "occasions": "GMID – Global Meeting Industry Day", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 9, "configs": [{ "occasions": "National Oral Health Awareness Month and National Dental Hygiene Week", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 10, "configs": [{ "occasions": "National Wildlife Week", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 11, "configs": [{ "occasions": "World Parkinson’s Day", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 14, "configs": [{ "occasions": "National Medical Laboratory Week", "colourCaption": "Dark purple", "colours": ["purple"] }, { "occasions": "International Day of Pink - standing against bullying, discrimination, homophobia, transphobia and transmisogyny", "colourCaption": "Pink", "colours": ["pink"] }] }, { "day": 15, "configs": [{ "occasions": "Limb Loss Awareness Month", "colourCaption": "Orange", "colours": ["orange"] }, { "occasions": "Villa Charities 50th Anniversary", "colourCaption": "Green, white and red", "colours": ["green", "white", "red"] }] }, { "day": 17, "configs": [{ "occasions": "World Hemophilia Day", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 18, "configs": [{ "occasions": "National Volunteers Week", "colourCaption": "Orange and blue", "colours": ["orange", "blue"] }] }, { "day": 19, "configs": [{ "occasions": "Congenital Diaphragmatic Hernia (CDH) Awareness Month", "colourCaption": "Blue, pink and yellow", "colours": ["blue", "pink", "yellow"] }] }, { "day": 22, "configs": [{ "occasions": "Earth Day", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 23, "configs": [{ "occasions": "The St. George's Society of Toronto - supporting education, social and community services, health, and the arts", "colourCaption": "Red and white", "colours": ["red", "white"] }] }, { "day": 28, "configs": [{ "occasions": "National Day of Mourning - Honouring those impacted by workplace injury or death and promoting workplace health and safety awareness", "colourCaption": "Yellow and black", "colours": ["yellow", "black"] }] }, { "day": 29, "configs": [{ "occasions": "World Wish Day", "colourCaption": "Blue", "colours": ["blue"] }] }] }])
        }, 2000);
        return
        // }

        const url = "https://tower-lights.herokuapp.com/scheduleComplete";
        fetch(url).then(function (res) {
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

    function _getSchedule(callback) {
        _handleFetch(callback);
    }

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
