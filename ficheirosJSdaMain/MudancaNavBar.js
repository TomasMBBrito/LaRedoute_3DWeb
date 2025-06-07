/*
    Este ficheiro JavaScript cria variaveis dentro do ficheiro ao ir buscar os elementos HTML com id's especificos
    Consoante o elemento este terá a sua funcionalidade propria
    Nesta situação o conteudo do header é alterado ao ser realizado scroll para baixo, mostrando certos elemntos, e apenas
    qunado o currentScroll está no topo da pagina HTML , é que o header apresenta o seu tamanho original com os elementos todos exceto o BotãoMenuNav 
    que se situa entre o logotipo da LaRedoute e a barra de pesquisa 
*/

    let lastScrollTop = 0; 
    const navbarBottom = document.querySelector('.navbar-bottom');
    const navbar = document.querySelector('.navbar');
    const menuButton = document.getElementById('BotaoMenu'); 
    const menuButtonNav = document.getElementById('BotaoMenuNav');
    const navbarMain = document.querySelector('.navbar-main');

    window.addEventListener('scroll', function() {
        let currentScroll = document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scroll para baixo
            navbar.classList.add('encolhida');
            navbarBottom.classList.add('hidden');
            menuButtonNav.style.display = "block";

            

        } else {
            if(currentScroll > 0){
                navbar.classList.add('encolhida');
                navbarBottom.classList.add('hidden');
                menuButtonNav.style.display = "block";
            }else{
                navbar.classList.remove('encolhida');
            navbarBottom.classList.remove('hidden');
            menuButtonNav.style.display = "none";
            }
            

        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

