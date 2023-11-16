/*Author: Noa Shelach*/
import { fetchByCountryName, fetchByCapitalCity, fetchByCountryCode, render } from "./functions.js";

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const container = document.getElementById("countryCard");
const navItems = document.querySelectorAll(".navItem");

const searchCountry = async (event, searchValue) => {
    event.preventDefault();
    await fetchByCountryName(searchValue) //start search by name
        .then(res => {
            container.innerHTML = "";
            render(container, res[0]);
        })
        .catch(err => {
            if (err.response.data.status == 404) {
                console.log("search capitals");
                fetchByCapitalCity(searchValue) //try search by capital city
                    .then(res => {
                        container.innerHTML = "";
                        render(container, res[0]);

                    })
                    .catch(err => {
                        if (err.response.data.status == 404) {
                            fetchByCountryCode(searchValue) //try search by country code
                                .then(res => {
                                    container.innerHTML = "";
                                    render(container, res[0]);

                                })
                                .catch(err => {
                                    console.log(err);
                                    container.innerHTML = `<div id="notfound"><h1>Sorry, we could'nt find...</h1><p>please try again</p></div>`
                                })


                        }
                    })

            }
        });


}


searchForm.addEventListener("submit", (event) => {
    searchCountry(event, searchInput.value);
});
navItems.forEach((item) => {
    item.addEventListener("click", async () => {
        const name = item.dataset.fullname;
        const res = await fetchByCountryName(name);
        container.innerHTML = "";
        render(container, res[0]);
    })
})


