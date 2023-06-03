/* PARTIE RÉCUPÉRATION DES PROJETS */
// appel de l'API pour récuper tout les travaux
let allWorks = window.localStorage.getItem("allWorks");

if (allWorks === null) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const allWorks = await reponse.json();

    const valeurAllWorks = JSON.stringify(allWorks);
    window.localStorage.setItem("allWorks", valeurAllWorks);
} else {
    allWorks = JSON.parse(allWorks);
};

async function getAllWork(allWorks) {

    for (let i = 0; i < allWorks.length; i++) {

        const projects = allWorks[i];
        console.log(allWorks);
        // récupération de l'élément du DOM qui recevra la galerie photo
        const sectionGallery = document.querySelector(".gallery");

        // création de la balise <figure> pour un projet
        const figure = document.createElement("figure");
        figure.setAttribute("data-id", allWorks[i].id);
        // console.log(figureModal);

        // création des balises <img> et <figcaption> situées à l'intérieur de <figure>
        const image = document.createElement("img");
        // mettre les images en crossorigin ="anonymous"; pour contrer le CORS et nous autoriser d'afficher les images
        image.setAttribute("crossorigin", "anonymous");
        image.src = projects.imageUrl;

        const title = document.createElement("figcaption");
        title.innerText = projects.title;

        // rattachement de <figure> à la <div class="gallery">
        sectionGallery.appendChild(figure);
        // rattachement des <img> et <figcaption> à <figure>
        figure.appendChild(image);
        figure.appendChild(title);

    };

};

getAllWork(allWorks);

/* PARTIE FILTRE */

// <button> gérant l'affichage de tout les travaux de la gallerie
const allBtn = document.querySelector(".allBtn");
// utilisation de la function -filter pour filtrer les travaux souhaités
allBtn.addEventListener("click", function (e) {
    const allCategories = allWorks.filter(function (allWorks) {
        return allWorks;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWork(allCategories);
});

// <button> gérant l'affichage des travaux concernant les 'objets' dans la gallerie
const objectBtn = document.querySelector(".objectBtn");
// utilisation de la function -filter pour filtrer les travaux 'objets' -id= 1 souhaités
objectBtn.addEventListener("click", function (e) {
    const objectCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 1;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWork(objectCategory);
});

// <button> gérant l'affichage des travaux concernant les 'appartements' dans la gallerie
const apartmentBtn = document.querySelector(".apartmentBtn");
// utilisation de la function -filter pour filtrer les travaux 'appartements' -id=2 souhaités
apartmentBtn.addEventListener("click", function (e) {
    const apartmentCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 2;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWork(apartmentCategory);
});

// <button> gérant l'affichage des travaux concernant les 'hotêls et restaurants' dans la gallerie
const hotelBtn = document.querySelector(".hotelBtn");
// utilisation de la function -filter pour filtrer les travaux 'hotêls et restaurants' -id=3 souhaités
hotelBtn.addEventListener("click", function (e) {
    const hotelCategory = allWorks.filter(function (allWorks) {
        return allWorks.category.id === 3;
    });
    // suppression de tout le contenu de la class .gallery
    document.querySelector(".gallery").innerHTML = "";
    getAllWork(hotelCategory);
});

// permet de définir la constante buttonsFIlters en ciblant un élément du HTML
const buttonsFilters = document.querySelectorAll(".filters-btn");
// fonction permettant le changement de couleur du bouton sélectionné
function switchColorBtnSelected(e) {
    // on enlève la classe 'active' des boutons
    buttonsFilters.forEach(button => {
        button.classList.remove('active');
    });
    // on ajoute la classe 'active' uniquement sur le bouton sélectionné
    e.target.classList.add('active');
};

// on ajoute un écouteur d'évenement au 'clic' des boutons
buttonsFilters.forEach(button => {
    button.addEventListener('click', switchColorBtnSelected);
});

/* PARTIE DÉCONNEXION */
// fonction permettant la déconnexion - dès que l'utilisateur 'click' sur le 'logout' alors le compte est déconnecté et est redirigé vers l'accueil du site (index.html)
const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    window.location.href = "index.html";
});

/* PARTIE DASHBOARD ADMIN */
// permet de récupérer les identifiants de l'utilisateur sauvegardé dans le fichier login.js
let userToken = localStorage.getItem("userToken");

