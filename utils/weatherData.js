import request from "request";

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "9f98cba1d3744e51ef1b70eb6876f97c"
}

const weatherData = (address, callback) => {
    const url =
        openWeatherMap.BASE_URL +
        encodeURIComponent(address) +
        "&APPID=" +
        openWeatherMap.SECRET_KEY;
    console.log(url);

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(true, "Unable to fetch data, Please try agian" + error);
        }
        callback(false, response?.body);
    });
};

export default weatherData;