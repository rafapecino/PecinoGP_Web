
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/All/components/ui/card";

const races = [
    {
        "gp": "Gran Premio de Tailandia",
        "circuit": "Circuito Internacional de Chang, Buriram",
        "dates": "27 febrero-1 marzo",
        "countryCode": "th"
    },
    {
        "gp": "Gran Premio de Brasil",
        "circuit": "Autódromo Internacional Ayrton Senna, Goiânia",
        "dates": "20-22 marzo",
        "countryCode": "br"
    },
    {
        "gp": "Gran Premio de las Américas",
        "circuit": "Circuito de las Américas, Austin",
        "dates": "27-29 marzo",
        "countryCode": "us"
    },
    {
        "gp": "Gran Premio de Catar",
        "circuit": "Circuito Internacional de Losail, Lusail",
        "dates": "10-12 abril",
        "countryCode": "qa"
    },
    {
        "gp": "Gran Premio de España",
        "circuit": "Circuito de Jerez, Jerez de la Frontera",
        "dates": "24-26 abril",
        "countryCode": "es"
    },
    {
        "gp": "Gran Premio de Francia",
        "circuit": "Circuito de Bugatti, Le Mans",
        "dates": "8-10 mayo",
        "countryCode": "fr"
    },
    {
        "gp": "Gran Premio de Cataluña",
        "circuit": "Circuito de Barcelona-Cataluña, Montmeló",
        "dates": "15-17 mayo",
        "countryCode": "es"
    },
    {
        "gp": "Gran Premio de Italia",
        "circuit": "Autódromo Internacional del Mugello, Scarperia",
        "dates": "29-31 mayo",
        "countryCode": "it"
    },
    {
        "gp": "Gran Premio de Hungría",
        "circuit": "Circuito de Balaton Park, Balatonfőkajár",
        "dates": "5-7 junio",
        "countryCode": "hu"
    },
    {
        "gp": "Gran Premio de República Checa",
        "circuit": "Autódromo de Brno, Brno",
        "dates": "19-21 junio",
        "countryCode": "cz"
    },
    {
        "gp": "Gran Premio de Países Bajos",
        "circuit": "Circuito de Assen, Assen",
        "dates": "26-28 junio",
        "countryCode": "nl"
    },
    {
        "gp": "Gran Premio de Alemania",
        "circuit": "Sachsenring, Hohenstein-Ernstthal",
        "dates": "10-12 julio",
        "countryCode": "de"
    },
    {
        "gp": "Gran Premio de Gran Bretaña",
        "circuit": "Circuito de Silverstone, Silverstone",
        "dates": "7-9 agosto",
        "countryCode": "gb"
    },
    {
        "gp": "Gran Premio de Aragón",
        "circuit": "Motorland Aragón, Alcañiz",
        "dates": "28-30 agosto",
        "countryCode": "es"
    },
    {
        "gp": "Gran Premio de San Marino",
        "circuit": "Misano World Circuit Marco Simoncelli, Misano Adriatico",
        "dates": "11-13 septiembre",
        "countryCode": "sm"
    },
    {
        "gp": "Gran Premio de Austria",
        "circuit": "Red Bull Ring, Spielberg",
        "dates": "18-20 septiembre",
        "countryCode": "at"
    },
    {
        "gp": "Gran Premio de Japón",
        "circuit": "Mobility Resort Motegi, Motegi",
        "dates": "2-4 octubre",
        "countryCode": "jp"
    },
    {
        "gp": "Gran Premio de Indonesia",
        "circuit": "Circuito Urbano Internacional de Mandalika, Lombok",
        "dates": "9-11 octubre",
        "countryCode": "id"
    },
    {
        "gp": "Gran Premio de Australia",
        "circuit": "Circuito de Phillip Island, Isla Phillip",
        "dates": "23-25 octubre",
        "countryCode": "au"
    },
    {
        "gp": "Gran Premio de Malasia",
        "circuit": "Circuito Internacional de Sepang, Sepang",
        "dates": "30 octubre-1 noviembre",
        "countryCode": "my"
    },
    {
        "gp": "Gran Premio de Portugal",
        "circuit": "Autódromo Internacional do Algarve, Portimão",
        "dates": "13-15 noviembre",
        "countryCode": "pt"
    },
    {
        "gp": "Gran Premio de la Comunidad Valenciana",
        "circuit": "Circuito Ricardo Tormo, Valencia",
        "dates": "20-22 noviembre",
        "countryCode": "es"
    }
]

export function RaceCalendar() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2" />
                    Calendario MotoGP 2026
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {races.map((race, index) => (
                        <div key={index} className="flex items-center p-4 rounded-lg border">
                            <img
                                src={`https://flagcdn.com/w40/${race.countryCode}.png`}
                                alt={`${race.gp} flag`}
                                className="w-10 h-auto mr-4"
                            />
                            <div className="flex flex-col sm:flex-row justify-between flex-grow">
                                <div>
                                    <p className="font-bold text-lg">{race.gp}</p>
                                    <p className="text-sm text-muted-foreground">{race.circuit}</p>
                                </div>
                                <div className="flex items-center text-sm font-semibold mt-2 sm:mt-0">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {race.dates}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
