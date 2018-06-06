export function getScheduleInfo() {
    return { month: 'June', firstDate: new Date(2018, 5, 1), lastDate: new Date(2018, 5, 30) };
}

function getSchedule() {
    return `
    June 1	ALS Awareness Month	Purple
    June 1	Unplug to Connect - Boys and Girls Clubs of Canada	Green
    June 2	World Eatin Disorders Action Day	Purple
    June 2	Let’s Go Marlies! Our regularly scheduled top of the hour light show celebrates the Toronto Marlies in the 2018 Calder Cup Playoffs!	Blue
    June 3	Canadian Forces Day	Red and white
    June 5	World Environment Day / Canadian Environment Week	Green
    June 9	Ride to Conquer Cancer	Blue and yellow
    June 13	Brain Injury Awareness Month	Blue and green
    June 14	Tourette Awareness Month	Teal
    June 15	National Deafblind Awareness Month	Blue
    June 16	National Blood Donor Week	Red and white
    June 17	International CDKL5 Awareness Day	Lime green
    June 17	Father's Day and Prostate Cancer Awareness	Dark blue and light blue
    June 18	Pollinator Awareness Month	Yellow and black
    June 19	World Sickle Cell Awareness Day	Red and white
    June 20	United Nations World Refugee Day	Blue
    June 21	National Aboriginal Day	Yellow, dark blue, dark red and white
    June 23	National Day of Remembrance for Victims of Terrorism	Red and white
    June 23	Global HHT Awareness Day	Red and blue
    June 24	Saint-Jean-Baptiste Day	Red and white
    June 26	CN Tower's Birthday. Today the CN Tower turns 42.	Red and white
    June 27	Canadian Milticulturalism Day	Red and white
    June 29	National Scleroderma Awareness Month	White and royal blue
    June 30	Arthrogryposis Multiplex Congenital Awareness	Blue
    `;
}

export function getStatus(month, day) {

    var schedule = getSchedule().toString();

    const tab = '	';

    let monthName = getScheduleInfo().month;
    let token = monthName.concat(' ', day, tab);

    let occasion = 'Standard lighting program';
    let colours = 'Red and White';

    let indexStartLine = schedule.indexOf(token);
    if (indexStartLine >= 0) {
        indexStartLine += token.length;
        let line = schedule.substr(indexStartLine);
        let index = line.indexOf('\n');
        line = line.substr(0, index);

        let separator = line.indexOf(tab);
        occasion = line.substr(0, separator);
        colours = line.substr(separator);
    }


    return { occasion: occasion, colours: colours };
}


