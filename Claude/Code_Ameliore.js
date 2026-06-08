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

// Variables pour le drag & drop amélioré
var elementEnCoursDeDeplacement = null;
var positionInsertion = null;

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
    /*doc.addFont("Donnees/Ubuntu-regular.ttf", "Ubuntu", "normal");
    doc.setFont("Ubuntu");*/

    doc.line(5,18,290,18,null);
    
    doc.setFontSize(15);
    doc.text(NumClasse1.textContent,10,10);
    doc.setFontSize(10);
    doc.text(OptionClasse1.ariaLabel,10,15);
    for(var j = 0; j<TabEleves1.length; j++) {
      doc.text(TabEleves1[j].firstChild.textContent,10,25+5*j);
      }
    doc.setFontSize(15);
    doc.text(NumClasse2.textContent,80,10);
    doc.setFontSize(10);
    doc.text(OptionClasse2.ariaLabel,80,15);
    for(var j = 0; j<TabEleves2.length; j++) {
      doc.text(TabEleves2[j].firstChild.textContent,80,20+5*j);
      }
    doc.setFontSize(15);
    doc.text(NumClasse3.textContent,150,10);
    doc.setFontSize(10);
    doc.text(OptionClasse3.ariaLabel,150,15);
    for(var j = 0; j<TabEleves3.length; j++) {
      doc.text(TabEleves3[j].firstChild.textContent,150,20+5*j);
      }
    if (LaClasse4.style.display=='block') {
      doc.setFontSize(15);
      doc.text(NumClasse4.textContent,150,10);
      doc.setFontSize(10);
      for(var j = 0; j<TabEleves4.length; j++) {
        doc.text(TabEleves4[j].firstChild.textContent,150,15+5*j);
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
    var Garcons = TGars1;
    var Filles = TFille1;
    var Eleves = TEleves1;
    if (Classe == 'BlocClasse2') { Garcons = TGars2; Filles = TFille2; Eleves = TEleves2 }
    if (Classe == 'BlocClasse3') { Garcons = TGars3; Filles = TFille3; Eleves = TEleves3 }
    if (Classe == 'BlocClasse4') { Garcons = TGars4; Filles = TFille4; Eleves = TEleves4 }
    if (LaClasse.hasChildNodes()) {
    var Enfants = LaClasse.childNodes;
      for (var i = 0; i<Enfants.length; i++) {
        Nombre++;
        if (Enfants[i].ariaLabel.indexOf("G") != -1) NG++;
        if (Enfants[i].ariaLabel.indexOf("F") != -1) NF++;
      }  
      Garcons.textContent = ' : '+NG;
      Filles.textContent = ' : '+NF;
      Eleves.textContent = ' ('+Nombre+')';
    } else {
      Garcons.textContent = ' : 0';
      Filles.textContent = ' : 0';
      Eleves.textContent = ' (0)';
    }
}

function Compter() {
  Comptage('BlocClasse1');
  Comptage('BlocClasse2');
  Comptage('BlocClasse3');
  Comptage('BlocClasse4');
}

// ==========================================
// FONCTIONS DE DRAG & DROP AMÉLIORÉES
// ==========================================

/**
 * Fonction pour gérer le survol lors du drag
 * Permet de visualiser où l'élément sera déposé
 */
function DragDessus(ev) {
    ev.preventDefault();
    
    // Ajouter un effet visuel sur la zone de dépôt
    if (!ev.currentTarget.classList.contains('drag-over')) {
        ev.currentTarget.classList.add('drag-over');
    }
    
    // Si on survole un élément spécifique dans la liste
    if (ev.target.classList.contains('ElevesList') && ev.target !== elementEnCoursDeDeplacement) {
        // Déterminer si on insère avant ou après l'élément survolé
        const rect = ev.target.getBoundingClientRect();
        const milieu = rect.top + rect.height / 2;
        
        // Retirer les indicateurs précédents
        document.querySelectorAll('.insert-before, .insert-after').forEach(el => {
            el.classList.remove('insert-before', 'insert-after');
        });
        
        // Ajouter l'indicateur de position
        if (ev.clientY < milieu) {
            ev.target.classList.add('insert-before');
            positionInsertion = { element: ev.target, position: 'before' };
        } else {
            ev.target.classList.add('insert-after');
            positionInsertion = { element: ev.target, position: 'after' };
        }
    } else if (ev.target.id === ev.currentTarget.id) {
        // Si on est sur la zone vide du conteneur
        positionInsertion = { element: ev.currentTarget, position: 'append' };
    }
}

/**
 * Fonction pour retirer l'effet visuel quand on quitte la zone
 */
function DragLeave(ev) {
    if (ev.currentTarget === ev.target) {
        ev.currentTarget.classList.remove('drag-over');
    }
}

/**
 * Fonction pour gérer le dépôt d'un élève
 * Avec insertion précise à la position souhaitée
 */
function LacheEleve(ev) {
    ev.preventDefault();
    
    // Retirer les effets visuels
    ev.currentTarget.classList.remove('drag-over');
    document.querySelectorAll('.insert-before, .insert-after').forEach(el => {
        el.classList.remove('insert-before', 'insert-after');
    });
    
    const idEleve = ev.dataTransfer.getData("EleveDéplacé");
    const Eleve = document.getElementById(idEleve);
    const destination = ev.currentTarget;
    
    if (!Eleve) return;
    
    // Retirer l'élève de son conteneur actuel
    const ancienParent = Eleve.parentNode;
    if (ancienParent) {
        ancienParent.removeChild(Eleve);
    }
    
    // Insérer l'élève à la position déterminée
    if (positionInsertion && positionInsertion.element) {
        if (positionInsertion.position === 'before') {
            destination.insertBefore(Eleve, positionInsertion.element);
        } else if (positionInsertion.position === 'after') {
            if (positionInsertion.element.nextSibling) {
                destination.insertBefore(Eleve, positionInsertion.element.nextSibling);
            } else {
                destination.appendChild(Eleve);
            }
        } else {
            destination.appendChild(Eleve);
        }
    } else {
        destination.appendChild(Eleve);
    }
    
    // Mettre à jour les tableaux
    MettreAJourTableaux(Eleve, ancienParent.id, destination.id);
    
    // Réinitialiser la position d'insertion
    positionInsertion = null;
    
    // Recompter les élèves
    Compter();
}

/**
 * Fonction pour mettre à jour les tableaux d'élèves
 */
function MettreAJourTableaux(eleve, ancienContenant, nouveauContenant) {
    // Retirer de l'ancien tableau
    switch(ancienContenant) {
        case 'BlocListeEleves':
            TabEleves = TabEleves.filter(E => E.id !== eleve.id);
            break;
        case 'BlocClasse1':
            TabEleves1 = TabEleves1.filter(E => E.id !== eleve.id);
            break;
        case 'BlocClasse2':
            TabEleves2 = TabEleves2.filter(E => E.id !== eleve.id);
            break;
        case 'BlocClasse3':
            TabEleves3 = TabEleves3.filter(E => E.id !== eleve.id);
            break;
        case 'BlocClasse4':
            TabEleves4 = TabEleves4.filter(E => E.id !== eleve.id);
            break;
    }
    
    // Ajouter au nouveau tableau
    switch(nouveauContenant) {
        case 'BlocListeEleves':
            TabEleves.push(eleve);
            break;
        case 'BlocClasse1':
            TabEleves1.push(eleve);
            break;
        case 'BlocClasse2':
            TabEleves2.push(eleve);
            break;
        case 'BlocClasse3':
            TabEleves3.push(eleve);
            break;
        case 'BlocClasse4':
            TabEleves4.push(eleve);
            break;
    }
}

/**
 * Fonction pour déplacer un élève d'une position dans la liste
 * @param {string} eleveId - L'ID de l'élève à déplacer
 * @param {string} conteneurId - L'ID du conteneur
 * @param {number} direction - 1 pour descendre, -1 pour monter
 */
function DeplacerEleveDansListe(eleveId, conteneurId, direction) {
    const conteneur = document.getElementById(conteneurId);
    const eleve = document.getElementById(eleveId);
    
    if (!conteneur || !eleve) return;
    
    const elements = Array.from(conteneur.children);
    const indexActuel = elements.indexOf(eleve);
    
    if (indexActuel === -1) return;
    
    // Calculer le nouvel index
    const nouvelIndex = indexActuel + direction;
    
    // Vérifier que le nouvel index est valide
    if (nouvelIndex < 0 || nouvelIndex >= elements.length) return;
    
    // Retirer l'élément
    conteneur.removeChild(eleve);
    
    // Réinsérer à la nouvelle position
    if (nouvelIndex === elements.length - 1) {
        conteneur.appendChild(eleve);
    } else {
        const elementReference = direction > 0 ? 
            elements[nouvelIndex + 1] : elements[nouvelIndex];
        conteneur.insertBefore(eleve, elementReference);
    }
}

// ==========================================
// FIN FONCTIONS DE DRAG & DROP AMÉLIORÉES
// ==========================================

function Danger(ID) {
  const Text = document.getElementById(ID);
  Text.classList.toggle("On");
}

function Trier(a, b) {
    const nom1 = a.firstChild.textContent;
    const nom2 = b.firstChild.textContent;
    if (nom1 < nom2) {
      return -1;
    }
    if (nom1 > nom2) {
      return 1;
    }
    return 0;
}

function AfficheEleves() {
  TabEleves.sort(Trier);
  Liste.textContent = '';
  for (var i=0;i<TabEleves.length;i++) {
    Liste.appendChild(TabEleves[i]);
  }
}

function CreerEleves() {
  fetch(TableauEleves)
    .then(reponse => {
      if (reponse.ok) {
        return reponse.json();
      }
      throw new Error(`${reponse.statusText} (${reponse.status})`)
    })
    .then(Donnee => {
      Donnee.forEach(truc => {
          var li = document.createElement("div");
          li.classList.add("ElevesList");
          li.draggable = true;
          li.id = 'el_'+ NB++;
          li.ariaLabel = '';
          if (truc.SEXE == 'M') { 
            li.ariaLabel = "G";
          }
          if (truc.SEXE == 'F') {
            li.ariaLabel = "F";
          }
          if (ChoixClasse=='6') {
          li.textContent=`${truc.NOM} ${truc.PRENOM}`;
          /*if (truc.LV1 == 'ANGLAIS') {
            var Img6 = document.createElement("img");
            Img6.src = 'Images/Anglais.png';
            Img6.style.float = 'right';
            li.appendChild(Img6);
          }
          if (truc.LV1 == 'ALLEMAND') {
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
        
        // Event listener pour le début du drag
        li.addEventListener("dragstart", function(evt) {
            elementEnCoursDeDeplacement = evt.target;
            evt.target.classList.add('dragging');
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData("EleveDéplacé", evt.target.id);
            
            // Mettre à jour les tableaux
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
        });
        
        // Event listener pour la fin du drag
        li.addEventListener("dragend", function(evt) {
            evt.target.classList.remove('dragging');
            elementEnCoursDeDeplacement = null;
            
            // Nettoyer les indicateurs visuels
            document.querySelectorAll('.insert-before, .insert-after, .drag-over').forEach(el => {
                el.classList.remove('insert-before', 'insert-after', 'drag-over');
            });
        });
         
        // Clic droit pour retourner à la liste
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
        });
        
        TabEleves.push(li);
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
          LaClasse4.style.display = "block";
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
  // Configuration du drag & drop pour chaque classe
  Classe1.addEventListener("dragover", DragDessus);
  Classe1.addEventListener("drop", LacheEleve);
  Classe1.addEventListener("dragleave", DragLeave);
  
  Classe2.addEventListener("dragover", DragDessus);
  Classe2.addEventListener("drop", LacheEleve);
  Classe2.addEventListener("dragleave", DragLeave);
  
  Classe3.addEventListener("dragover", DragDessus);
  Classe3.addEventListener("drop", LacheEleve);
  Classe3.addEventListener("dragleave", DragLeave);
  
  Classe4.addEventListener("dragover", DragDessus);
  Classe4.addEventListener("drop", LacheEleve);
  Classe4.addEventListener("dragleave", DragLeave);
  
  // Configuration du menu
  OuvrirMenu.onclick = OpenMenu;
  FermerMenu.onclick = CloseMenu;
  FermerMenu.classList.add("Off");
}

Init();
CreerStructure();
ReinitTrie();
CreerEleves();
Compter();
