var states =
{
    "aguascalientes" : ["Aguacalientes", "AGU"],
    "bajaCalifornia" : ["Baja California","BCN"],
    "bajaCaliforniaSur" : ["Baja California Sur", "BCS"],
    "campeche" : ["Campeche", "CAM"],
    "chihuahua" : ["Chihuahua", "CHH"],
    "chiapas" : ["Chiapas", "CHP"],
    "cdmx" : ["Ciudad de México", "CMX"],
    "coahuila" : ["Coahuila", "COA"],
    "colima" : ["Colima", "COL"],
    "durango" : ["Durango", "DUR"],
    "guanajuato" : ["Guanajuato", "GUA"],
    "guerrero" : ["Guerrero", "GRO"],
    "hidalgo" : ["Hidalgo", "HID"],
    "jalisco" : ["Jalisco", "JAL"],
    "mexico" : ["Estado de México", "MEX"],
    "michoacan" : ["Michoacán", "MIC"],
    "morelos" : ["Morelos", "MOR"],
    "nayarit" : ["Nayarit", "NAY"],
    "nuevoLeon" : ["Nuevo León", "NLE"],
    "oaxaca" : ["Oaxaca", "OAX"],
    "puebla" : ["Puebla", "PUE"],
    "queretaro" : ["Querétaro", "QUE"],
    "quintanaRoo" : ["Quintana Roo", "ROO"],
    "sanLuisPotosi" : ["San Luis Potosí", "SLP"],
    "sinaloa" : ["Sinaloa", "SIN"],
    "sonora" : ["Sonora", "SON"],
    "tabasco" : ["Tabasco", "TAB"],
    "tamaulipas" : ["Tamaulipas", "TAM"],
    "tlaxcala" : ["Tlaxcala", "TLA"],
    "veracruz" : ["Vercruz", "VER"],
    "yucatan" : ["Yucatán", "YUC"],
    "zacatecas" : ["Zacatecas", "ZAC"]
}

var codes =
{
    "AGU" : "Aguacalientes",
    "BCN" : "Baja California",
    "BCS" : "Baja California Sur",
    "CAM" : "Campeche",
    "CHH" : "Chihuahua",
    "CHP" : "Chiapas",
    "CMX" : "Ciudad de México",
    "COA" : "Coahuila",
    "COL" : "Colima",
    "DUR" : "Durango",
    "GUA" : "Guanajuato",
    "GRO" : "Guerrero",
    "HID" : "Hidalgo",
    "JAL" : "Jalisco",
    "MEX" : "Estado de México",
    "MIC" : "Michoacán",
    "MOR" : "Morelos",
    "NAY" : "Nayarit",
    "NLE" : "Nuevo León",
    "OAX" : "Oaxaca",
    "PUE" : "Puebla",
    "QUE" : "Querétaro",
    "ROO" : "Quintana Roo",
    "SLP" : "San Luis Potosí",
    "SIN" : "Sinaloa",
    "SON" : "Sonora",
    "TAB" : "Tabasco",
    "TAM" : "Tamaulipas",
    "TLA" : "Tlaxcala",
    "VER" : "Veracruz",
    "YUC" : "Yucatán",
    "ZAC" : "Zacatecas"
}

function getStateName(url) {
    if (url in states){
        return states[url][0]
    } else {
        return ""
    }
}

function getStateCode(url) {
    if (url in states){
        return states[url][1]
    } else {
        return ""
    }
}

function getStateNameWithCode(code) {
    if (code in codes){
        return codes[code]
    } else {
        return ""
    }
}

export { getStateName, getStateCode, getStateNameWithCode, codes }
