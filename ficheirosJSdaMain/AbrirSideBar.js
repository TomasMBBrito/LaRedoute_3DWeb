/*
    Este ficheiro JavaScript cria variaveis dentro do ficheiro ao ir buscar os elementos HTML com id's especificos
    Consoante o elemento este terá a sua funcionalidade propria
    Nesta situação ambos os botões Menu e MenuNav abrem a SideBar e o botão Fechar fecha essa SideBar
    o elemento NavBarBot não tem funcionalidades,apenas quando se abre a SideBar , a
    distancia entre os botões existentes na NavbarBottom diminui e são arrastados para a direita
*/
const botaoMenu = document.getElementById("BotaoMenu");
const botaoMenuNav = document.getElementById("BotaoMenuNav");
const botaoFechar = document.getElementById("closebtn");
const navBarBot = document.getElementById("navbarbottom");

botaoMenu.addEventListener("click",AbrirSideBar);
botaoFechar.addEventListener("click",FecharSideBar);
botaoMenuNav.addEventListener("click",AbrirSideBar);

function AbrirSideBar(){
    document.getElementById("mySideBar").style.width = "400px";
        navBarBot.style.gap = "10px";
        navBarBot.style.marginLeft = "26%"; 
    
}

function FecharSideBar(){
    document.getElementById("mySideBar").style.width = "0";
        navBarBot.style.gap = "50px";
        navBarBot.style.marginLeft = "19%";
    
    
}