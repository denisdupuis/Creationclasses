const Liste = document.getElementById('BlocListeEleves');
const ListeClasses = 6;
const Classes = document.getElementById('Classes');
const LaClasse4 = document.getElementById('Classe4');

const Classe1 = document.getElementById('BlocClasse1');
const Classe2 = document.getElementById('BlocClasse2');
const Classe3 = document.getElementById('BlocClasse3');
const Classe4 = document.getElementById('BlocClasse4');

var OptionClasse1 = document.getElementById('ClasseOptions1');
var OptionClasse2 = document.getElementById('ClasseOptions2');
var OptionClasse3 = document.getElementById('ClasseOptions3');
var OptionClasse4 = document.getElementById('ClasseOptions4');

var TGars1 = document.getElementById('NBGars1');
var TGars2 = document.getElementById('NBGars2');
var TGars3 = document.getElementById('NBGars3');
var TGars4 = document.getElementById('NBGars4');

var TFille1 = document.getElementById('NBFilles1');
var TFille2 = document.getElementById('NBFilles2');
var TFille3 = document.getElementById('NBFilles3');
var TFille4 = document.getElementById('NBFilles4');

var TEleves1 = document.getElementById('NBEleves1');
var TEleves2 = document.getElementById('NBEleves2');
var TEleves3 = document.getElementById('NBEleves3');
var TEleves4 = document.getElementById('NBEleves4');

var NumClasse1 = document.getElementById('NumClasse1');
var NumClasse2 = document.getElementById('NumClasse2');
var NumClasse3 = document.getElementById('NumClasse3');
var NumClasse4 = document.getElementById('NumClasse4');

var NB = 0;
var Bouton6 = document.getElementById("B6");
var Bouton5 = document.getElementById("B5");
var Bouton4 = document.getElementById("B4");
var Bouton3 = document.getElementById("B3");

var OESP = document.getElementById('ESP');
var OITA = document.getElementById('ITA');
var OALL = document.getElementById('ALL');
var ODanse = document.getElementById('Danse');
var OVoile = document.getElementById('Voile');
var OLCE = document.getElementById('LCE');
var OLatin = document.getElementById('Latin');
var OHist = document.getElementById('HIST');
var OG = document.getElementById('G');
var OF = document.getElementById('F');


var ChoixClasse = "6";
var TableauEleves = "Donnees/CM2vers6.json";
//Bonjkour !!!

var TabStructure = "Donnees/Structure.json";
var TabOptionsClasses6 = [];
var TabOptionsClasses5 = [];
var TabOptionsClasses4 = [];
var TabOptionsClasses3 = [];
var TabOptionsLabel6 = [];
var TabOptionsLabel5 = [];
var TabOptionsLabel4 = [];
var TabOptionsLabel3 = [];

var TabTri = [];

var TabEleves = [];
var TabEleves1 = [];
var TabEleves2 = [];
var TabEleves3 = [];
var TabEleves4 = [];

const Menu = document.getElementById("MenuBas");
const OuvrirMenu = document.getElementById("OuvrirMenu");
const FermerMenu = document.getElementById("FermerMenu");

function OpenMenu() {
    Menu.classList.add("active");
    OuvrirMenu.classList.add("Off");
    FermerMenu.classList.remove("Off");
}

function CloseMenu() {
    Menu.classList.remove("active");
    OuvrirMenu.classList.remove("Off");
    FermerMenu.classList.add("Off");
}

function CreerStructure() {
  fetch(TabStructure)
    .then(reponse => {
      if (reponse.ok) {
        return reponse.json();
      }
      throw new Error(`${reponse.statusText} (${reponse.status})`)
    })
   .then(Donnee => {
      Donnee.forEach(truc => {
        switch (truc.NIVEAU) {
          case 6:
            TabOptionsClasses6[truc.CLASSE] = truc.OPTIONS;
            TabOptionsLabel6[truc.CLASSE] = truc.LABEL;
            break;
          case 5:
            TabOptionsClasses5[truc.CLASSE] = truc.OPTIONS;
            TabOptionsLabel5[truc.CLASSE] = truc.LABEL;
            break;
          case 4:
            TabOptionsClasses4[truc.CLASSE] = truc.OPTIONS;
            TabOptionsLabel4[truc.CLASSE] = truc.LABEL;
            break;
          case 3:
            TabOptionsClasses3[truc.CLASSE] = truc.OPTIONS;
            TabOptionsLabel3[truc.CLASSE] = truc.LABEL;
            break;              
        }
      })
   }) 
}


