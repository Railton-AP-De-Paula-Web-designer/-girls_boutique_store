/* ================================== */
/* FUNÇÃO: DESTAQUE DA LOGO NO CENTRO DA TELA (Refatorado) */
/* ================================== */

// 1. Seleciona os elementos e armazena na constante
const marcas = document.querySelectorAll('.carrossel-marca');

/**
 * Verifica continuamente a posição das logos para aplicar o destaque no centro.
 */
function checkLogoPosicoes() {
    // CORREÇÃO: Usar window.innerWidth para obter a largura correta do viewport
    const centroTela = window.innerWidth / 2;
    // Define a faixa de ativação (100 pixels para cada lado do centro)
    const margemDestaque = 100;

    marcas.forEach(marca => {
        // Obtém a posição e o tamanho do contêiner da logo
        const rect = marca.getBoundingClientRect();
        
        // Calcula o centro horizontal da logo
        const centroLogo = rect.left + rect.width / 2;

        // CORREÇÃO DE LÓGICA: O operador de comparação estava incorreto (= em vez de <=)
        const estaNoCentro = (
            centroLogo >= centroTela - margemDestaque &&
            centroLogo <= centroTela + margemDestaque // CORRIGIDO: de '=' para '+'
        );

        // CORREÇÃO DE SINTAXE: Usar marca.classList em vez de Marca.ClassList
        if (estaNoCentro) {
            // Se estiver no centro, adiciona a classe para mudar a cor
            marca.classList.add('logo-destaque-centro');
        } else {
            // Se não estiver no centro, remove a classe para voltar ao P&B
            marca.classList.remove('logo-destaque-centro');
        }
    });

    // Roda a função novamente no próximo frame de animação (alta performance)
    requestAnimationFrame(checkLogoPosicoes);
}

// CORREÇÃO: Usar 'DOMContentLoaded' ou event listener, pois 'window.onload' pode sobrescrever outros eventos.
// Alternativamente, se o script estiver no final do <body>, pode-se apenas chamar a função.
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o loop de verificação comece após o DOM ser carregado
    checkLogoPosicoes();
});