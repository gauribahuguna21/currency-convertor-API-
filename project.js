const base_url="https://v6.exchangerate-api.com/v6/3e70d0f61470358b47704a53/latest";

let dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg")


for(let select of dropdowns){
    for(currCode in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
       }
       else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";
       }
       select.append(newOption);


    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}

const updateFlag=(element)=>{
    let currCode=element.value;
    let CountryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${CountryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
const UpdateExchangeRate=async()=>{
    
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    
    if(amtVal=="" || amtVal<1){
         amtVal="1";
         amount.value="1";
    }    


    const URL=`${base_url}/${fromCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.conversion_rates[toCurr.value];

    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;

    
    
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    UpdateExchangeRate();
});

window.addEventListener("load",(evt)=>{
    UpdateExchangeRate();
});