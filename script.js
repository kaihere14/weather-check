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

let count = 0;
const key = 'cacbac3cade44a42880141541250707';

notaion.addEventListener('click',()=>{
    if(count == 0){
        notaion.classList.add("fa-f")
        notaion.classList.remove("fa-c")
        count = 1;
    }else if(count == 1){
       notaion.classList.remove("fa-f")
       notaion.classList.add("fa-c")
        count =0;
    }
    search.click();

})

city.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});



search.addEventListener('click',async() =>{
    check.innerText = "Checking Weather..."
     const inp = city.value;
     if(inp == ''){
        check.innerText = "Checking Weather..."
        content.classList.add('hide')
        check.classList.remove('hide')
        check.innerText = "PLease Enter Valid Text!!!"
     }else{try{
        check.innerText = "Checking Weather..."
        const inp = city.value;
        const info = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${inp}`)
        const response = await info.json();
        uname.innerText = await response.location.name;
        region.innerText =await "("+response.location.region+")";
        if(count ==0){
        temp.innerText =await response.current.temp_c + "C";
        }else if(count ==1){
            temp.innerText =await response.current.temp_f + "F";
        }
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