function ReinitTrie() {
  TabTri["ESP"] = 1;
  TabTri["ALL"] = 1;
  TabTri["ITA"] = 1;
  TabTri["Latin"] = 1;
  TabTri["Voile"] = 1;
  TabTri["Danse"] = 1;
  TabTri["LCE"] = 1;
  TabTri["HIST"] = 1;
  TabTri["G"] = 1;
  TabTri["F"] = 1;
}


function RemplirTableaux(Classe) {
  var LaClasse = document.getElementById(Classe);
  if (LaClasse.hasChildNodes()) {
    var Enfants = LaClasse.childNodes;
    for (var i = 0; i<Enfants.length; i++) {
      if (Classe=='BlocClasse1') TabEleves1.push(Enfants[i]);
      if (Classe=='BlocClasse2') TabEleves2.push(Enfants[i]);
      if (Classe=='BlocClasse3') TabEleves3.push(Enfants[i]);
      if (Classe=='BlocClasse4') TabEleves4.push(Enfants[i]);
      }      
    }
}  


function PrintPDF() {
    TabEleves1 = [];
    TabEleves2 = [];
    TabEleves3 = [];
    TabEleves4 = [];

    RemplirTableaux('BlocClasse1');
    RemplirTableaux('BlocClasse2');
    RemplirTableaux('BlocClasse3');
    RemplirTableaux('BlocClasse4');

    TabEleves1.sort(Trier);
    TabEleves2.sort(Trier);
    TabEleves3.sort(Trier);
    TabEleves4.sort(Trier);

    var doc = new jsPDF({orientation: "landscape"});
    
    doc.setDrawColor(1,0,0);
    doc.setLineWidth(0.7);
    doc.line(5,18,290,18,null);
    
    doc.setFontSize(15);
    doc.setTextColor("#FF0000");
    doc.text(NumClasse1.textContent,10,10);
    doc.setFontSize(10);
    doc.text(OptionClasse1.ariaLabel,10,15);
    doc.setTextColor("#000000");
    for(var j = 0; j<TabEleves1.length; j++) {
      doc.text(TabEleves1[j].firstChild.textContent,10,25+5*j);
      }
    doc.setFontSize(15);
    doc.setTextColor("#FF0000");
    doc.text(NumClasse2.textContent,80,10);
    doc.setFontSize(10);
    doc.text(OptionClasse2.ariaLabel,80,15);
    doc.setTextColor("#000000");
    for(var j = 0; j<TabEleves2.length; j++) {
      doc.text(TabEleves2[j].firstChild.textContent,80,25+5*j);
      }
    doc.setFontSize(15);    
    doc.setTextColor("#FF0000");
    doc.text(NumClasse3.textContent,150,10);
    doc.setFontSize(10);
    doc.text(OptionClasse3.ariaLabel,150,15);
    doc.setTextColor("#000000");
    for(var j = 0; j<TabEleves3.length; j++) {
      doc.text(TabEleves3[j].firstChild.textContent,150,25+5*j);
      }
    if (LaClasse4.style.display=='block') {
      doc.setFontSize(15);
      doc.text(NumClasse4.textContent,150,10);
      doc.setFontSize(10);
      for(var j = 0; j<TabEleves4.length; j++) {
        doc.text(TabEleves4[j].firstChild.textContent,150,25+5*j);
        }
    }
    doc.save("Classes.pdf");
}

function TrierOptions(Valeur) {
  var Element = document.getElementById(Valeur);
  TabTri[Valeur] = 1-TabTri[Valeur];
  if (TabTri[Valeur] == 0) {
    Element.classList.add("selected");
  } else Element.classList.remove("selected");
  for(var i=0; i<TabEleves.length; i++) {
    if (TabEleves[i].ariaLabel.indexOf(Valeur) == -1) {
      if (TabTri[Valeur] == 0) {
        TabEleves[i].style.display = 'none';
      } else TabEleves[i].style.display = 'block';
    }
  }
}

