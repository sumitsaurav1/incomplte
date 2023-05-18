let baseURl=`https://bus-booking-accio.onrender.com`;
let sourceCity,destinationCity;
function debounce(callBack,timer){
    let timerId;
    // console.log(e)
    return (e,id)=>{
        if(timerId){
            clearTimeout(timerId)
        }
        timerId= setTimeout(()=>{
            callBack(e,id);
        },timer)
    }
}
function appendCityList(cityList,id){
    let list = document.getElementById(id)
    list.innerHTML="";
    // list.className += " result-container"
    list.style.display="block"
    cityList.forEach((item)=>{
        let div = document.createElement("div");
        div.innerText=item.city_name;
        div.addEventListener("click",()=>{
            if(id=="origin-result"){
                sourceCity=item;
            }
            else{
                destinationCity=item;
            }
            let inputElment=document.getElementById(id.split("-")[0]);
            inputElment.value=item.city_name;
            list.style.display="none"
        })
        list.appendChild(div);
    })
}
async function loadCities(searchString,id){
    console.log(searchString)
    let endPoint= baseURl+`/city?search=${searchString}`;
    try{
        let response = await fetch(endPoint);
        //console.log(response)
        let result = await response.json();
        console.log(result)
        
        let cityList=result.results;
        appendCityList(cityList,id)
    }
    catch(error){
        console.log(error)
    }
}
let fetchCities=debounce(loadCities,200)

// let onKeyUpEvent=debounce(loadCities,1000);
function onKeyUpEvent(event,id){
    let searchString=event.target.value;
    let l= document.getElementById("origin-result");
    if(searchString.length<3){
       l.style.display="none"
    }
    if(searchString.length>=3){
        fetchCities(searchString,id);
    }
}
document.getElementById("origin").addEventListener('keyup',(e)=>{
    onKeyUpEvent(e,"origin-result")
})

document.getElementById("destination").addEventListener('keyup',(e)=>{
    onKeyUpEvent(e,"destination-result")
})
