const city = document.querySelector('.input input');
const search = document.querySelector('.input button');
const uname = document.querySelector('.info h1');
const temp = document.querySelector(".info h2");
const cloud = document.querySelector(".info h3");
const logo = document.querySelector('.logo img');
const check = document.querySelector('.check');
const content = document.querySelector('.content')
const region = document.querySelector('.info p')
const notaion = document.querySelector('.heading i')
const img1 = document.querySelector('.future1 img')
const img2 = document.querySelector('.future2 img')
const img3 = document.querySelector('.future3 img')
const b1 = document.querySelector('.future1 b')
const b2 = document.querySelector('.future2 b')
const b3 = document.querySelector('.future3 b')
const p1 = document.querySelector('.future1 p')
const p2 = document.querySelector('.future2 p')
const p3 = document.querySelector('.future3 p')
const future = document.querySelector('.future')
const hr = document.querySelector('.line')

let count = 0;
const key = 'c6f0a902cc644fb5a20193342252907';

notaion.addEventListener('click', () => {
    if (count == 0) {
        notaion.classList.add("fa-f")
        notaion.classList.remove("fa-c")
        count = 1;
    } else if (count == 1) {
        notaion.classList.remove("fa-f")
        notaion.classList.add("fa-c")
        count = 0;
    }
    search.click();

})

city.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});



search.addEventListener('click', async () => {
    check.innerText = "Checking Weather..."
    const inp = city.value;
    if (inp == '') {
        check.innerText = "Checking Weather..."
        content.classList.add('hide')
        check.classList.remove('hide')
        check.innerText = "PLease Enter Valid Text!!!"
    } else {
        try {
            check.innerText = "Checking Weather..."
            const inp = city.value;
            const info = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${inp}`)
            const response = await info.json();
            console.log(response)
            const info2 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${inp}&days=4`)
            const response2 = await info2.json();
            console.log(response2)
            img1.src = await (response2.forecast.forecastday[0].day.condition.icon);
            p1.innerText = "(" + await response2.forecast.forecastday[0].date + ")";
            img2.src = await (response2.forecast.forecastday[1].day.condition.icon);
            p2.innerText = "(" + await response2.forecast.forecastday[1].date + ")";
            img3.src = await (response2.forecast.forecastday[2].day.condition.icon);
            p3.innerText = "(" + await response2.forecast.forecastday[2].date + ")";
            uname.innerText = await response.location.name;
            region.innerText = await "(" + response.location.region + ")";
            if (count == 0) {
                temp.innerText = response.current.temp_c + "°C";
                b1.innerText = response2.forecast.forecastday[0].day.avgtemp_c + "°C";
                b2.innerText = response2.forecast.forecastday[1].day.avgtemp_c + "°C";
                b3.innerText = response2.forecast.forecastday[2].day.avgtemp_c + "°C";
            } else if (count == 1) {
                temp.innerText = response.current.temp_f + "°F";
                b1.innerText = response2.forecast.forecastday[0].day.avgtemp_f + "°F";
                b2.innerText = response2.forecast.forecastday[1].day.avgtemp_f + "°F";
                b3.innerText = response2.forecast.forecastday[2].day.avgtemp_f + "°F";
            }
        cloud.innerText = await response.current.condition.text;
        logo.src = await response.current.condition.icon;
        hr.classList.remove('hide')
        future.classList.remove('hide')
        content.classList.remove('hide')
        check.classList.add('hide')

    }catch (err) {
        console.log(err);
        check.innerText = "Please enter valid city name"
        hr.classList.add('hide')
        future.classList.add('hide')
        content.classList.add('hide')
        check.classList.remove('hide')
    }
}
})