function Comptage(Classe) {
    var NG = 0;
    var NF = 0;
    var Nombre = 0;
    const  LaClasse = document.getElementById(Classe);

    if (LaClasse.hasChildNodes()){
        var Elements = LaClasse.childNodes;
        for (var i = 0; i < Elements.length ; i++) {
            if (Elements[i].style.border=='thick double blue') {
                NG += 1;
            } else { NF += 1; }
        }
        Nombre = NG + NF;
    }
    if (Classe=='BlocClasse1') { 
        TGars1.textContent = `: ${NG}  `; 
        TFille1.textContent = `: ${NF}  `;
        TEleves1.textContent = `(${Nombre})`;
        }
    if (Classe=='BlocClasse2') { 
       TGars2.textContent = `: ${NG}  `; 
       TFille2.textContent = `: ${NF}  `;
       TEleves2.textContent = `(${Nombre})`
       }
    if (Classe=='BlocClasse3') { 
       TGars3.textContent = `: ${NG}  `; 
       TFille3.textContent = `: ${NF}  `;
       TEleves3.textContent = `(${Nombre})`
       }  
    if (Classe=='BlocClasse4') { 
      TGars4.textContent = `: ${NG}  `; 
      TFille4.textContent = `: ${NF}  `;
      TEleves4.textContent = `(${Nombre})`
      }     
}


function Compter(){
    Comptage('BlocClasse1');
    Comptage('BlocClasse2');
    Comptage('BlocClasse3');
    Comptage('BlocClasse4');
}


function Trier(a, b) {
  if (a!=null && b!=null) {
    if (a.textContent < b.textContent) { return -1; }
    if (a.textContent > b.textContent) { return 1; }
  }
}


function DragDessus(evt) {
  evt.preventDefault();
}

function DragLeave(evt) {
  evt.preventDefault();
}


function LacheEleve(evt) {
    evt.preventDefault();
    var Data = evt.dataTransfer.getData("EleveDéplacé");
    if (Data) {   // Si l'élément est bien une DIV (et non une image ou du texte) ... 
    var Eleve = document.getElementById(Data);  
    console.log(evt.target.id);
    switch(evt.target.id) {
      case 'BlocClasse1':
        evt.target.innerHTML = '';
        TabEleves1.push(Eleve);
        TabEleves1.sort(Trier);
        for(var i=0; i<TabEleves1.length; i++) {
          evt.target.appendChild(TabEleves1[i]);
        }
        break;
      case 'BlocClasse2':
        evt.target.innerHTML = '';
        TabEleves2.push(Eleve);
        TabEleves2.sort(Trier);
        for(var i=0; i<TabEleves2.length; i++) {
          evt.target.appendChild(TabEleves2[i]);
        }
        break;
      case 'BlocClasse3':
        evt.target.innerHTML = '';
        TabEleves3.push(Eleve);
        TabEleves3.sort(Trier);
        for(var i=0; i<TabEleves3.length; i++) {
          evt.target.appendChild(TabEleves3[i]);
        }
        break;  
      case 'BlocClasse4':
        evt.target.innerHTML = '';
        TabEleves4.push(Eleve);
        TabEleves4.sort(Trier);
        for(var i=0; i<TabEleves4.length; i++) {
          evt.target.appendChild(TabEleves4[i]);
        }
        break;    
      }
    evt.stopPropagation();  
    Compter();
    }
}


function DragSortie(evt) {
    var Data = evt.dataTransfer.getData("EleveDéplacé");
    var Eleve = document.getElementById(Data);
}


function AfficheEleves() {
  
  Liste.innerHTML = '';
  TabEleves.sort(Trier);
  for (var i=0; i<TabEleves.length; i++) {
    Liste.appendChild(TabEleves[i]);
  }
}


function Danger(id) {
  var T = document.getElementById(id);
  T.classList.toggle('Alert');
}

