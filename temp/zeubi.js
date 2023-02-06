let gifs = [
    "crossed-the-line",
    "i-cannot-accept",
    "i-dont-accept",
    "no-oprah",
    "no",
    "number"
]
cset("a6zz3df99g", '', -1);
cset("Cqc9XX45G6s96CHjbDR3", '', -1);

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
            alertPerso('Oups... Je me suis tromp\xE9 dans la fourchette ;)');
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

// coucou => chercher dans 'elems' avec l'attribut name == 'str'
// azerty => fonction à la soumission du form
// azertyuiop => fonction à la soumission du form2

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
            alertPerso("S\xE9rieux ?? 'le code'");
        }else{
            let i = Math.ceil(Math.random()*gifs.length-1);
            showAlert(gifs[i]);
        }
    }else{
        cset("Cqc9XX45G6s96CHjbDR3", input.value)
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

function step3(){
    crm("a6zz3df99g");
    let form = document.querySelector('form');
    form.setAttribute("onsubmit", "qsd(event)");
    let input = coucou(form.elements, "code");
    input.value = "";
    let p = form.querySelector('p');
    p.innerText = "Entrez la Clé de déchiffrement :";
}
function qsd(ev){
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
            alertPerso("S\xE9rieux ?? 'le code'");
        }else{
            let i = Math.ceil(Math.random()*gifs.length-1);
            showAlert(gifs[i]);
        }
    }else{
        cset("Cqc9XX45G6s96CHjbDR3", input.value)
        if(cget("a6zz3df99g")){
            showAlert("well-done");
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