// permet l'apparition du dashboard
// si l'utilisateur est connecté(e) alors la partie admin apparait et le 'login' se transforme en 'logout'
// si l'utilisateur est déconnecté(e) alors le dashboard n'est pas visible et le 'logoout' n'est pas visible
if (userToken !== null) {
    document.querySelector('.btn-connect').style.display = 'none';
    document.querySelector('.filters').style.visibility = 'hidden';
    document.querySelector('.logout').style.display = 'block';
    document.querySelector(".edit").style.display = "block";
    document.querySelector(".modif").style.display = "block";
    document.querySelector(".edit-image").style.display = "block";
    document.querySelector(".edit-description").style.display = "block";
} else {
    document.querySelector('.btn-connect').style.display = 'block';
    document.querySelector('.filters').style.visibility = 'visible';
    document.querySelector('.logout').style.display = 'none';
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".modif").style.display = "none";
    document.querySelector(".edit-image").style.display = "none";
    document.querySelector(".edit-description").style.display = "none";
};
// quand je suis connectée je mets un display: block; pour qu'il puisse être vu
// quandje suis déconnectée je mets un display: none; pour qu'il ne se voit pas

/* PARTIE AJOUT MODAL */
let modalEssaie = null;

const openModalEssaie = function (e) {
    e.preventDefault();
    modalEssaie = document.querySelector(e.target.getAttribute('href'));
    modalEssaie.style.display = null;
    modalEssaie.removeAttribute('aria-hidden');
    modalEssaie.setAttribute('aria-modal', 'true');
    // on ajoute l'écouteur d'événement au 'click' pour fermer la modal grâce à la funciton closeModalEssaie
    modalEssaie.addEventListener('click', closeModalEssaie);
    modalEssaie.querySelector('.js-modal-close-essaie').addEventListener('click', closeModalEssaie);
    modalEssaie.querySelector('.js-modal-stop-essaie').addEventListener('click', stopPropagation);
};

const closeModalEssaie = function (e) {
    if (modalEssaie === null) return;
    e.preventDefault();
    modalEssaie.style.display = "none";
    modalEssaie.setAttribute('aria-hidden', 'true');
    modalEssaie.removeAttribute('aria-modal');
    // on suuprimer l'écouteur d'événement au 'click' pour fermer la modal
    modalEssaie.removeEventListener('click', closeModalEssaie);
    modalEssaie.querySelector('.js-modal-close-essaie').removeEventListener('click', closeModalEssaie);
    modalEssaie.querySelector('.js-modal-stop-essaie').removeEventListener('click', stopPropagation);
    modalEssaie = null;
};

// supprime l'effet de fermeture de la modal lorsque l'on clique dedans
const stopPropagation = function (e) {
    e.stopPropagation();
};

// on ajoute un écouteur d'événement au 'click' pour ouvrir la modal grâce à la function openModalEssaie
document.querySelectorAll('.js-modal-essaie').forEach(a => {
    a.addEventListener('click', openModalEssaie)
});

/* PARTIE CHANGEMENT INTÉRIEUR DES MODALS */
const modalChange = document.querySelector('.add-btn');
const elementModalChangeToShow = document.querySelector('.modal-content2');
const elementGoBack = document.querySelector('.go-back');
const elementModalChangeToHide = document.querySelector('.modal-content');

// lorsqu'on clique sur le button '.add-btn' cela nous emmène sur la deuxième modale, on cache donc tout les éléments de la première

modalChange.addEventListener('click', (e) => {
    e.preventDefault();
    if (elementModalChangeToShow.style.display = "none") {
        elementModalChangeToShow.style.display = "block";
        elementGoBack.style.visibility = "visible";
        elementModalChangeToHide.style.display = "none";
    } else {
        elementModalChangeToShow.style.display = "none";
        elementGoBack.style.visibility = "hidden";
        elementModalChangeToHide.style.display = "block";
    }
});

const goBackModal = document.querySelector('.go-back');

// lorsqu'on clique sur le button '.go-back' cela nous emmène sur la première modale, on cache donc tout les élements de la deuxième

goBackModal.addEventListener('click', (e) => {
    e.preventDefault();
    if (elementModalChangeToHide = "none") {
        elementModalChangeToShow.style.display = "block";
        elementGoBack.style.visibility = "visible";
        elementModalChangeToHide.style.display = "none";
    } else {
        elementModalChangeToShow.style.display = "none";
        elementGoBack.style.visibility = "hidden";
        elementModalChangeToHide.style.display = "block";
    }
});

