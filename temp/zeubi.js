const gifs = [
    "i-cannot-accept",
    "i-dont-accept",
    "no-oprah",
    "number"
]
const noGifs = [
    "no",
    "no-spidey",
    "no-2"
]
const alphRef = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
cset("a6zz3df99g", '', -1); // compteur
cset("Cqc9XX45G6s96CHjbDR3", '', -1); // nombre
let hashCode = ""; 

// ===== COMMONS ==========
function hideAlert(){
    let alertDiv = document.querySelector('#alert');
    alertDiv.classList.remove('active');
    setTimeout(() => {
        alertDiv.style.display = "none";
    }, 300);
}
function showAlert(url){
    let alertDiv = document.querySelector('#alert');
    let img = alertDiv.querySelector('img');
    img.src = "img/gif/"+url+".gif";
    
    alertDiv.style.display = "flex"
    setTimeout(() => {
        alertDiv.classList.add('active');
    }, 100);
}
function alertOpen(){
    return document.querySelector('#alert').classList.contains('active')
}

function hideAlertPerso(){
    let alertDiv = document.querySelector('#alertPerso');
    alertDiv.classList.remove('active');
    setTimeout(() => {
        alertDiv.style.display = "none";
    }, 300);
}
function alertPerso(txt){
    let alertDiv = document.querySelector('#alertPerso');
    let p = alertDiv.querySelector('p');
    p.innerText = txt
    
    alertDiv.style.display = "flex"
    setTimeout(() => {
        alertDiv.classList.add('active');
    }, 100);
}
function alertPersoOpen(){
    return document.querySelector('#alertPerso').classList.contains('active')
}

function coucou(elems, str) {
    let result = null;
    for (let i = 0; i < elems.length; i++) {
        const elem = elems[i];
        if(elem == undefined) continue;
        if(elem.name == str){
            result = elem;
            break;
        }
    }
    return result;
}

function persoHash(){
    const decal = parseInt(cget("Cqc9XX45G6s96CHjbDR3"));
    const base = "KONAMI";
    let result = "";
    for (const char of base) {
        let i = alphRef.indexOf(char);
        let j = i + decal >= alphRef.length ? i + decal - alphRef.length : i + decal;
        result += alphRef[j];
    }
    hashCode = result;
    return result;
}
function persoUnHash(ev){
    let nb = parseInt(ev.target.value);
    if(Number.isNaN(nb)){
        document.querySelector('#hash').innerHTML = hashCode;
        return;
    }
    let neg = false;
    let result = "";
    if(nb < 0){
        neg = true;
        nb *= -1;
    }
    nb = nb % 35;
    
    for (const char of hashCode) {
        let i = alphRef.indexOf(char);
        let j;
        // if(neg) j = i - nb < 0 ? i - nb + alphRef.length : i - nb;
        if(neg) j = i + nb >= alphRef.length ? i + nb - alphRef.length : i + nb;
        else j = i - nb < 0 ? i - nb + alphRef.length : i - nb;
        result += alphRef[j];
    }
    document.querySelector('#hash').innerHTML = result;
}

