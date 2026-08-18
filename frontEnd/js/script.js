const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================
   NAVEGAÇÃO ENTRE PÁGINAS
========================= */

// Login e cadastro agora são páginas separadas.
// A navegação é feita pelos links do HTML.


/* =========================
   MOSTRAR SENHA
========================= */

document.querySelectorAll(".password-toggle").forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input = document.getElementById(targetId);

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "◌";

        } else {

            input.type = "password";

            button.textContent = "◉";
        }

    });

});


/* =========================
   FORÇA DA SENHA
========================= */

const passwordInput =
    document.getElementById("registerPassword");

const strengthBars =
    document.querySelectorAll(".strength-bars span");

const strengthText =
    document.getElementById("strengthText");


if (passwordInput) {

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    strengthBars.forEach((bar, index) => {

        bar.style.background =
            index < strength
                ? "#8b5cf6"
                : "#2b2b35";

    });


    if (password.length === 0) {

        strengthText.textContent =
            "Digite uma senha";

    } else if (strength <= 1) {

        strengthText.textContent =
            "Senha fraca";

    } else if (strength === 2) {

        strengthText.textContent =
            "Senha média";

    } else if (strength === 3) {

        strengthText.textContent =
            "Senha boa";

    } else {

        strengthText.textContent =
            "Senha forte";
    }

});

}


/* =========================
   LOADING
========================= */

function setLoading(form, loading) {

    const button =
        form.querySelector(".submit-button");

    if (loading) {

        button.classList.add("loading");

        button.disabled = true;

    } else {

        button.classList.remove("loading");

        button.disabled = false;
    }

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================
   LOGIN
========================= */

if (loginForm) loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        showToast("Preencha todos os campos.");

        return;
    }


    setLoading(loginForm, true);


    /*
        FUTURO BACKEND JAVA:

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();
    */


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    setLoading(loginForm, false);

    showToast("Login realizado com sucesso!");


    loginForm.reset();

});


/* =========================
   CADASTRO
========================= */

if (registerForm) registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;


    if (!name || !email || !password) {

        showToast("Preencha todos os campos.");

        return;
    }


    if (password.length < 8) {

        showToast(
            "A senha precisa ter pelo menos 8 caracteres."
        );

        return;
    }


    setLoading(registerForm, true);


    /*
        FUTURO BACKEND JAVA:

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );
    */


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    setLoading(registerForm, false);

    showToast("Conta criada com sucesso!");


    registerForm.reset();

    strengthBars.forEach(bar => {
        bar.style.background = "#2b2b35";
    });

    strengthText.textContent =
        "Digite uma senha";

});