
const CHAVE_PROJETOS = "ong_projetos";

export function salvarProjeto(projeto) {
    const projetos = JSON.parse(localStorage.getItem(CHAVE_PROJETOS)) || [];
    projetos.push(projeto);
    localStorage.setItem(CHAVE_PROJETOS, JSON.stringify(projetos));
}

export function listarProjetos() {
    return JSON.parse(localStorage.getItem(CHAVE_PROJETOS)) || [];
}
