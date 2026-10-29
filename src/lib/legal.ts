import { company } from "./company";
import type { EditorialPage } from "./editorial";

const revised = "Dernière révision : 29 octobre 2026.";
const host = "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis";

export const legalPages: EditorialPage[] = [
  {
    slug: "mentions-legales",
    kicker: "Informations légales",
    title: "Identifier l’entreprise derrière SPS-CARBON.",
    description:
      "Les coordonnées de l’éditeur, l’objet du site et les informations utiles concernant ses contenus.",
    sections: [
      {
        id: "version",
        title: "Mise à jour de ces mentions",
        body: [
          `${revised} Ces mentions concernent le site de présentation ${company.brand}. Les informations relatives au représentant de l’éditeur et au capital social sont en cours de complément.`,
          "Les pages juridiques décrivent le périmètre actuellement prévu. Leur présence ne constitue pas une attestation de conformité ni une autorisation délivrée par une autorité.",
        ],
      },
      {
        id: "editeur",
        title: "Éditeur et coordonnées",
        body: [
          `${company.brand} est porté par ${company.name}. ${company.activity}.`,
          "Les informations ci-dessous proviennent du document d’entreprise de SAFEPERFORM SOLUTIONS.",
        ],
        bullets: [
          `Raison sociale : ${company.name}.`,
          `Adresse : ${company.address}.`,
          `Contact : ${company.email}.`,
          `Registre de commerce : ${company.rc}.`,
          `Identifiant commun de l’entreprise : ${company.ice}.`,
          `Identifiant fiscal : ${company.fiscal}.`,
        ],
      },
      {
        id: "hebergement",
        title: "Hébergement du site",
        body: [
          `Le site est hébergé par ${host} (vercel.com). Il est diffusé sous forme de pages statiques, sans base de données ni compte utilisateur.`,
          "L’hébergeur peut conserver des journaux techniques (adresse IP, page demandée, date et heure) nécessaires à la diffusion et à la sécurité du site. La politique de confidentialité en précise le cadre.",
        ],
      },
      {
        id: "objet",
        title: "Objet du site",
        body: [
          "Le site présente l’approche SPS-CARBON, ses parcours d’accompagnement et des ressources pour préparer une démarche carbone. Il permet de préparer une demande de contact et de consulter une démonstration illustrative.",
          "Le site ne permet pas de créer un compte client, de souscrire un abonnement, de commander ou de payer en ligne. Le périmètre, les livrables, les délais et les conditions d’une mission sont à préciser dans une proposition adaptée au besoin exprimé.",
        ],
      },
      {
        id: "contenus",
        title: "Contenus et droits de réutilisation",
        body: [
          "Les textes, visuels, marques et autres éléments du site restent soumis aux droits de leurs titulaires respectifs. Les références à des méthodes ou à des organismes ne constituent pas une affiliation, une certification ou une approbation du projet.",
          "Les ressources proposées au téléchargement sont destinées à faciliter la préparation interne d’un projet. Leur utilisation doit respecter les indications qui les accompagnent et les droits applicables.",
          `Pour signaler une erreur ou demander une autorisation de réutilisation, vous pouvez écrire à ${company.email}.`,
        ],
      },
    ],
  },
  {
    slug: "confidentialite",
    kicker: "Protection des données",
    title: "Comprendre l’utilisation de vos informations.",
    description:
      "Le fonctionnement du contact, les finalités des échanges et les moyens d’exercer vos droits au titre de la loi marocaine n° 09-08.",
    sections: [
      {
        id: "version",
        title: "Le périmètre de cette information",
        body: [
          `${revised} Cette politique concerne le site de présentation ${company.brand}, hébergé par Vercel Inc. aux États-Unis. Les durées de conservation, les mesures opérationnelles et les formalités CNDP applicables sont précisées dans cette page au fur et à mesure de leur accomplissement ; aucun numéro de récépissé ou d’autorisation n’est annoncé sans justificatif.`,
          "Cette page concerne les demandes de contact et la navigation sur le site. Elle ne décrit pas le fonctionnement d’une future plateforme de comptes clients ou de stockage de données carbone.",
        ],
      },
      {
        id: "responsable",
        title: "Votre interlocuteur",
        body: [
          `${company.name} est responsable du traitement des demandes qu’elle reçoit pour ${company.brand}. Vous pouvez lui écrire à ${company.email} ou à l’adresse suivante : ${company.address}.`,
          "Les informations contenues dans une demande servent à comprendre le besoin, à répondre et, si la personne le souhaite, à préparer un échange ou une proposition. Une prise de contact ne constitue pas une inscription à une newsletter.",
        ],
      },
      {
        id: "contact",
        title: "De votre brouillon à l’envoi du courriel",
        body: [
          "Les champs de la page de contact servent à composer un brouillon localement dans votre navigateur. Vous pouvez relire le message avant de choisir « Ouvrir ma messagerie ». Ce lien confie le brouillon à votre application de messagerie ; vous décidez ensuite de l’envoyer. Le site ne l’envoie pas automatiquement et ne peut pas confirmer sa réception.",
          "L’option de copie place le texte dans votre presse-papiers à votre demande. Elle vous permet de le coller dans une messagerie si le lien ne s’ouvre pas. La saisie n’est pas transmise à un formulaire serveur du site.",
          "Lorsque vous envoyez l’e-mail, l’entreprise reçoit votre adresse d’expédition, le contenu et les informations habituelles du message. Cet échange relève alors du fonctionnement des services de messagerie utilisés par vous et par l’entreprise.",
        ],
        bullets: [
          "Les champs nécessaires à la préparation du message sont indiqués dans le parcours ; les autres informations sont facultatives.",
          "Une adresse permettant de vous répondre et une description du besoin sont nécessaires au suivi de votre demande.",
          "Lors du premier contact, privilégiez une présentation générale du besoin et évitez les pièces confidentielles, les données de santé ou les numéros de pièces d’identité.",
        ],
      },
      {
        id: "destinataires",
        title: "Destinataires et services techniques",
        body: [
          "Les demandes sont destinées aux personnes habilitées à y répondre au sein de SAFEPERFORM SOLUTIONS. Les fournisseurs nécessaires à la messagerie et à l’hébergement peuvent également intervenir dans le traitement selon les services retenus.",
          "L’absence de base de données dans le site ne signifie pas l’absence de tout traitement : les courriels reçus et les journaux techniques de l’hébergeur sont aussi concernés. Vercel Inc. étant établie aux États-Unis, ces journaux peuvent être traités hors du Maroc, dans les conditions prévues par la loi n° 09-08 pour les transferts à l’étranger.",
        ],
      },
      {
        id: "conservation",
        title: "Conservation et protection des échanges",
        body: [
          "Le principe retenu est de limiter les informations au besoin exprimé et de les conserver pendant la durée nécessaire au traitement et au suivi de la demande. Si l’échange aboutit à une mission, les informations nécessaires à cette relation relèvent de son cadre contractuel et des obligations applicables.",
          "Les durées et règles de suppression des demandes sans suite, des courriels et des sauvegardes sont en cours de définition, avec les accès autorisés et les mesures de protection. Elles seront reflétées dans cette page et dans les formalités applicables.",
        ],
      },
      {
        id: "droits",
        title: "Exercer vos droits",
        body: [
          "La loi marocaine n° 09-08 prévoit notamment des droits d’accès et de rectification, ainsi qu’un droit d’opposition pour des motifs légitimes. Vous pouvez également vous opposer sans frais à l’utilisation de vos données à des fins de prospection.",
          "Dans les conditions de l’article 8, une demande de rectification peut porter sur l’actualisation, l’effacement ou le verrouillage de données dont le traitement n’est pas conforme. Les rectifications nécessaires doivent être réalisées sans frais dans le délai franc de dix jours prévu par cet article.",
          `Pour exercer vos droits, écrivez à ${company.email} en précisant votre demande et les éléments permettant de retrouver l’échange concerné. Une vérification de votre identité peut être nécessaire pour protéger vos informations. La CNDP présente sur son site officiel les démarches permettant de la saisir.`,
        ],
      },
      {
        id: "evolution",
        title: "Navigation et évolution du service",
        body: [
          "Le site n’intègre pas d’outil publicitaire ni de mesure d’audience. Ses ressources sont disponibles sans inscription. La page Cookies précise le périmètre technique de ce constat.",
          "L’ajout d’un formulaire serveur, de comptes clients, d’imports de fichiers ou de services tiers nécessitera une nouvelle information adaptée aux traitements réels. Les références CNDP correspondantes seront indiquées après accomplissement et vérification des démarches applicables.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    kicker: "Cookies et navigation",
    title: "Une présentation sans traceurs publicitaires.",
    description:
      "Ce que fait le site dans votre navigateur, et ce qu’il ne fait pas.",
    sections: [
      {
        id: "version",
        title: "Ce que le site enregistre",
        body: [
          `${revised} Le code du site n’ajoute ni cookie publicitaire ni outil de mesure d’audience. Ses images, polices et autres ressources visuelles sont servies avec le site, sans appel à un service tiers.`,
          "Votre choix entre la version claire et la version sombre est enregistré dans le stockage local de votre navigateur, sous la clé « sps-theme ». Il ne quitte pas votre appareil et vous pouvez l’effacer depuis les paramètres du navigateur. Les journaux techniques de l’hébergeur sont décrits dans la politique de confidentialité.",
        ],
      },
      {
        id: "fonctionnement",
        title: "Ce qui se passe dans votre navigateur",
        body: [
          "Le code du site n’ajoute pas de cookie publicitaire ou analytique. Les ressources proposées peuvent être téléchargées sans créer de compte ni communiquer une adresse électronique.",
          "Les champs de contact servent à préparer un brouillon dans la page. La copie du message utilise votre presse-papiers à votre demande ; l’ouverture de la messagerie vous laisse décider de l’envoi. Ces actions ne constituent pas un outil de suivi publicitaire.",
        ],
      },
      {
        id: "choix",
        title: "Vos choix si les fonctionnalités évoluent",
        body: [
          "Si des cookies faisant appel à des données personnelles sont ajoutés, leurs finalités et les moyens de s’y opposer devront être précisés. Le choix de l’utilisateur devra être recueilli avant leur dépôt, conformément aux exigences applicables et aux lignes directrices de la CNDP.",
          "Vous pouvez également consulter et supprimer les cookies et données de site depuis les paramètres de votre navigateur. Les réglages disponibles dépendent du logiciel utilisé.",
        ],
      },
      {
        id: "contact",
        title: "Une question sur la navigation ou vos données",
        body: [
          `Vous pouvez écrire à ${company.email}. La politique de confidentialité décrit le traitement des demandes reçues et les moyens d’exercer vos droits.`,
          "Cette page sera mise à jour lorsque l’hébergement ou les fonctionnalités modifient les traitements réellement effectués.",
        ],
      },
    ],
  },
  {
    slug: "conditions-utilisation",
    kicker: "Conditions d’utilisation",
    title: "Le cadre d’utilisation de cette présentation.",
    description:
      "Des repères pour consulter les contenus, utiliser les ressources et comprendre les limites de la démonstration.",
    sections: [
      {
        id: "version",
        title: "Le périmètre de ces conditions",
        body: [
          `${revised} Ces conditions concernent le site ${company.brand}, porté par ${company.name}. Elles évoluent avec les services effectivement proposés.`,
          "La consultation ne crée pas de compte client, d’abonnement ou de commande. Les conditions d’une mission éventuelle sont définies dans les documents contractuels propres à cette mission.",
        ],
      },
      {
        id: "informations",
        title: "Contenus, méthodes et ressources",
        body: [
          "Les contenus visent à faciliter la compréhension et la préparation d’une démarche carbone. Leur utilisation doit tenir compte de votre organisation, de vos données et des exigences applicables à votre situation. Les ressources constituent un point de départ à adapter au périmètre de votre projet.",
          "Une checklist, un exemple ou une description méthodologique ne constitue pas à lui seul un audit, une certification ou une vérification indépendante des émissions. Les caractéristiques et livrables d’un accompagnement doivent être convenus avant son exécution.",
        ],
      },
      {
        id: "demonstration",
        title: "Le statut de la démonstration",
        body: [
          "La démonstration illustre un parcours de travail avec des données et des facteurs d’exemple. Ses résultats ne doivent pas être utilisés pour un inventaire réel, une déclaration réglementaire, une communication environnementale ou une décision reposant sur des émissions vérifiées.",
          "La plateforme est en cours de déploiement : toutes les fonctionnalités présentées en démonstration ne sont pas encore des services ouverts. La démonstration ne doit pas recevoir de documents confidentiels ni de données réelles nécessitant un espace sécurisé.",
        ],
      },
      {
        id: "contact",
        title: "Préparer et envoyer une demande",
        body: [
          "Le parcours de contact vous permet de préparer et de relire un message. Le lien « Ouvrir ma messagerie » ouvre un brouillon dans votre application. Vous pouvez le modifier et décidez de son envoi. Le site ne peut pas confirmer qu’un message a été envoyé ou reçu.",
          `Si votre messagerie ne s’ouvre pas, utilisez la copie du message ou écrivez directement à ${company.email}. Une demande de contact ne vaut pas confirmation de rendez-vous ou acceptation d’une prestation.`,
        ],
      },
      {
        id: "usage",
        title: "Usage responsable et droits sur les contenus",
        body: [
          "L’utilisation du site doit respecter son fonctionnement et les droits d’autrui. Les textes, visuels, marques et ressources demeurent soumis aux droits de leurs titulaires. Les éventuelles conditions de réutilisation précisées sur une ressource doivent être respectées.",
          `Vous pouvez signaler une erreur, une difficulté d’accès ou une question relative aux contenus à ${company.email}.`,
        ],
      },
      {
        id: "disponibilite",
        title: "Disponibilité, évolutions et droit applicable",
        body: [
          "Les contenus peuvent être corrigés ou complétés et des interruptions techniques peuvent survenir. Les informations seront mises à jour pour refléter les évolutions du site. Ces indications ne suppriment aucun droit ni recours prévu par la législation applicable.",
          "L’utilisation du site est régie par le droit marocain, sous réserve des dispositions impératives applicables. En cas de difficulté, vous pouvez contacter l’entreprise afin de rechercher une solution, sans que cette démarche exclue les voies de recours prévues par la loi.",
        ],
      },
    ],
  },
];

export const legalSources: { title: string; url: string }[] = [
  {
    title: "Loi marocaine n° 09-08 — texte officiel",
    url: "https://bdj.mmsp.gov.ma/Fr/Document/8974-Loi-n-09-08-promulgu%C3%A9e-par-le-dahir-n-1-09-15-du.aspx",
  },
  {
    title: "CNDP — lignes directrices pour les sites web",
    url: "https://www.cndp.ma/wp-content/uploads/2023/01/CNDP-guide-conformite-sites-web-fr.pdf",
  },
  {
    title: "CNDP — obligations des responsables de traitement",
    url: "https://www.cndp.ma/conditions/",
  },
  {
    title: "CNDP — transfert de données à l’étranger",
    url: "https://www.cndp.ma/transfert-de-donnees-a-letranger/",
  },
  {
    title: "Loi n° 31-08 — texte publié par l’OMPI",
    url: "https://www.wipo.int/wipolex/fr/legislation/details/19773",
  },
];