// ===== COOKIES ==========
function cset(name, value, days = 1) {
    var expires = '',
        date = new Date(),
        sameSite = "";
    if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
        sameSite = "SameSite=None; "
    }
    document.cookie = name + '=' + value + expires + sameSite + '; path=/';
}
function cget(name) {
    var cookies = document.cookie.split(';'),
        length = cookies.length,
        i,
        cookie,
        nameEQ = name + '=';
    for (i = 0; i < length; i += 1) {
        cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return false;
}
function crm(name) {
    cset(name, '', -1);
}


// ===== STEP 1 ===========
function azerty(ev){
    ev.preventDefault();
    if(alertOpen()) return;
    let elems = ev.target.elements;

    let input = coucou(elems, "number");
    let nb = parseInt(input.value);
    if(nb < -35 || 35 < nb){
        let nb = 0
        if(!cget("a6zz3df99g")){
            cset("a6zz3df99g", 1);
        }else{
            nb = parseInt(cget("a6zz3df99g")) + 1;
            cset("a6zz3df99g", nb);
        }
        if(nb == 3){
            alertPerso('Oups... Je me suis trompé dans la fourchette ;)');
            let txt = document.querySelector('form>p');
            let origin = txt.innerText;
            let base = "-100 et 100";
            let newTxt = "-35 & 35";
            let ref = txt.innerHTML.indexOf(base);
            if(ref != -1){
                let tab = origin.split(base);
                txt.innerText = tab[0]+newTxt+tab[1];
            }
        }else{
            let i = Math.ceil(Math.random()*gifs.length-1);
            showAlert(gifs[i]);
        }
        console.log(cget("a6zz3df99g"));
    }else{
        cset("Cqc9XX45G6s96CHjbDR3", input.value)
        if(cget("a6zz3df99g")){
            showAlert("well-done");
            setTimeout(() => {
                hideAlert();
                setTimeout(() => {
                    step2();
                }, 500);
            }, 2500);
        }else{
            step2();
        }
    }
}

// coucou => chercher dans 'elems' avec l'attribut name == 'str'
// azerty => fonction à la soumission du form
// azertyuiop => fonction à la soumission du form2

// ===== STEP 2 ===========
function step2(){
    crm("a6zz3df99g");
    let form = document.querySelector('form');
    form.setAttribute("onsubmit", "azertyuiop(event)");
    let input = coucou(form.elements, "number");
    input.type = "text";
    input.name = "code";
    input.value = "";
    let p = form.querySelector('p');
    p.innerText = "Entrez le code :";
}

function azertyuiop(ev){
    ev.preventDefault();
    
    if(alertOpen()) return;
    let elems = ev.target.elements;

    let input = coucou(elems, "code");
    let val = input.value;

    if(val.toLowerCase() != "le code"){
        let nb;
        if(!cget("a6zz3df99g")){
            cset("a6zz3df99g", 1);
        }else{
            nb = parseInt(cget("a6zz3df99g")) + 1;
            cset("a6zz3df99g", nb);
        }


        if(nb == 3){ // Nombre d'essais avant un hint
            alertPerso("Je t'ai dis de mettre LE CODE !!!!");
        }else if(nb == 6){ // Nombre d'essais avant un hint
            alertPerso("Sérieux ?? 'le code'");
        }else{
            let i = Math.ceil(Math.random()*gifs.length-1);
            showAlert(gifs[i]);
        }
    }else{
        if(cget("a6zz3df99g")){
            if(parseInt(cget("a6zz3df99g")) < 4)
                showAlert("good-job-1");
            else
                showAlert("good-job-2");
            setTimeout(() => {
                hideAlert();
                setTimeout(() => {
                    step3();
                }, 500);
            }, 2500);
        }else{
            step3();
        }
    }
}

// ===== STEP 3 ===========
function step3(){
    crm("a6zz3df99g");
    let form = document.querySelector('form');
    form.setAttribute("onsubmit", "qsd(event)");
    let input = coucou(form.elements, "code");
    input.value = "";
    input.setAttribute("onkeyup", "persoUnHash(event)")
    let p = form.querySelector('p');
    p.innerHTML = "Voici un code secret : <span id='hash'>"+persoHash()+"</span></br>&#192; toi de le décoder !</br>Noublie pas d'envoyer pour valider ;)";
}
function qsd(ev){
    ev.preventDefault();
    
    if(alertOpen()) return;
    let elems = ev.target.elements;

    let input = coucou(elems, "code");
    let val = input.value;

    if(val.toLowerCase() != cget("Cqc9XX45G6s96CHjbDR3")){
        let nb;
        if(!cget("a6zz3df99g")){
            cset("a6zz3df99g", 1);
        }else{
            nb = parseInt(cget("a6zz3df99g")) + 1;
            cset("a6zz3df99g", nb);
        }


        if(nb == 3){ // Nombre d'essais avant un hint
            let i = Math.ceil(Math.random()*noGifs.length-1);
            showAlert(noGifs[i]);
            document.querySelector('#amxpc3df82').src = "img/gif/cesar-ave.gif";
            setTimeout(() => {
                document.querySelector('#amxpc3df82').classList.add('active')
            }, 50);
        }else if(nb == 6){ // Nombre d'essais avant un hint
            alertPerso("Peut-etre un nombre compris entre -35 & 35 ?");
        }else{
            let i = Math.ceil(Math.random()*noGifs.length-1);
            showAlert(noGifs[i]);
        }
    }else{
        cset("Cqc9XX45G6s96CHjbDR3", input.value)
        if(cget("a6zz3df99g")){
            showAlert("well-done");
            setTimeout(() => {
                hideAlert();
                setTimeout(() => {
                    step4();
                }, 500);
            }, 2500);
        }else{
            step4();
        }
    }
}


function step4(){
    crm("a6zz3df99g");
    let form = document.querySelector('form');
    form.classList.add('inactive');
    document.querySelector('#alert').removeAttribute('onclick');
    setTimeout(() => {
        form.remove();
        showAlert("almost");
        setTimeout(() => {
            document.querySelector('#alert img').style.opacity = "0";
            setTimeout(() => {
                document.querySelector('#alert img').src = "img/gif/one-more.gif";
                setTimeout(() => {
                    document.querySelector('#alert img').style.opacity = "1";
                    setTimeout(() => {
                        document.querySelector('#alert img').style.opacity = "0";
                        setTimeout(() => {
                            document.querySelector('#alert img').src = "img/konami.jpg";
                            setTimeout(() => {
                                document.querySelector('#alert img').classList.add('final');
                                document.querySelector('#alert img').style.opacity = "1";
                                finalStep();
                                document.querySelector('#alert').innerHTML += "<p style='color: white; font-size: 24px; opacity: 0; transition: all 1s linear;'>Un code secret populaire...</p>";
                                setTimeout(() => {
                                    document.querySelector('#alert p').style.opacity = "1";
                                }, 5000);
                            }, 50);
                        }, 1050);
                    }, 2000);
                }, 50);
            }, 1050);
        }, 2000);
    }, 550);
}

function finalStep() {
    var keys_pressed = [];
    var correct_combination = [
        38,  // Up
        38,  // Up
        40,  // Down
        40,  // Down
        37,  // Left
        39,  // Right
        37,  // Left
        39,  // Right
        66,  // B
        65   // A
    ];
    var labels = document.querySelectorAll('label');
    for(var i = 0; i < labels.length; i++){
        var label = labels[i];
        label.addEventListener('click', function(e){
        e.preventDefault();
        });
    }
    document.body.addEventListener('keyup', function(e){
        keys_pressed.push(e.keyCode);
        for(var i = 0; i < keys_pressed.length; i++){
            if(keys_pressed[i] != correct_combination[i]){
                keys_pressed = [];
            }
        }
        if(equals(keys_pressed, correct_combination)){
            hideAlert();
            alertPerso("Bravo, tu as finis mes épreuves... Allez on passe à la suite ? ;)");
        }
    });
}

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);