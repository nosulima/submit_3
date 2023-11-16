const ZOOM = 4;

const fetchByCountryName = async (countryName) => {
    console.log("in fetchByCountryName");
    const res = await axios.get('https://restcountries.com/v3.1/name/' + countryName);
    console.log(await res.data);
    return await res.data;
}
const fetchByCountryCode = async (countryCode) => {
    console.log("in fetch country code");
    const res = await axios.get('https://restcountries.com/v3.1/alpha/' + countryCode);
    return await res.data;
}
const fetchByCapitalCity = async (capitalCity) => {
    const res = await axios.get('https://restcountries.com/v3.1/capital/' + capitalCity);
    return await res.data;
}


const present_map = (name_of_cuntry, x, y) => {
    const myMap = document.getElementById("myMap");
    const mapContainer = document.createElement("div");
    mapContainer.id = "map";
    myMap.innerHTML = "";
    myMap.append(mapContainer);
    var cuntryCoordinates = [x, y];
    console.log(cuntryCoordinates);
    var map = L.map('map').setView(cuntryCoordinates, ZOOM);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '© OpenStreetMap contributors' }).addTo(map);
    L.marker(cuntryCoordinates).addTo(map).bindPopup(name_of_cuntry);

}

const createCountryCard =  (obj) => {
    console.log("in createCountryCard");
    console.log(obj);
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("w-100");
    card.classList.add("m-0");
    console.log(card);
    console.log(obj);
    console.log(obj.currencies);
    card.innerHTML = `<div id="countryRow" class="d-flex w-100">
    <div id="countryFlag" class="col-6"><img id="flagImg" src=${obj.flags.png}></div>
    <div class="col-6" id="countryName"> <h4>${obj.name.common}</h4></div></div>
    <div id="countryInfo" class="w-100">
    <ul id="ulInfo" class="list-unstyled">
    <li><label class="term">Capital:</label> ${obj.capital}</li>
    <li><label class="term">Region:</label> ${obj.region}</li>
    <li><label class="term">Population:</label> ${obj.population}</li>
    <li><label class="term">Coin:</label> ${Object.values(obj.currencies)[0].name} (${Object.values(obj.currencies)[0].symbol})</li>
    <li><lable class="term">Language: </lable>${Object.values(obj.languages).map((val)=>val)}</li>
    </ul>
    </div>`
    //
    const borderingStates = document.getElementById("borderingStates");
    borderingStates.innerText = "Bordering states: "
    if(obj.borders){
    obj.borders.map(async (val) => {
        const myName = await fetchByCountryCode(val);
        borderingStates.innerHTML += `<a href="#" class="borderItem" data-bordername=${myName[0].name.common}>${myName[0].name.common}</a>`;
    });
   
}
      return card;
}


const render = (holder, obj) => {
    console.log("in render");
    present_map(obj.name.common, obj.latlng[0], obj.latlng[1]);
    holder.appendChild(createCountryCard(obj));
    
setTimeout(()=>{
    const borders = document.querySelectorAll(".borderItem");
    console.log(borders);
    borders.forEach((item)=>{
        item.addEventListener("click",async()=>{
            const name=item.dataset.bordername;
                    const res = await fetchByCountryName(name);
                    console.log(res);
                    holder.innerHTML = "";
                    render(holder, res[0]);
        })
    })
},500);
}
export {fetchByCountryName , fetchByCountryCode,fetchByCapitalCity ,present_map,render }