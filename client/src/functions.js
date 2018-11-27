var states =
{
    "aguascalientes" : ["Aguacalientes", "AGU"],
    "bajaCalifornia" : ["Baja California","BCN"],
    "bajaCaliforniaSur" : ["Baja California Sur", "BCS"],
    "campeche" : ["Campeche", "CAM"],
    "chihuahua" : ["Chihuahua", "CHP"],
    "chiapas" : ["Chiapas", "CHH"],
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

export { getStateName, getStateCode }