/* PARTIE RÉCUPÉRATION DES PROJETS MODAL*/
// appel de l'API pour récuper tout les travaux afin des les afficher dans la modal
async function getAllWorksModal() {

    const reponse = await fetch("http://localhost:5678/api/works");
    const allWorks = await reponse.json();

    const valeurAllWorks = JSON.stringify(allWorks);
    window.localStorage.setItem("allWorks", valeurAllWorks);

    for (let i = 0; i < allWorks.length; i++) {

        const projectsModal = allWorks[i];

        // récupération de l'élément du DOM qui recevra la gallerie photo dans la modal
        const sectionGalleryModal = document.querySelector(".gallery-modal");

        // création de la balise <figure> pour un project
        const figureModal = document.createElement("figure");
        figureModal.setAttribute("data-id", allWorks[i].id);
        figureModal.classList.add("figureModalId");
        console.log(figureModal);

        // création des balises <img> et <figcaption> situées à l'intérieur de <figure>
        const imageModal = document.createElement("img");
        imageModal.setAttribute("crossorigin", "anonymous");
        imageModal.src = projectsModal.imageUrl;
        imageModal.alt = projectsModal.title;

        const titleModal = document.createElement("figcaption");
        titleModal.innerText = 'éditer';

        // création d'une balise <button>
        const directionBtn = document.createElement("button");
        directionBtn.classList.add("directionBtn");

        // ajout d'une icone au bouton
        const iconArrowDirection = document.createElement("i");
        iconArrowDirection.classList.add("fa-solid", "fa-arrows-up-down-left-right");

        // création d'une balise <button>, et rattachement d'un ID pour cibler le projet selectionné à supprimer
        const deleteWorkBtn = document.createElement("button");
        deleteWorkBtn.classList.add("deleteWorkBtn");
        deleteWorkBtn.setAttribute("data-id", allWorks[i].id);

        // ajout d'une icone au bouton
        const iconTrashcan = document.createElement("i");
        iconTrashcan.classList.add("fa-solid", "fa-trash-can");

        // rattachement de <figure> à la <div class="gallery">
        sectionGalleryModal.appendChild(figureModal);

        // rattachement des balises créées à <figure>
        figureModal.appendChild(imageModal);
        figureModal.appendChild(directionBtn);
        figureModal.appendChild(deleteWorkBtn);
        figureModal.appendChild(titleModal);

        // rattachement des icones aux <button> cible
        directionBtn.appendChild(iconArrowDirection);
        deleteWorkBtn.appendChild(iconTrashcan);

        //ajout de la function 'DELETE' qui permet de supprimer un projet de la modal
        deleteWorkBtn.addEventListener("click", deleteProject);

    }

};

getAllWorksModal(allWorks);

