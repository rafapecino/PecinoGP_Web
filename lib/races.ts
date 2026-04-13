export interface Race {
    gp: string;
    circuit: string;
    dates: string;
    countryCode: string;
    endDate: string; // ISO format: YYYY-MM-DD
    round: string;
}

export type RaceStatus = "completed" | "next" | "upcoming";

export interface RaceWithStatus extends Race {
    status: RaceStatus;
}

export const races: Race[] = [
    {
        "gp": "Gran Premio de Tailandia",
        "circuit": "Chang International Circuit, Buriram",
        "dates": "27 feb - 1 mar",
        "countryCode": "th",
        "endDate": "2026-03-01",
        "round": "01"
    },
    {
        "gp": "Gran Premio de Brasil",
        "circuit": "Autódromo Internacional Ayrton Senna, Goiânia",
        "dates": "20-22 marzo",
        "countryCode": "br",
        "endDate": "2026-03-22",
        "round": "02"
    },
    {
        "gp": "Gran Premio de las Américas",
        "circuit": "Circuit of the Americas, Austin",
        "dates": "27-29 marzo",
        "countryCode": "us",
        "endDate": "2026-03-29",
        "round": "03"
    },
    {
        "gp": "Gran Premio de Catar",
        "circuit": "Lusail International Circuit, Lusail",
        "dates": "10-12 abril",
        "countryCode": "qa",
        "endDate": "2026-04-12",
        "round": "04"
    },
    {
        "gp": "Gran Premio de España",
        "circuit": "Circuito de Jerez, Jerez de la Frontera",
        "dates": "24-26 abril",
        "countryCode": "es",
        "endDate": "2026-04-26",
        "round": "05"
    },
    {
        "gp": "Gran Premio de Francia",
        "circuit": "Bugatti Circuit, Le Mans",
        "dates": "8-10 mayo",
        "countryCode": "fr",
        "endDate": "2026-05-10",
        "round": "06"
    },
    {
        "gp": "Gran Premio de Cataluña",
        "circuit": "Circuit de Barcelona-Catalunya, Montmeló",
        "dates": "15-17 mayo",
        "countryCode": "es",
        "endDate": "2026-05-17",
        "round": "07"
    },
    {
        "gp": "Gran Premio de Italia",
        "circuit": "Autodromo Internazionale del Mugello, Scarperia",
        "dates": "29-31 mayo",
        "countryCode": "it",
        "endDate": "2026-05-31",
        "round": "08"
    },
    {
        "gp": "Gran Premio de Hungría",
        "circuit": "Balaton Park Circuit, Balatonfőkajár",
        "dates": "5-7 junio",
        "countryCode": "hu",
        "endDate": "2026-06-07",
        "round": "09"
    },
    {
        "gp": "Gran Premio de República Checa",
        "circuit": "Brno Circuit, Brno",
        "dates": "19-21 junio",
        "countryCode": "cz",
        "endDate": "2026-06-21",
        "round": "10"
    },
    {
        "gp": "Gran Premio de Países Bajos",
        "circuit": "TT Circuit Assen, Assen",
        "dates": "26-28 junio",
        "countryCode": "nl",
        "endDate": "2026-06-28",
        "round": "11"
    },
    {
        "gp": "Gran Premio de Alemania",
        "circuit": "Sachsenring, Hohenstein-Ernstthal",
        "dates": "10-12 julio",
        "countryCode": "de",
        "endDate": "2026-07-12",
        "round": "12"
    },
    {
        "gp": "Gran Premio de Gran Bretaña",
        "circuit": "Silverstone Circuit, Silverstone",
        "dates": "7-9 agosto",
        "countryCode": "gb",
        "endDate": "2026-08-09",
        "round": "13"
    },
    {
        "gp": "Gran Premio de Aragón",
        "circuit": "Motorland Aragón, Alcañiz",
        "dates": "28-30 agosto",
        "countryCode": "es",
        "endDate": "2026-08-30",
        "round": "14"
    },
    {
        "gp": "Gran Premio de San Marino",
        "circuit": "Misano World Circuit Marco Simoncelli, Misano",
        "dates": "11-13 septiembre",
        "countryCode": "sm",
        "endDate": "2026-09-13",
        "round": "15"
    },
    {
        "gp": "Gran Premio de Austria",
        "circuit": "Red Bull Ring, Spielberg",
        "dates": "18-20 septiembre",
        "countryCode": "at",
        "endDate": "2026-09-20",
        "round": "16"
    },
    {
        "gp": "Gran Premio de Japón",
        "circuit": "Mobility Resort Motegi, Motegi",
        "dates": "2-4 octubre",
        "countryCode": "jp",
        "endDate": "2026-10-04",
        "round": "17"
    },
    {
        "gp": "Gran Premio de Indonesia",
        "circuit": "Mandalika International Street Circuit, Lombok",
        "dates": "9-11 octubre",
        "countryCode": "id",
        "endDate": "2026-10-11",
        "round": "18"
    },
    {
        "gp": "Gran Premio de Australia",
        "circuit": "Phillip Island Circuit, Phillip Island",
        "dates": "23-25 octubre",
        "countryCode": "au",
        "endDate": "2026-10-25",
        "round": "19"
    },
    {
        "gp": "Gran Premio de Malasia",
        "circuit": "Sepang International Circuit, Sepang",
        "dates": "30 oct - 1 nov",
        "countryCode": "my",
        "endDate": "2026-11-01",
        "round": "20"
    },
    {
        "gp": "Gran Premio de Portugal",
        "circuit": "Autódromo Internacional do Algarve, Portimão",
        "dates": "13-15 noviembre",
        "countryCode": "pt",
        "endDate": "2026-11-15",
        "round": "21"
    },
    {
        "gp": "Gran Premio de la Comunidad Valenciana",
        "circuit": "Circuit Ricardo Tormo, Valencia",
        "dates": "20-22 noviembre",
        "countryCode": "es",
        "endDate": "2026-11-22",
        "round": "22"
    }
];

export function getRacesWithStatus(): RaceWithStatus[] {
    const now = new Date();
    // Reset hours to compare only dates
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let nextRaceFound = false;
    
    return races.map(race => {
        const raceDate = new Date(race.endDate);
        let status: RaceStatus = "upcoming";
        
        if (raceDate < today) {
            status = "completed";
        } else if (!nextRaceFound) {
            status = "next";
            nextRaceFound = true;
        } else {
            status = "upcoming";
        }
        
        return {
            ...race,
            status
        };
    });
}

export function getNextRace(): RaceWithStatus | undefined {
    const racesWithStatus = getRacesWithStatus();
    return racesWithStatus.find(r => r.status === "next");
}
