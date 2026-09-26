
import { configurarFormulario } from "./formulario.js";
import { salvarProjeto, listarProjetos } from "./storage.js";

const conteudo = document.getElementById("conteudo");

const paginas = {
    "index.html": `
        <section class="hero" aria-labelledby="titulo-inicio">
            <h1 id="titulo-inicio">Mãos que Ajudam</h1>
            <p>Uma ONG voltada para ações sociais, voluntariado e apoio à comunidade.</p>
            <a class="btn" href="cadastro.html">Quero participar</a>
        </section>
        <section aria-labelledby="sobre">
            <h2 id="sobre">Sobre a ONG</h2>
            <p>Nosso objetivo é incentivar a solidariedade e criar oportunidades de participação em ações comunitárias.</p>
        </section>
        <section class="grid" aria-label="Principais ações">
            <article class="card">
                <h3>Voluntariado</h3>
                <p>Participe de atividades e ajude outras pessoas.</p>
            </article>
            <article class="card">
                <h3>Doações</h3>
                <p>Contribua com campanhas e projetos sociais.</p>
            </article>
        </section>
    `,
    "projetos.html": `
        <section aria-labelledby="titulo-projetos">
            <h1 id="titulo-projetos">Projetos e ações</h1>
            <div class="grid">
                <article class="card">
                    <img src="../imagens/projeto1.jpg" alt="Ilustração do projeto comunitário">
                    <h2>Projeto Comunitário</h2>
                    <p>Realização de ações voltadas para a comunidade.</p>
                </article>
                <article class="card">
                    <img src="../imagens/voluntariado.jpg" alt="Ilustração sobre trabalho voluntário">
                    <h2>Voluntariado</h2>
                    <p>Organização de voluntários para apoiar as atividades da ONG.</p>
                </article>
            </div>
        </section>
    `,
    "cadastro.html": `
        <section aria-labelledby="titulo-cadastro">
            <h1 id="titulo-cadastro">Cadastro de voluntário</h1>
            <form id="cadastro" novalidate>
                <fieldset>
                    <legend>Dados pessoais</legend>
                    <div class="form-grupo">
                        <label for="nome">Nome completo</label>
                        <input id="nome" name="nome" type="text" required minlength="3">
                    </div>
                    <div class="form-grupo">
                        <label for="email">E-mail</label>
                        <input id="email" name="email" type="email" required>
                    </div>
                    <div class="form-grupo">
                        <label for="nascimento">Data de nascimento</label>
                        <input id="nascimento" name="nascimento" type="date" required>
                    </div>
                    <div class="form-grupo">
                        <label for="cpf">CPF</label>
                        <input id="cpf" name="cpf" type="text" inputmode="numeric"
                               pattern="[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}"
                               placeholder="000.000.000-00" required>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>
                    <div class="form-grupo">
                        <label for="endereco">Endereço</label>
                        <input id="endereco" name="endereco" type="text" required>
                    </div>
                    <div class="form-grupo">
                        <label for="cidade">Cidade</label>
                        <input id="cidade" name="cidade" type="text" required>
                    </div>
                    <div class="form-grupo">
                        <label for="estado">Estado</label>
                        <select id="estado" name="estado" required>
                            <option value="">Selecione</option>
                            <option>SP</option><option>RJ</option><option>MG</option>
                            <option>PR</option><option>SC</option><option>RS</option>
                        </select>
                    </div>
                    <div class="form-grupo">
                        <label for="cep">CEP</label>
                        <input id="cep" name="cep" type="text" inputmode="numeric"
                               pattern="[0-9]{5}-?[0-9]{3}"
                               placeholder="00000-000" required>
                    </div>
                </fieldset>

                <button type="submit">Enviar cadastro</button>
                <p id="mensagem" role="status" aria-live="polite"></p>
            </form>
        </section>
    `
};

function paginaAtual() {
    return window.location.pathname.split("/").pop() || "index.html";
}

function renderizar(nomePagina) {
    conteudo.innerHTML = paginas[nomePagina] || paginas["index.html"];

    document.querySelectorAll("nav a").forEach(link => {
        const ativo = link.getAttribute("href") === nomePagina;
        link.setAttribute("aria-current", ativo ? "page" : "false");
    });

    configurarFormulario();
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const destino = link.getAttribute("href");
        history.pushState({ pagina: destino }, "", destino);
        renderizar(destino);
        conteudo.focus();
    });
});

window.addEventListener("popstate", () => renderizar(paginaAtual()));

document.addEventListener("DOMContentLoaded", () => {
    const projetos = listarProjetos();
    if (projetos.length === 0) {
        salvarProjeto({
            nome: "Projeto Comunitário",
            descricao: "Ação social de apoio à comunidade."
        });
    }
    renderizar(paginaAtual());
});