/* PARTIE SUPPRESSION DES PROJETS MODAL + INDEX */
// function fetch 'DELETE'
async function deleteProject(e) {
    e.preventDefault();
    // récupération de l'id à supprimer
    const id = this.getAttribute("data-id");

    // récupération du token (paire du mail et du mot de passe sauvegardé par l'utilisateur)
    let userToken = JSON.parse(localStorage.getItem("userToken"));

    // appel fetch 'DELETE'
    const response = await fetch(`http://localhost:5678/api/works/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + userToken.token,
            },
        });

    // si le projet a bien été supprimé alors l'id ciblait sera supprimé de la gallerie modal et de la gallerie
    // sinon il y a un message d'alerte pour prévenir qu'il y a eu un problème
    if (response.ok) {
        console.log("delete OKKKKKK")
        const figureModal = document.querySelector(`figure[data-id="${id}"].figureModalId`);
        figureModal.remove();
        const figure = document.querySelector(`figure[data-id="${id}"]`);
        figure.remove();
        alert("Le projet a bien été supprimé.")
    } else {
        console.log("delete KOOOOOOO")
        alert("Une erreur s'est produite lors de la suppression.")
    }
};

// permet de générer tout les projets en enlevant les projets supprimés
function genererNewWorks(article) {
    const sectionGallery = document.querySelector(".gallery");

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.setAttribute("crossorigin", "anonymous");
    image.src = article.imageUrl;

    const title = document.createElement("figcaption");
    title.innerText = article.title;

    sectionGallery.appendChild(figure);

    figure.appendChild(image);
    figure.appendChild(title);
};

/* PARTIE AJOUT DES PROJETS */
// permet de cibler un élément HTML
const formProject = document.getElementById("add-project");
// const requiredInputs = document.querySelectorAll('input[required]');
// const requiredSelect = document.querySelector('select[required]');
const confirmBtn = document.querySelector(".confirm-btn");

// permet de définir un écouteur d'évenement au 'submit'
// function send un projet
formProject.addEventListener("submit", async function (e) {
    e.preventDefault();

    // récupération du token (paire du mail et du mot de passe sauvegardé par l'utilisateur)
    let userToken = JSON.parse(localStorage.getItem("userToken"));

    // ciblage des différents éléments HTML ('input' = file, 'input" = title, et 'select' = category) utile à l'ajout d'un projet
    const newProjectImage = document.getElementById("file").files[0]; //ligne 370
    const newProjectTitle = document.getElementById("title").value;
    const newProjectCategory = document.getElementById("category").value;

    if (!newProjectImage || !newProjectTitle || !newProjectCategory) {
        alert("Veuillez remplir tous les champs.");
        confirmBtn.style.backgroundColor = "#A7A7A7";
    } else {
        confirmBtn.style.color = "#fffef8";
        confirmBtn.style.backgroundColor = "#1D6154";
    }

    // FormData servant à collecter et envoyer des infos issus d'un formulaire
    const formData = new FormData();

    formData.append("image", newProjectImage, newProjectImage.name);
    formData.append("title", newProjectTitle);
    formData.append("category", newProjectCategory);

    // appel fetch 'POST'
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Bearer " + userToken.token,
        },
    });

    // si la route est bonne alors 
    if (response.ok) {
        const responseData = await response.json();
        // on récupère les functions genererNewWorks et addProject
        genererNewWorks(responseData);
        addProject(responseData);
        alert("Le projet a bien été ajouté à votre galerie.")
        closeModalEssaie();
    } else {
        alert("Une erreur s'est produite, veuillez réessayer.")
    }
    
});

// permet l'affichage de la partie ajout d'un projet
const divNewProject = document.querySelector(".import-photo");
const newProjectImage = document.querySelector(".add-img");
const iconAddProject = document.querySelector(".fa-image");
const formAddImg = document.querySelector(".form-add-img");

newProjectImage.addEventListener('change', function () {

        const reader = new FileReader();

        reader.onload = function (e) {

            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = '20%';
            formAddImg.remove();
            iconAddProject.remove();
            newProjectImage.style.display = "none";

            divNewProject.append(img);
        };

        reader.readAsDataURL(newProjectImage.files[0]);

});

/* PARTIE RÉCUPÉRATION DES PROJETS */
// permet de récupérer tout les projets (les initiaux, ceux qui ont été ajouté et ceux qui ont été supprimé)
function addProject(article) {
    const sectionGalleryModal = document.querySelector(".gallery-modal");

    const figureModal = document.createElement("figure");
    figureModal.setAttribute("data-id", article.id);
    figureModal.classList.add("figureModalId");
    console.log(figureModal);

    const imageModal = document.createElement("img");
    imageModal.setAttribute("crossorigin", "anonymous");
    imageModal.src = article.imageUrl;
    imageModal.alt = article.title;

    const directionBtn = document.createElement("button");
    directionBtn.classList.add("directionBtn");

    const iconArrowDirection = document.createElement("i");
    iconArrowDirection.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    const deleteWorkBtn = document.createElement("button");
    deleteWorkBtn.classList.add("deleteWorkBtn");
    deleteWorkBtn.setAttribute("data-id", article.id);

    const iconTrashcan = document.createElement("i");
    iconTrashcan.classList.add("fa-solid", "fa-trash-can");

    const titleModal = document.createElement("figcaption");
    titleModal.innerText = 'éditer';

    sectionGalleryModal.appendChild(figureModal);

    figureModal.appendChild(imageModal);
    figureModal.appendChild(titleModal);
    figureModal.appendChild(directionBtn);
    directionBtn.appendChild(iconArrowDirection);
    figureModal.appendChild(deleteWorkBtn);
    deleteWorkBtn.appendChild(iconTrashcan);
    
    deleteWorkBtn.addEventListener("click", deleteProject);
};