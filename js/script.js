// función que trae los datos de la API
// función que ordena los países
// función que renderiza el DOM
// dentro función que muestra la ventana flotante al hacer click
// función que cierra la ventana flotante
// función inicial que tiene todas las demás dentro

const countriesList = document.getElementById("countries-list"),
      modal = document.getElementById("modal"),
      countryInfo = document.getElementById("countryInfo"),
      closeButton = document.getElementById("closeButton"),
      modalContent = document.getElementById("modalContent");

//1. traer datos de la API
const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital');
        if (!response.ok) throw new Error('Ha surgido un error');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//3. ordenar países alfabéticamente
const sortCountries = (data) => data.sort((a, b) => a.name.common.localeCompare(b.name.common));

//4. renderizar banderas
const countriesDom = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach(country => {
        const div = document.createElement("div");
        div.classList.add("country-card");
        div.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag"/>
            <h2>${country.name.common}</h2>
        `;

        //4.1 abrir modal al hacer click
        div.addEventListener("click", () => {
            countryInfo.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common} flag"/>
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital}</p>
                <p>Población: ${country.population}</p>
                <p>Lado de la carretera: ${country.car.side}</p>
            `;
            modal.style.display = "flex";
            closeButton.style.display = "block";
        });

        fragment.appendChild(div);
    });

    countriesList.appendChild(fragment);
};

//5. cerrar modal
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        closeButton.style.display = "none";
    }
})

//2. función donde llamamos a todo e inicia el proceso
const init = async () => {
    const data = await getCountries();
    sortCountries(data);
    countriesDom(data);
};

init();
