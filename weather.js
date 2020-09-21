let http = require('http');

function printMessage(city, temperature, pressure){
    console.log("A " +city+", la temperature est de " + (temperature-273.15).toFixed(2) + " °C et la pression est de " +  pressure +" pascals")
}
function printError(error){
    console.error(error.message);
}

function get(city){
    let request = http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+',fr&APPID=bbf96fd647b0266d023f3817fb583260',(response)=>{


        let body ="";
        response.on("data",(chunk)=>{//a chaque fois qu une portion(chunk) de donnee arrive
            body += chunk;
        });

        response.on("end",()=>{
            if (response.statusCode === 200){
                try {
                    let data_weather = JSON.parse(body);// parse les donnees en JSON
                    printMessage(city, data_weather.main.temp, data_weather.main.pressure)
                } catch (error){
                    console.error("Ville inconnue")
                }}else {
                printError({message:"impossible de recupérer les informations"});
            }

        });
        request.on('error',printError);//callback de l erreur passe le parametre a la fonction
    })
}
module.exports.get =get;
