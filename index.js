const URL ="https://db.ygoprodeck.com/api/v7/cardinfo.php?num=30&offset=0"
let URLEND ="https://db.ygoprodeck.com/api/v7/cardinfo.php?"
let cartas=[];
let cartPage=30;
let offset=0;
const fetchCartas= async (url=URL)=>{
    try{

        console.log("Peticion...");
        const response=await fetch(url);//FETCH -> [GET] peticiones HTTP
        const {data: cartas}=await response.json();//body //stringify ->json()
        console.log(cartas);
        return cartas;
    }
    catch(err)
    {
        console.error(err);
    }
    }

const buscarCarta=async()=>
{
    const {value:name}=document.querySelector("#EntradaCarta");
    cartas= await fetchCartas(`${URLEND}&name=${name}`);
    iterateCartas(cartas);
    console.log("Buscar carta");
}
const searchAPI= async(event)=>{

    //Limito la cantidad de cartas a 30,60 o 100
    //const {target:{value}}=event
    
    //cartPage=event.target.value;
    //cartas= await fetchCartas(`${URLEND}num=${cartPage}&offset=0`);
   // console.log(event);
   // iterateCartas(cartas);
   //console.log(document.getElementById("cardspage").value);
    const cardsperpage=document.getElementById("cardsperpage").value
    const typemonstercard=document.getElementById("type-monster-card").value
    const racemonstercard=document.getElementById("race-monster-card").value
    const spellcard=document.getElementById("spell card").value
    const trapcard=document.getElementById("trap card").value
    offset=(document.getElementById("offset").value)*cardsperpage;
   const {target:{value,className}}=event;
   console.log(value,className,cardsperpage,typemonstercard,racemonstercard,spellcard,trapcard);
   if(className== "race-monster-card")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&race=${racemonstercard}&type=${typemonstercard}&offset=${offset}`);
   if(className== "type-monster-card")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&race=${racemonstercard}&type=${typemonstercard}&offset=${offset}`);
   if(className== "spell card")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&race=${spellcard}&type=${className}&offset=${offset}`);
   if(className== "trap card")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&race=${trapcard}&type=${className}&offset=${offset}`);
   if(className== "cardsperpage")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&offset=${offset}`);
   if(className== "offset")  cartas= await fetchCartas(`${URLEND}num=${cardsperpage}&offset=${offset}`);
   /*
   if(className=="cardsperpage") 
   if(className=="type-monster-card")
        cartas= await fetchCartas(`${URLEND}num=${cartPage}&type=${value}&offset=0`);
   if(className=="race-monster-card")
   cartas= await fetchCartas(`${URLEND}num=${cartPage}&race=${value}&offset=0`);
   if(className=="spell card"||className=="trap card") 
       cartas= await fetchCartas(`${URLEND}num=${cartPage}&type=${className}&race=${value}&offset=0`);
   console.log(cartas);
*/

   iterateCartas(cartas);
    
    
}
const searchAPI2= async(event)=>{
    
    //Limito la cantidad de cartas a 30,60 o 100
    const {target:{value,className}}=event;
    console.log(value,className);
    if(className=="type-monster-card")
         cartas= await fetchCartas(`${URLEND}num=${cartPage}&type=${value}&offset=0`);
    if(className=="race-monster-card")
    cartas= await fetchCartas(`${URLEND}num=${cartPage}&race=${value}&offset=0`);
    if(className=="spell card"||className=="trap card") 
        cartas= await fetchCartas(`${URLEND}num=${cartPage}&type=${className}&race=${value}&offset=0`);
    console.log(cartas);
    iterateCartas(cartas);
}


const createNode=({id,name,type,desc,race,card_images,atk,def,level,attribute})=>{
    
    const node=`
    <div class="col-sm-4 col-12" id="${id}">
        <div class="card mt-5 ml-3">
            <img src="${card_images[0].image_url}"/>
            <div class="card-body">
            
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Type :${type}</p>
            <p class="card-text">Description :${desc}</p>
            <p class="card-text">Race :${race}</p>
            <p class="card-text">Level:${level||"-"} atributte:${attribute||"-"}</p>
            <p class="card-text">ATK :${atk||"-"} DEF:${def||"-"}</p>

            <button  onClick="del(${id})"class="btn btn-danger btn-block">Borrar</button>
            </div>
        </div>
    </div>

    `;
    document.getElementById("apiR").insertAdjacentHTML("beforeend",node);
  
};
const iterateCartas=(cartas)=>{  
    document.getElementById("apiR").innerHTML="";  
    document.querySelector("#input").disabled=false;
    cartas.map((carta)=>{
        const html=createNode(carta);
        
     
    });
}; 
const showMessage=()=>{
    //mostrar mensaje en un span
    document.querySelector("#message").innerHTML="No hay personajes";
    document.querySelector("#input").disabled=true;
}
const searchCarta=()=>{

    const {value:name}=document.querySelector("#input");
    cartas=new Array(cartas.find((carta)=>carta.name.toLowerCase()===name.toLowerCase()));
    console.log(cartas);
    document.getElementById("apiR").innerHTML="";
    (cartas[0]!==undefined)? iterateCartas(cartas):showMessage();
    
    
   
};
async function start(){

    document.getElementById("find").addEventListener("click",searchCarta);
    document.getElementById("buscarCarta").addEventListener("click",buscarCarta);
    cartas= await fetchCartas();
    console.log(cartas);
    iterateCartas(cartas);
    
   
}

windowonload=start();