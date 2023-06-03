//on cible le formulaire avec le nom 'formLogin'
document.formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    // on détermine qu'un user a un mail et un password
    const user = {
        email: this.email.value,
        password: this.password.value,
    };

    // on fait un appel à fetch pour vérifier l'authentification
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    
    // récupération des données si les identifiants sont bons alors la connexion se fait
    // sinon un message d'erreur apparait
    const data = await reponse.json();
    if (data.token) {
        window.localStorage.setItem("userToken", JSON.stringify(data));
        document.location.href = "index.html";
        alert("Bienvenue !");
    }else if(data.message){
        alert("L'utilisateur n'est pas enregistré.");
    }else{
        alert("L'adresse mail ou le mot de passe ne correspond pas.");
    };
});