//Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

//Cria a cena
let cena = new THREE.Scene()

//Cria o relogio, misturador e variável que representa a primeira vez que houve uma troca de cenario
let relogio = new THREE.Clock();
let misturador = new THREE.AnimationMixer(cena);
let firstTimePlayed = 0;


//Criação dos clipes e ações dos objetos secundarios
let clipe1 = null;
let clipe2 = null;
let clipe3 = null;
let clipe4 = null;
let clipe5 = null;
let clipe6 = null;

let acao1 = null;
let acao2 = null;
let acao3 = null;
let acao4 = null;
let acao5 = null;
let acao6 = null;

//Criação dos clipes e ações do candeeiro
let clipe7 = null;
let clipe8 = null;
let clipe9 = null;
let clipe10 = null;
let clipe11 = null;
let clipe12 = null;
let clipe13 = null;
let clipe14 = null;
let clipe15 = null;
let clipe16 = null;

let acao7 = null;
let acao8 = null;
let acao9 = null;
let acao10 = null;
let acao11 = null;
let acao12 = null;
let acao13 = null;
let acao14 = null;
let acao15 = null;
let acao16 = null;

// Criar e configurar o renderer
const container = document.querySelector('.produto-imagem');
let renderer = new THREE.WebGLRenderer({canvas: container})
renderer.setSize(container.clientWidth , container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Criar e posicionar a camara
let camara = new THREE.PerspectiveCamera( 70, container.clientWidth/container.clientHeight, 0.01, 1000 )
camara.position.x = 35.59867409607992;
camara.position.y = 10.80028397380324;
camara.position.z = 1.70379329362083;
camara.lookAt(36,5,-12);

//Cria um spotlight para o cenario
const spotLight = new THREE.SpotLight("Orange")
spotLight.intensity = 1100
spotLight.castShadow = true
spotLight.position.set( 40, 20, 10 )
cena.add(spotLight)


//Objeto ao qual o spotlight irá apontar
const target = new THREE.Object3D()
target.position.set(40,7,0)
cena.add(target)
spotLight.target = target

//const targetMesa_TV = new THREE.Object3D();

//Inicia os controlos
let controls = new OrbitControls(camara, renderer.domElement)
controls.target.set(36,5,-12)
//Limita a camara pelos angulos azimuth ,polar e pelo maximo e minimo de distância que esta pode ter do cenario 
controls.maxPolarAngle = Math.PI / 2.1;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minAzimuthAngle = - Math.PI / 4;
controls.maxDistance = 17;
controls.minDistance = 12;

//Flag que indica se a animação está reversa ou não
let reverseAtivo = 0;

//Criação de um vetor que irá guardar todos os objetos filhos que existem no candeeiro
let todos_objetos = [];

//Função que guarda esses filhos num vetor criado dentro dessa função
//Note-se que esta função utiliza recursividade
function coletarFilhos(object, result = []){
    if(!object){
        return result;
    }
    let queue = [object];
    do {
        const current = queue.shift();
        result.push(current);

        if (current.children && current.children.length > 0) {
            queue.push(...current.children);
        }
    } while (queue.length > 0);

    return result;
}
//Inicialização do vetor que guarda os objetos que irão receber sombra
let objetos_a_receberSombra = new Set(["Mesa","Notebook","Chão","Bloom_Office_Chair","Tv_stand","43_inch_TV","Big_Monstera_plant"]);

//GLTF Loader que dá load ao cenario criado no blender
let carregador = new GLTFLoader()
    carregador.load(
        'Modelo_3D/ApliqueArticuladoPecaUnica.gltf',
        function (gltf){
            cena.add(gltf.scene);
            let cenario = gltf.scene;
            for(let i = 0 ; i < cenario.children.length ; i++){
                let object = cenario.children[i];
                if(object.name === "Support"){
                    todos_objetos = coletarFilhos(object);
                    todos_objetos.forEach(objeto => {
                        if(objeto.name === "C_LightBulb" || objeto.name === "S_LightBulb"){
                            objeto.castShadow = true;
                        }
                    })
                }
                else if(objetos_a_receberSombra.has(object.name)){
                    object.receiveShadow = true;
                }
                
            }

            clipe1 = THREE.AnimationClip.findByName(gltf.animations,'MesaAction.003')
            acao1 = misturador.clipAction(clipe1)
            
            clipe2 = THREE.AnimationClip.findByName(gltf.animations,'NotebookAction')
            acao2 = misturador.clipAction(clipe2)
            
            clipe3 = THREE.AnimationClip.findByName(gltf.animations,'BloomAction')
            acao3 = misturador.clipAction(clipe3)
            
            clipe4 = THREE.AnimationClip.findByName(gltf.animations,'TVstand.001Action.001')
            acao4 = misturador.clipAction(clipe4)
            
            clipe5 = THREE.AnimationClip.findByName(gltf.animations,'43 inch TVAction.001')
            acao5 = misturador.clipAction(clipe5)
            
            clipe6 = THREE.AnimationClip.findByName(gltf.animations,'Big Monstera plantAction.001')
            acao6 = misturador.clipAction(clipe6)

            clipe7 = THREE.AnimationClip.findByName(gltf.animations,'Button1SupportJoint')
            acao7 = misturador.clipAction(clipe7)        
                    
            clipe8 = THREE.AnimationClip.findByName(gltf.animations,'Button1LongArm')
            acao8 = misturador.clipAction(clipe8)      
                    
            clipe9 = THREE.AnimationClip.findByName(gltf.animations,'Button1ShortArm')
            acao9 = misturador.clipAction(clipe9)
                    
            clipe10 = THREE.AnimationClip.findByName(gltf.animations,'Button1ArmToAbajurJoint')
            acao10 = misturador.clipAction(clipe10)

            clipe11 = THREE.AnimationClip.findByName(gltf.animations,'Button2LongArm')
            acao11 = misturador.clipAction(clipe11)

            clipe12 = THREE.AnimationClip.findByName(gltf.animations,'Button2ShortArm')
            acao12 = misturador.clipAction(clipe12)

            clipe13 = THREE.AnimationClip.findByName(gltf.animations,'Button2ArmToAbajurJoint')
            acao13 = misturador.clipAction(clipe13)

            clipe14 = THREE.AnimationClip.findByName(gltf.animations,'Button0LongArm')
            acao14 = misturador.clipAction(clipe14)

            clipe15 = THREE.AnimationClip.findByName(gltf.animations,'Button0ShortArm')
            acao15 = misturador.clipAction(clipe15)

            clipe16 = THREE.AnimationClip.findByName(gltf.animations,'Button0ArmToAbajurJoint')
            acao16 = misturador.clipAction(clipe16)
            
            
            acao1.setLoop(THREE.LoopPingPong);
            acao2.setLoop(THREE.LoopPingPong);
            acao3.setLoop(THREE.LoopPingPong);
            acao4.setLoop(THREE.LoopPingPong);
            acao5.setLoop(THREE.LoopPingPong);
            acao6.setLoop(THREE.LoopPingPong);
    }

    
)

// Renderizar e animar
let delta = 0; // tempo desde a última atualização
let latencia_minima = 1 / 144; // tempo mínimo entre cada atualização


function animar() {
    requestAnimationFrame(animar);// agendar animar para o próximo animation frame
    delta += relogio.getDelta(); // acumula tempo entre chamadas de getDelta
    if (delta < latencia_minima) return; // não exceder a taxa de atualização
    misturador.update(Math.floor(delta/latencia_minima) * latencia_minima)
    renderer.render( cena, camara )
    delta = delta % latencia_minima; // atualizar delta com o excedente

    //Pausa a animação aproximadamente no ultimo frame
    if(firstTimePlayed == 1) {
        if(acao1.time > acao1.getClip().duration - 0.01) {
            acao1.paused = true
            acao2.paused = true
            acao3.paused = true
            acao4.paused = true
            acao5.paused = true
            acao6.paused = true
        }
    }
}

//Quando shift é premido , os controlos são desativados (Serve para bloquear o shift)
window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        controls.enabled = false;
    }
});