function CreerEleves() {
  var NB = 0;
  fetch(TableauEleves)
  .then(reponse => {
      if (reponse.ok) {
          return reponse.json();
      }
      throw new Error(`${reponse.statusText} (${reponse.status})`)
    })
    
  .then(Donnee => {
      Classe1.innerHTML='';
      Classe2.innerHTML = '';
      Classe3.innerHTML = '';
      Classe4.innerHTML = '';
      Liste.innerHTML = '';
      Donnee.forEach(truc => {
        const li = document.createElement('div');
        li.ariaLabel='';
        NB+=1;
                    
        li.style.width='300px';
        li.style.margin="10px 0px 10px 0px";
        li.style.borderRadius='10px';
        li.style.color ='rgb(1, 1, 1)';
        li.style.cursor='grab';
        li.style.color='rgb(243, 244, 250)';
        li.style.alignItems = 'center';
        
        li.id = NB;
        li.setAttribute("draggable", "true"); 
        li.classList.add("Etiquette");

        if (truc.SEXE=='M'){
            li.style.border='thick double blue';
            li.style.backgroundColor='rgb(9, 9, 83)';
            li.ariaLabel = li.ariaLabel+" G";
        } else { li.style.border='thick double rgb(227, 133, 240)'; 
                 li.style.backgroundColor='rgb(68, 44, 79)';
                 li.ariaLabel = li.ariaLabel+" F";
               }
                  
        if (ChoixClasse == 6)
          {
          li.textContent = `${truc.NOM} ${truc.PRENOM}`;
          var ImgEcole = document.createElement("img");
          switch(truc.ECOLE) {
            case 'P':
              ImgEcole.src='Images/P.png';
              break;
            case 'L':
              ImgEcole.src='Images/L.png';
              break;
            case 'M':
              ImgEcole.src='Images/M.png'  ;
              break;
            case 'C':
              ImgEcole.src='Images/C.png';
              break;
            } 
          if (truc.OPTION == 'DANSE') {
            var Image = document.createElement('img');
            Image.src = 'Images/Danse.png';
            Image.style.float = 'right';
            li.ariaLabel = li.ariaLabel+" Danse";
            li.appendChild(Image);
          }  
          if (truc.OPTION =='VOILE') {
            var Img4 = document.createElement("img");
            Img4.src='Images/Voile.png';
            Img4.style.float = 'right';
            li.ariaLabel = li.ariaLabel+" Voile";
            li.appendChild(Img4);
            }
          if (truc.OPTION =='ULIS') {
            var Img5 = document.createElement("img");
            Img5.src='Images/ULIS.png';
            Img5.style.float = 'right';
            li.appendChild(Img5);
          }        
          ImgEcole.style.float = 'right';
          li.appendChild(ImgEcole);
          /*if (truc.LV2 == 'ALLEMAND') {
            var Img6 = document.createElement("img");
            Img6.src = 'Images/Allemand.jpg';
            Img6.style.float = 'right';
            li.appendChild(Img6);
          } */
          if (truc.OPTION == 'FLS') {
            var Img6 = document.createElement("img");
            Img6.src = 'Images/FLS.png';
            Img6.style.float = 'right';
            li.appendChild(Img6);
          }
          } else {
              li.textContent=`${truc.NOM} ${truc.PRENOM}`;
              var Img6 = document.createElement("img");
              if (truc.LV2 =='ESP') { 
                Img6.src = 'Images/Espagnol.png'; 
                li.ariaLabel = li.ariaLabel+" ESP";
              }
              if (truc.LV2 =='ITALIEN') {
                Img6.src = 'Images/Italie.png';
                li.ariaLabel = li.ariaLabel+" ITA";
              }
              if (truc.LV2 =='ALLEMAND') {
                Img6.src = 'Images/Allemand.jpg';
                li.ariaLabel = li.ariaLabel+" ALL";
              }
              if (truc.LV2 == 'FLS') Img6.src = 'Images/FLS.png';
              Img6.style.float = 'right';
              li.appendChild(Img6);
              if ((truc.OPTION == 'DANSE')||(truc.OPTION2=='DANSE')) {
                var Image = document.createElement('img');
                Image.src = 'Images/Danse.png';
                Image.style.float = 'right';
                li.ariaLabel = li.ariaLabel+" Danse";
                li.appendChild(Image);
              }
              if ((truc.OPTION =='LATIN')||(truc.OPTION2=='LATIN')) {
                var Img2 = document.createElement("img");
                Img2.src = 'Images/Latin.png';
                Img2.style.float = 'right';
                li.ariaLabel = li.ariaLabel+" Latin";
                li.appendChild(Img2);
                }
              if ((truc.OPTION == 'LCE')||(truc.OPTION2=='LCE')) {
                var Img3 = document.createElement("img");
                Img3.src = 'Images/LCE.png';
                Img3.style.float = 'right';
                li.ariaLabel = li.ariaLabel+" LCE";
                li.appendChild(Img3);
              }
              if ((truc.OPTION =='VOILE')||(truc.OPTION2=='VOILE')) {
                var Img4 = document.createElement("img");
                Img4.src='Images/Voile.png';
                Img4.style.float = 'right';
                li.ariaLabel = li.ariaLabel+" Voile";
                li.appendChild(Img4);
                }
              if (truc.OPTION =='ULIS'){
                var Img5 = document.createElement("img");
                Img5.src='Images/ULIS.png';
                Img5.style.float = 'right';
                li.appendChild(Img5);
              }

              if ((truc.OPTION =='H')||(truc.OPTION2=='H')) {  
                var Img6 = document.createElement("img");
                Img6.src='Images/HistoireArts.png';
                Img6.style.float = 'right';
                li.ariaLabel = li.ariaLabel+" HIST";
                li.appendChild(Img6);
                }
              }
        if (truc.INFOS !='') {
          var Img7 = document.createElement("img");
          Img7.src='Images/Danger.png';
          Img7.id = li.id + "_Danger";
          Img7.classList.add("Danger");
          const TextAlert = document.createElement('div');
          TextAlert.id = 'Alert_'+li.id;
          TextAlert.style.fontSize = '20px';
          TextAlert.innerHTML = truc.INFOS;
          TextAlert.classList.add('Alert');
          Img7.addEventListener("click", (ev) => { Danger(TextAlert.id )});
          li.appendChild(Img7);
          li.appendChild(TextAlert);
        }      
        li.addEventListener("dragstart", function(evt) {
            evt.dataTransfer.setData("EleveDéplacé",evt.target.id);
            switch(evt.target.parentNode.id) {
              case 'BlocListeEleves':
                TabEleves = TabEleves.filter(E => E.id != evt.target.id);
                break;
              case 'BlocClasse1':
                TabEleves1 = TabEleves1.filter(E => E.id != evt.target.id);
                break;
              case 'BlocClasse2':
                TabEleves2 = TabEleves2.filter(E => E.id != evt.target.id);
                break;
              case 'BlocClasse3':
                TabEleves3 = TabEleves3.filter(E => E.id != evt.target.id);
                break;  
              case 'BlocClasse4':
                TabEleves4 = TabEleves4.filter(E => E.id != evt.target.id);
                break;    
            }
        })
         
       li.addEventListener("contextmenu", function(evt) {
            const Source = evt.target.parentNode;
            evt.preventDefault();
            if (Source.id != 'BlocListeEleves') {
              Source.removeChild(li);
              if (Source.id == 'BlocClasse1') { TabEleves1 = TabEleves1.filter(E => E.id != evt.target.id) }
              if (Source.id == 'BlocClasse2') { TabEleves2 = TabEleves2.filter(E => E.id != evt.target.id) }
              if (Source.id == 'BlocClasse3') { TabEleves3 = TabEleves3.filter(E => E.id != evt.target.id) }
              if (Source.id == 'BlocClasse4') { TabEleves4 = TabEleves4.filter(E => E.id != evt.target.id) }
              TabEleves.push(li);
              AfficheEleves();
              Compter();
            }
        })
        TabEleves.push(li);
        //Liste.appendChild(li);
      })
    AfficheEleves();  
    })
}


