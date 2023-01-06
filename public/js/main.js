// ```
// # Bienvenu à Codepital:
// >Dans cet exercice nous aurons des malades qui iront ce faire débuger chez un doctor. Le doctor les diagnostiquera et leur préscrira un remède. Par la suite les malades irons à la pharmacie afin d'acheter leur remède puis le prendrons et seront guérri.

// ## Description des patients
// >les malades ont un nom, une maladie, de l'argent, une poche, un état de santé,ils savent aller à un endroit, prendre un médicamment et payer. Au début, les patients sont dans un salle d'attente. 

// |nom|maladie|argent|poche|etatSante|traitement|goTo|takeCare|paye|
// |---|---|---|---|---|---|---|---|---|
// |Marcus|mal indenté|100|vide|malade
// |Optimus|unsave|200|vide|malade
// |Sangoku|404|80|vide|malade
// |DarthVader|azmatique|110|vide|malade
// |Semicolon|syntaxError|60|vide|malade

// ## Description du doctor
// >Le doctor lui reçoit les patients dans son cabinet. Tout d'abord il les diagnostiques puis se fait payé avant de préscrire un traitement. Attention le doctor fait à chaque fois sortir le patient de son cabinet avant de prendre le suivant. Dans son cabinet il y a son chat de race sphynx pour garder un environemment stérile. Son chat miaule toutes les deux secondes dans la console(bonus). La consultation coûte 50€. Les patients son dans un état de traitement avant de sortir du cabinet.

// |nom|argent|cabinet|diagnostique|patienTIn|patientOut
// |---|---|---|---|---|---|
// |Debugger|0|[chat]

// ### Grille des diagnostiques
// |maladie|traitement|
// |---|---|
// |mal indenté|`ctrl+maj+f`|
// |unsave|`saveOnFocusChange`|
// |404|`CheckLinkRelation`|
// |azmatique|`Ventoline`|
// |syntaxError|`f12+doc`|

// ## La pharmacie
// >Les patients iront par après à la pharmacie et recevront leur traitement s'ils ont assez d'argent. Dans le cas ou ils ont assez d'argent ils seront alors en bonne santé sinon ils seront mort et il faudra alors les pousser dans un cimetière.

// ### Tarif des traitements
// |Traitement|prix|
// |---|---|
// |`ctrl+maj+f`|60€
// |`saveOnFocusChange`|100€
// |`CheckLinkRelation`|35€
// |`Ventoline`|40€
// |`f12+doc`|20€

// # Vérification
// >Grâce à votre débugger suivé à la trace l'évolution de chacun de vos patients. Vérifier bien qu'il quitte à chaque fois la salle d'attente avant d'entrer dans le cabinet et qu'ils sortent bien du cabinet avant de laisser quelqu'un d'autre entré.
// ```


class Patient {
    constructor(name, disease, money, pocket, health) {
    this.name = name;
    this.disease = disease;
    this.money = money;
    this.pocket = pocket;
    this.health = health;
    }

    goTo(place) {
    console.log(`${this.name} il va a ${place}.`);
    }

    takeCare(medication) {
    console.log(`${this.name} prends son ${medication}.`);
    this.health = 'santé';
    }

    pay(amount) {
    console.log(`${this.name} est en train de payer ${amount}€.`);
    this.money -= amount;
    }
}

class Doctor {
    constructor(name, money, cabinet) {
    this.name = name;
    this.money = money;
    this.cabinet = cabinet;
    }

    diagnose(patient) {
    console.log(`Doctor ${this.name} diagnostique ${patient.name}.`);
    patient.health = 'traitement';
    return patient.disease;
    }

    prescribe(patient, traitement) {
    console.log(`Doctor ${this.name} donne la prescription ${traitement} pour ${patient.name}.`);
    patient.traitement = traitement;
    }

    charge(patient) {
    console.log(`Doctor ${this.name} demande à ${patient.name} 50€.`);
    this.money += 50;
    patient.pay(50);
    }
}

class Pharmacy {
    constructor(name, traitement) {
    this.name = name;
    this.traitement = traitement
    }

    sell(patient) {
    const traitement = this.traitement[patient.traitement];
    if (traitement && patient.money >= traitement.price) {
        console.log(`${patient.name} est en train d'acheter ${patient.traitement} a ${this.name} pour ${traitement.price}€.`);
        patient.pocket.push(patient.traitement);
        patient.pay(traitement.price);
    } else {
        console.log(`${patient.name} n'a pas assez d'argent pour le traitement et meurt en direction du cimetière.`);
    }
    }
}

const traitement = {
    'ctrl+maj+f': { price: 60 },
    'saveOnFocusChange': { price: 100 },
    'CheckLinkRelation': { price: 35 },
    'Ventoline': { price: 40 },
    'f12+doc': { price: 20 }
};

const pharmacy = new Pharmacy('Codepital Pharmacy', traitement);
const doctor = new Doctor('Debugger', 0, ['chat']);

const patients = [
    new Patient('Marcus', 'mal indenté', 100, [], 'malade'),
    new Patient('Optimus', 'unsave', 200, [], 'malade'),
    new Patient('Sangoku', '404', 80, [], 'malade'),
    new Patient('DarthVader', 'azmatique', 110, [], 'malade'),
    new Patient('Semicolon', 'syntaxError', 60, [], 'malade'),
]


//TEst du code avec Marcus
// Marcus est diagnostique par le docteur Debugger
doctor.diagnose(patients[0]);

// Le docteur Debugger prescrit un traitement à Marcus
doctor.prescribe(patients[0], 'ctrl+maj+f');

// Le docteur Debugger facture 50€ à Marcus
doctor.charge(patients[0]);

// Marcus se rend à la pharmacie Codepital Pharmacy
patients[0].goTo(pharmacy.name);

// Marcus essaie d'acheter le traitement prescrit à la pharmacie
pharmacy.sell(patients[0]);

// Si Marcus a acheté son traitement et qu'il est maintenant en santé il prend soin de lui en prenant son traitement
if (patients[0].health === 'santé') {
patients[0].takeCare(patients[0].traitement);
}