//Quando o shift é libertado, os controlos são ativados de novo (Serve para bloquear o shift)
window.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        controls.enabled = true;
    }
})


//Cria uma variavel que provém do elemento HTML com id botao-animacoes e atribui-lhe uma função AnimarObjetos
const botaoAnimar = document.getElementById("botao-animacoes");
botaoAnimar.addEventListener("click",AnimarObjetos);

//Função que anima os objetos secundários,neste caso a mesa com TV e a secretaria com o notebook
//Esta função baseia-se nas flags previamente criadas "firstTimePlayed" e "reverseAtivo" para a animação dos objetos
function AnimarObjetos(){
    if(firstTimePlayed == 0) {

        acao1.play()
        acao2.play()
        acao3.play()
        acao4.play()
        acao5.play()
        acao6.play()

        firstTimePlayed = 1

    }
    if(reverseAtivo == 0){
        reverseAtivo = 1;
    }else {
        reverseAtivo = 0;
    }

    acao1.paused = false
    acao2.paused = false
    acao3.paused = false
    acao4.paused = false
    acao5.paused = false
    acao6.paused = false

}

//Criação das variáveis que irão ser as texturas do AbajurMesh
var couro_verde = new THREE.TextureLoader().load("Modelo_3D/Texturas_Abajur/couro_verde.png");
var xadrez_azul = new THREE.TextureLoader().load("Modelo_3D/Texturas_Abajur/xadrez.png");
var tijolo_colorido = new THREE.TextureLoader().load("Modelo_3D/Texturas_Abajur/tijolo.jpg");