function ChangerChoix(idChoix) {
    ChoixClasse = idChoix;

    TGars1.textContent = "0"; 
    TFille1.textContent = "0";
    TEleves1.textContent = "0";
    TGars2.textContent = "0"; 
    TFille2.textContent = "0";
    TEleves2.textContent = "0";
    TGars3.textContent = "0"; 
    TFille3.textContent = "0";
    TEleves3.textContent = "0";
    TGars4.textContent = "0"; 
    TFille4.textContent = "0";
    TEleves4.textContent = "0";
    TabEleves1 = [];
    TabEleves2 = [];
    TabEleves3 = [];
    TabEleves4 = [];
    TabEleves = [];
 
    switch (ChoixClasse) {
        
        case "6": TableauEleves = "Donnees/CM2vers6.json";
          NumClasse1.textContent = "6ème 2";
          NumClasse2.textContent = "6ème 3";
          NumClasse3.textContent = "6ème 4";
          OptionClasse1.textContent = TabOptionsClasses6[2];
          OptionClasse2.textContent = TabOptionsClasses6[3];
          OptionClasse3.textContent = TabOptionsClasses6[4];
          OptionClasse1.ariaLabel = TabOptionsLabel6[2];
          OptionClasse2.ariaLabel = TabOptionsLabel6[3];
          OptionClasse3.ariaLabel = TabOptionsLabel6[4];
          //LaClasse4.style.display = "block";
          break;
        case "5": TableauEleves = "Donnees/6vers5.json";
          NumClasse1.textContent = "5ème 2";
          NumClasse2.textContent = "5ème 3";
          NumClasse3.textContent = "5ème 4";
          OptionClasse1.textContent = TabOptionsClasses5[2];
          OptionClasse2.textContent = TabOptionsClasses5[3];
          OptionClasse3.textContent = TabOptionsClasses5[4];
          OptionClasse1.ariaLabel = TabOptionsLabel5[2];
          OptionClasse2.ariaLabel = TabOptionsLabel5[3];
          OptionClasse3.ariaLabel = TabOptionsLabel5[4];
          LaClasse4.style.display = "none";
          break;
        case "4": TableauEleves = "Donnees/5vers4.json";
          NumClasse1.textContent = "4ème 2";
          NumClasse2.textContent = "4ème 3";
          NumClasse3.textContent = "4ème 4";
          OptionClasse1.textContent = TabOptionsClasses4[2];
          OptionClasse2.textContent = TabOptionsClasses4[3];
          OptionClasse3.textContent = TabOptionsClasses4[4];
          OptionClasse1.ariaLabel = TabOptionsLabel4[2];
          OptionClasse2.ariaLabel = TabOptionsLabel4[3];
          OptionClasse3.ariaLabel = TabOptionsLabel4[4];
          LaClasse4.style.display = "none";
          break;
        case "3": TableauEleves = "Donnees/4vers3.json";
          NumClasse1.textContent = "3ème 2";
          NumClasse2.textContent = "3ème 3";
          NumClasse3.textContent = "3ème 4";
          OptionClasse1.textContent = TabOptionsClasses3[2];
          OptionClasse2.textContent = TabOptionsClasses3[3];
          OptionClasse3.textContent = TabOptionsClasses3[4];
          OptionClasse1.ariaLabel = TabOptionsLabel3[2];
          OptionClasse2.ariaLabel = TabOptionsLabel3[3];
          OptionClasse3.ariaLabel = TabOptionsLabel3[4];
          LaClasse4.style.display = "none";
          break;
    }
    ReinitTrie();
    CreerEleves();
}


function Init() {
  Classe1.addEventListener("dragover", DragDessus);
  Classe1.addEventListener("drop", LacheEleve);
  Classe2.addEventListener("dragover", DragDessus);
  Classe2.addEventListener("drop", LacheEleve);
  Classe3.addEventListener("dragover", DragDessus);
  Classe3.addEventListener("drop", LacheEleve);
  Classe4.addEventListener("dragover", DragDessus);
  Classe4.addEventListener("drop", LacheEleve);
  LaClasse4.style.display = 'none';
  OuvrirMenu.onclick = OpenMenu;
  FermerMenu.onclick = CloseMenu;
  FermerMenu.classList.add("Off");
}

Init();
CreerStructure();
ReinitTrie();
CreerEleves();
Compter();