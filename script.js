const city = document.querySelector('.input input');
const search = document.querySelector('.input button');
const uname = document.querySelector('.info h1');
const temp = document.querySelector(".info h2");
const cloud = document.querySelector(".info h3");
const logo = document.querySelector('.logo img');
const check = document.querySelector('.check');
const content = document.querySelector('.content')
const region = document.querySelector('.info p')

const key = 'cacbac3cade44a42880141541250707';

search.addEventListener('click',async() =>{
    check.innerText = "Checking Weather..."
     const inp = city.value;
     if(inp == ''){
        content.classList.add('hide')
        check.classList.remove('hide')
        check.innerText = "PLease Enter Valid Text!!!"
     }else{try{

        const inp = city.value;
        const info = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${inp}`)
        const response = await info.json();
        console.log(response)
        uname.innerText = await response.location.name;
        region.innerText =await "("+response.location.region+")";
        temp.innerText =await response.current.temp_c + "C";
        cloud.innerText =await response.current.condition.text;
        logo.src =await response.current.condition.icon;
        content.classList.remove('hide')
        check.classList.add('hide')

    }catch(err){
        console.log(err);
        check.innerText = "Please enter valid city name"
        content.classList.add('hide')
        check.classList.remove('hide')
    }
     }
})

