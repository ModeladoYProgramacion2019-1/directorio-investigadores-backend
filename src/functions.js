var states =
{
    "aguascalientes" : "Aguacalientes",
    "bajaCalifornia" : "Baja California",
    "bajaCaliforniaSur" : "Baja California Sur",
    "campeche" : "Campeche",
    "chihuahua" : "Chihuahua",
    "chiapas" : "Chiapas",
    "cdmx" : "Ciudad de México",
    "coahuila" : "Coahuila",
    "colima" : "Colima",
    "durango" : "Durango",
    "guerrero" : "Guerrero",
    "guanajuato" : "Guanajuato",
    "hidalgo" : "Hidalgo",
    "jalisco" : "Jalisco",
    "mexico" : "Estado de México",
    "michoacan" : "Michoacán",
    "morelos" : "Morelos",
    "nayarit" : "Nayarit",
    "nuevoLeon" : "Nuevo León",
    "oaxaca" : "Oaxaca",
    "puebla" : "Puebla",
    "queretaro" : "Querétaro",
    "quintanaRoo" : "Quintana Roo",
    "sinaloa" : "Sinaloa",
    "sanLuisPotosi" : "San Luis Potosí",
    "sonora" : "Sonora",
    "tabasco" : "Tabasco",
    "tamaulipas" : "Tamaulipas",
    "tlaxcala" : "Tlaxcala",
    "veracruz" : "Vercruz",
    "yucatan" : "Yucatán",
    "zacatecas" : "Zacatecas"
}

function getStateName(url) {
    if (url in states){
        return states[url]
    } else {
        return ""
    }
}

export { getStateName }
