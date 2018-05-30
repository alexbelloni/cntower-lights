function getSchedule() {
    return `
    May 1	Let’s Go Raptors! Our lighting celebrates the Toronto Raptors in the NBA playoffs	Red
    Mat 1	First Responders Day	Red
    May 2	Mental Health Week	Green
    May 2	35th Anniversary of CBRE #Humboltstrong	Green and yellow
    May 3	Brain Tumour Awareness Month	Orange and blue
    May 4	Huntington Disease Awareness Month	Blue and purple
    May 4	Community Living Month in Ontario	Blue and green
    May 5	World Pulmonary Hypertension Day	Purple
    May 5	Cystic Fibrosis Awareness Month	Blue and turquoise
    May 6	Pediatric Stroke Awareness Day	Purple
    May 6	Ontario Police Memorial Ceremony - Honouring police officers in the Province of Ontario who lost their lives in the line of duty	Blue
    May 7	Bladder Cancer Awareness Month	Yellow
    May 7	Melanoma Awareness Month	Yellow
    May 8	World Ovarian Cancer Day	Teal
    May 8	30th Anniversary of Drive Sober	Red and white
    May 9	Lymphangioleimyomatosis Awareness (LAM)	Orange
    May 10	World Lupus Day	Purple and white
    May 11	Children's Mental Health Week	Green
    May 12	"Light up the Night" 5th Anniversary - Chronic Immunological and Neurological Diseases (CIND)	Blue, purple and green
    May 13	Mother's Day - top of the hour effect	Red and pink
    May 14	Celiac Disease Awareness Month	Green
    May 14	Our regularly scheduled top of the hour light show will be replaced with lighting for the 1-year countdown to 2019 SOO Invitational Youth Games 	Red and white
    May 15	Tuberous Sclerosis Complex Global Awareness Day	Blue
    May 16	World Hypertension Day	Red
    May 17	World Neurofibromatosis (NF) Awareness Day	Blue and green
    May 18	Lyme Disease Awareness Month	Green
    May 19	World IBD Day	Purple
    May 19	Celebrating the Royal Wedding	Purple
    May 20	Food Allergy (Anaphylaxis) Awareness Month	Teal
    May 21	Victoria Day - Honouring the birthdays of Queen Victoria and Queen Elizabeth	Purple and gold
    May 24	Inside Out - Toronto LGBT Film Festival	Rainbow
    May 24	National Schizophrenia and Psychosis Awareness Day	Green
    May 25	Plaid for Dad - Prostate Cancer Awareness	Blue
    May 26	Leukemia and Lymphoma Awareness	Red and white
    May 30	World MS Day	Red
    May 31	LBBTQ Spring Soiree	Rainbow
    `;
}

export function getStatus(month, day) {

var schedule = getSchedule().toString();

const tab = '	';

let monthName = 'May'
let token = monthName.concat(' ', day, tab);

let occasion = '-';
let colour = '-';

let indexStartLine = schedule.indexOf(token);
if(indexStartLine >= 0) {
    indexStartLine += token.length;
    let line = schedule.substr(indexStartLine);
    let index = line.indexOf('\n');
    line = line.substr(0, index);

    let separator = line.indexOf(tab);
    occasion = line.substr(0, separator);
    colour = line.substr(separator);
}


return {occasion: occasion, colour: colour};
}


