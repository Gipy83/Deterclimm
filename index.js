
fetch("./prodotti.json").then((res) => { return res.json() })
    .then((json) => {


    let el = document.getElementById('menu');
    let bb = document.getElementById('blackBox');
    let closeMenu = () => {
        el.classList.add('hidden');
        el.classList.remove('visibile');
        bb.classList.add('comparsaBlackBox');
        bb.classList.remove('scomparsaBlackBox');
    }
    let openMenu = () => {
        el.classList.remove('hidden');
        el.classList.add('visibile');
        bb.classList.remove('comparsaBlackBox');
        bb.classList.add('scomparsaBlackBox');
    }

    document.getElementById('menuIcon').addEventListener('click', openMenu);
    bb.addEventListener('click', closeMenu);



    let generateProducts = (listOfProducts) => {
        let length = listOfProducts.length;
        let productsDOM = document.getElementById("products");
        productsDOM.innerHTML = '';
        for (let i = 0; i < length; i++) {
        let product = listOfProducts[i];
        let productDOM = document.createElement("div");
        productDOM.classList.add("col-4");
        productDOM.classList.add("custom_card");

        let productIMG = document.createElement("img");
        productIMG.classList.add("card_img");
        productIMG.src = product.img;

        let productTitle = document.createElement("div");
        productTitle.classList.add("card_title");
        productTitle.innerText = product.titolo;

        let productDescription = document.createElement("div");
        productDescription.classList.add("card_description");
        productDescription.innerText = product.descrizione;


        productDOM.appendChild(productIMG);
        productDOM.appendChild(productTitle);
        productDOM.appendChild(productDescription);
        productsDOM.appendChild(productDOM);
        }
    }

    let generateItemsOfSlider = (filteredElements) => {
        let sliderContainer = document.getElementById('sliderContainer');
        let sliderIndicator = document.getElementById('carousel-indicators');
        sliderContainer.innerHTML = '';
        sliderIndicator.innerHTML = '';
        let numberOfItems = filteredElements.length;
        for (let i = 0; i < numberOfItems; i++) {
        // SEZIONE IMMAGINI
        let element = filteredElements[i];
        let newDiv = document.createElement("div");
        newDiv.classList.add("carousel-item");
        if (i === 0) {
            newDiv.classList.add("active");
        }
        let imageElement = document.createElement("img");
        imageElement.src = element.img;
        // imageElement.classList.add("imgToPush");
        newDiv.appendChild(imageElement);

        newDiv.addEventListener("click", () => {
            let productsFiltered = json.items.filter(prodotto => prodotto.tipo === element.tipo);
            generateProducts(Array.from(productsFiltered.values()));
        })

        sliderContainer.appendChild(newDiv);

        // SEZIONE INDICATORI
        let indicatore = document.createElement('li');
        indicatore.setAttribute("data-target", element.titolo);
        indicatore.setAttribute("data-slide-to", i);
        sliderIndicator.appendChild(indicatore);
        }
    }



    generateItemsOfSlider(json.categoria);


})