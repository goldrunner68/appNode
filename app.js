let http = require('https');
let request = http.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02',(response)=>{
    let body ="";
    response.on("data",(chunk)=>{//a chaque fois qu une portion(chunk) de donnee arrive
        body += chunk;
    });

    response.on("end",()=>{
        let data_weather = JSON.parse(body);// parse les donnees en JSON
        console.log(data_weather.main.temp);
    });
})