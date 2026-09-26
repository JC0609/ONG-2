
export function configurarFormulario() {
    const formulario = document.getElementById("cadastro");
    if (!formulario) return;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    function validarNome() {
        const valor = nome.value.trim();
        if (valor.length < 3) {
            nome.classList.add("campo-erro");
            nome.classList.remove("campo-ok");
            mensagem.textContent = "Preencha o nome com pelo menos 3 caracteres.";
            mensagem.className = "mensagem-erro";
            return false;
        }
        nome.classList.remove("campo-erro");
        nome.classList.add("campo-ok");
        return true;
    }

    nome.addEventListener("input", validarNome);

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validarNome()) return;

        if (!email.value.includes("@")) {
            email.classList.add("campo-erro");
            mensagem.textContent = "Digite um e-mail válido.";
            mensagem.className = "mensagem-erro";
            email.focus();
            return;
        }

        email.classList.remove("campo-erro");
        email.classList.add("campo-ok");

        const dados = Object.fromEntries(new FormData(formulario).entries());
        localStorage.setItem("cadastro_ong", JSON.stringify(dados));

        mensagem.textContent = "Cadastro enviado com sucesso!";
        mensagem.className = "mensagem-ok";
        formulario.reset();
    });
}
