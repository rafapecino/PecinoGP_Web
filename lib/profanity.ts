/**
 * Filtro de contenido ofensivo para las preguntas del "Debate Comunitario".
 *
 * Normaliza el texto para evitar evasiones habituales (acentos, mayúsculas,
 * leetspeak como "put4"/"c@bron", separadores tipo "p.u.t.a" o "p u t a",
 * y letras repetidas "putaaaa") y comprueba contra una lista amplia de
 * términos en español e inglés.
 */

// Lista amplia (términos base, en minúscula y sin acentos). Se comparan como
// palabra completa y también "despaciado" para los términos más largos.
const BLOCKLIST: string[] = [
  // --- Español: insultos / obscenidades ---
  "puta",
  "puto",
  "putada",
  "putear",
  "puto",
  "zorra",
  "zorras",
  "perra",
  "cabron",
  "cabrona",
  "cabronazo",
  "gilipollas",
  "gilipolla",
  "gilipuertas",
  "capullo",
  "capulla",
  "mamon",
  "mamona",
  "mamahuevo",
  "mamaguevo",
  "chupapollas",
  "chupapenes",
  "lameculos",
  "hijoputa",
  "hijodeputa",
  "hijaputa",
  "hijadeputa",
  "hdp",
  "mierda",
  "mierdas",
  "cagada",
  "cagado",
  "cagon",
  "coño",
  "cono",
  "conyo",
  "polla",
  "pollas",
  "verga",
  "vergas",
  "picha",
  "pichula",
  "carajo",
  "pene",
  "pito",
  "cojones",
  "cojon",
  "huevos",
  "webon",
  "huevon",
  "hueon",
  "pendejo",
  "pendeja",
  "pelotudo",
  "pelotuda",
  "boludo",
  "boluda",
  "gonorrea",
  "malparido",
  "malparida",
  "chinga",
  "chingada",
  "chingar",
  "chingado",
  "chingados",
  "verguero",
  "culero",
  "culiao",
  "culiado",
  "conchudo",
  "conchatumadre",
  "concha",
  "coger",
  "cojer",
  "follar",
  "follada",
  "follame",
  "joder",
  "jodete",
  "jodido",
  "tetas",
  "teta",
  "culo",
  "culos",
  "orto",
  "trolo",
  "maricon",
  "maricona",
  "mariconazo",
  "marica",
  "maricas",
  "puta madre",
  "putamadre",
  "sudaca",
  "moro",
  "negrata",
  "negrato",
  "retrasado",
  "retrasada",
  "subnormal",
  "subnormales",
  "mongolo",
  "mongolico",
  "tarado",
  "imbecil",
  "idiota",
  "estupido",
  "estupida",
  "tonto del culo",
  "muerete",
  "matate",
  "suicidate",
  "violar",
  "violador",
  "violacion",
  "nazi",
  // --- Inglés ---
  "fuck",
  "fucker",
  "fucking",
  "motherfucker",
  "shit",
  "bullshit",
  "bitch",
  "bitches",
  "asshole",
  "cunt",
  "dick",
  "dickhead",
  "cock",
  "pussy",
  "whore",
  "slut",
  "bastard",
  "faggot",
  "fag",
  "nigger",
  "nigga",
  "retard",
  "retarded",
  "rape",
  "rapist",
  "kys",
  "cum",
  "jerkoff",
  "wanker",
];

// Términos largos e inequívocos que se pueden buscar como substring sin riesgo
// de falsos positivos (no aparecen dentro de palabras legítimas). Sirve para
// pillar concatenaciones y evasiones ("hijo.de.puta", "gili pollas").
const SUBSTRING_SAFE = [
  "hijodeputa",
  "hijadeputa",
  "hijoputa",
  "hijaputa",
  "gilipollas",
  "gilipolla",
  "chupapollas",
  "chupapenes",
  "lameculos",
  "malparido",
  "malparida",
  "mamahuevo",
  "mamaguevo",
  "conchatumadre",
  "conchetumadre",
  "mariconazo",
  "motherfucker",
  "subnormal",
];

function normalize(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // quita acentos (marcas diacríticas)
      .replace(/0/g, "o")
      .replace(/1/g, "i")
      .replace(/3/g, "e")
      .replace(/4/g, "a")
      .replace(/5/g, "s")
      .replace(/7/g, "t")
      .replace(/8/g, "b")
      .replace(/@/g, "a")
      .replace(/\$/g, "s")
      // colapsa letras repetidas: "putaaaa" -> "puta", "coooño" -> "coño"
      .replace(/(.)\1{2,}/g, "$1$1")
  );
}

/**
 * Devuelve true si el texto contiene lenguaje ofensivo según la lista.
 */
export function containsProfanity(text: string): boolean {
  if (!text) return false;
  const norm = normalize(text);

  // 1) Comprobación por palabra (con límites de palabra flexibles).
  const words = norm.split(/[^a-z0-9ñ]+/i).filter(Boolean);
  const wordSet = new Set(words);
  for (const term of BLOCKLIST) {
    // términos de una sola palabra
    if (!term.includes(" ")) {
      if (wordSet.has(term)) return true;
      // sufijos plurales/derivados simples
      if (wordSet.has(term + "s") || wordSet.has(term + "es")) return true;
    } else {
      // términos con espacio: buscar la frase normalizada
      if (norm.includes(term)) return true;
    }
  }

  // 2) Substring solo para términos largos e inequívocos (sin riesgo de FP).
  //    Se busca sobre el texto sin separadores, así "hijo.de.puta" también cae.
  const collapsed = norm.replace(/[^a-zñ]/g, "");
  for (const term of SUBSTRING_SAFE) {
    if (collapsed.includes(term)) return true;
  }

  return false;
}