couro_verde.magFilter = THREE.LinearFilter;
xadrez_azul.magFilter = THREE.LinearFilter;
tijolo_colorido.magFilter = THREE.LinearFilter;

couro_verde.encoding = THREE.sRGBEncoding;
xadrez_azul.encoding = THREE.sRGBEncoding;
tijolo_colorido.encoding = THREE.sRGBEncoding;

var couro_verde_material = new THREE.MeshPhysicalMaterial( { map: couro_verde } );
var xadrez_azul_material = new THREE.MeshPhysicalMaterial( { map: xadrez_azul} );
var tijolo_colorido_material = new THREE.MeshPhysicalMaterial( { map: tijolo_colorido } );

couro_verde_material.side = THREE.DoubleSide;
xadrez_azul_material.side = THREE.DoubleSide;
tijolo_colorido_material.side = THREE.DoubleSide;


//Função que quando se clica no elemento HTML com id "couro_verde",o AbajurMesh irá ter o seu material alterado para couro_verde
document.getElementById('couro_verde').onclick = function(){
    todos_objetos.forEach(objeto => {
        if(objeto.name === "AbajurMesh003" ){
            objeto.material = couro_verde_material;
        }
    })
}

//Função que quando se clica no elemento HTML com id "xadrez_azul",o AbajurMesh irá ter o seu material alterado para xadrez_azul
document.getElementById('xadrez_azul').onclick = function(){
    todos_objetos.forEach(objeto => {
        if(objeto.name === "AbajurMesh003"){
            objeto.material = xadrez_azul_material;
        }
    })
}

//Função que quando se clica no elemento HTML com id "tijolo_colorido",o AbajurMesh irá ter o seu material alterado para tijolo_colorido
document.getElementById('tijolo_colorido').onclick = function(){
    todos_objetos.forEach(objeto => {
        if(objeto.name === "AbajurMesh003"){
            objeto.material = tijolo_colorido_material;
        }
    })
}

////Função que quando se clica no elemento HTML com id "posicao1",o candeeiro irá realizar a animação previamente iniciada
document.getElementById('posicao1').onclick = function(){

    acao7.stop()
    acao8.stop()
    acao9.stop()
    acao10.stop()
    acao11.stop()
    acao12.stop()
    acao13.stop()
    acao14.stop()
    acao15.stop()
    acao16.stop()

    acao14.play()
    acao15.play()
    acao16.play()
    acao14.clampWhenFinished = true;
    acao15.clampWhenFinished = true;
    acao16.clampWhenFinished = true;
    acao14.setLoop(THREE.LoopOnce);
    acao15.setLoop(THREE.LoopOnce);
    acao16.setLoop(THREE.LoopOnce);
}

////Função que quando se clica no elemento HTML com id "posicao2",o candeeiro irá realizar a animação previamente iniciada
document.getElementById('posicao2').onclick = function(){

    acao7.stop()
    acao8.stop()
    acao9.stop()
    acao10.stop()
    acao11.stop()
    acao12.stop()
    acao13.stop()
    acao14.stop()
    acao15.stop()
    acao16.stop()

    acao7.play()
    acao8.play()
    acao9.play()
    acao10.play()
    acao7.clampWhenFinished = true;
    acao8.clampWhenFinished = true;
    acao9.clampWhenFinished = true;
    acao10.clampWhenFinished = true;
    acao7.setLoop(THREE.LoopOnce);
    acao8.setLoop(THREE.LoopOnce);
    acao9.setLoop(THREE.LoopOnce);
    acao10.setLoop(THREE.LoopOnce);
}

////Função que quando se clica no elemento HTML com id "posicao3",o candeeiro irá realizar a animação previamente iniciada
document.getElementById('posicao3').onclick = function(){

    acao7.stop()
    acao8.stop()
    acao9.stop()
    acao10.stop()
    acao11.stop()
    acao12.stop()
    acao13.stop()
    acao14.stop()
    acao15.stop()
    acao16.stop()

    acao11.play()
    acao12.play()
    acao13.play()
    acao11.clampWhenFinished = true;
    acao12.clampWhenFinished = true;
    acao13.clampWhenFinished = true;
    acao11.setLoop(THREE.LoopOnce);
    acao12.setLoop(THREE.LoopOnce);
    acao13.setLoop(THREE.LoopOnce);
}

// iniciar animar
animar()