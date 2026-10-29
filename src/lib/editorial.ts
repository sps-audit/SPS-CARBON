export type EditorialPage = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    body: string[];
    bullets?: string[];
  }[];
};

export const editorialPages: EditorialPage[] = [
  {
    slug: "plateforme",
    kicker: "La plateforme SPS-CARBON",
    title: "De la donnée de terrain à une décision éclairée.",
    description:
      "SPS-CARBON relie la collecte, la méthode et le pilotage carbone dans un même espace, avec l’appui de SAFEPERFORM SOLUTIONS. Chaque résultat reste compréhensible, traçable et utile à l’entreprise.",
    sections: [
      {
        id: "vision",
        title: "Un fil conducteur pour votre démarche carbone",
        body: [
          "Les informations nécessaires à un inventaire existent souvent déjà : factures, relevés de compteurs, achats de carburant, registres de production ou données de transport. Leur dispersion, leurs unités et leurs périodes rendent leur exploitation difficile. SPS-CARBON est conçu pour organiser ce travail autour d’un périmètre explicite et d’une méthode partagée.",
          "La démonstration de cette page suit un parcours consacré à l’électricité et au carburant, avec des données et des facteurs d’exemple. Les missions menées avec nos consultants appliquent dès aujourd’hui la même méthode ; les espaces clients de la plateforme ouvrent progressivement.",
        ],
        bullets: [
          "Une lecture simple pour la direction, avec le détail nécessaire à la revue technique.",
          "Un lien entre les opérations quotidiennes, les résultats carbone et les décisions de réduction.",
          "Une progression adaptée à la maturité et aux moyens de l’entreprise.",
        ],
      },
      {
        id: "collecte",
        title: "Rassembler les données sans perdre leur contexte",
        body: [
          "Tout commence par l’entreprise, ses sites et la période étudiée. La liste de collecte guide ensuite chaque contributeur : quelle information transmettre, dans quelle unité, pour quel équipement ou site et avec quel justificatif. La donnée garde ainsi son sens jusqu’au rapport.",
          "La saisie et les tableaux importés restent rattachés aux documents d’origine. Une facture d’électricité apporte une consommation et une période ; un relevé de carburant précise le combustible, la quantité et l’usage. Un montant comptable seul ne remplace pas ces informations physiques.",
        ],
        bullets: [
          "Identifier les sources applicables avant de demander des documents.",
          "Suivre les périodes reçues, les pièces manquantes et les responsables de collecte.",
          "Relier chaque donnée à un site, une activité et une preuve identifiable.",
        ],
      },
      {
        id: "revue",
        title: "Faire de la qualité des données une étape visible",
        body: [
          "Un résultat fiable commence avant le calcul. La revue repère les unités incompatibles, les périodes qui se chevauchent, les doublons et les consommations inhabituelles. Chaque alerte conduit à une vérification et à une décision expliquée.",
          "Chaque donnée porte un statut : renseignée, estimée, manquante ou exclue avec justification. Un mois absent ne devient pas une consommation nulle. De même, une hausse liée à une nouvelle ligne de production peut être légitime : le contexte opérationnel reste indispensable.",
        ],
        bullets: [
          "Documenter les corrections et conserver la raison de chaque choix.",
          "Distinguer l’avancement de la collecte de la couverture réelle des émissions.",
          "Prévoir une validation humaine avant l’émission d’un rapport.",
        ],
      },
      {
        id: "tracabilite",
        title: "Pouvoir expliquer le chemin de chaque chiffre",
        body: [
          "Chaque chiffre relie une quantité d’activité, une conversion d’unité, un facteur d’émission, sa référence et le résultat. Le facteur est adapté à l’activité, au territoire, à la période et aux émissions couvertes. Son nom seul ne suffit pas : sa source, sa version et ses limites restent accessibles.",
          "Les rapports sont versionnés. Une correction produit une nouvelle version et explique l’écart, tout en préservant les hypothèses du document antérieur. Cette continuité permet de comprendre une évolution et de préparer une revue ultérieure.",
        ],
        bullets: [
          "Conserver les hypothèses, exclusions et règles de conversion.",
          "Séparer les facteurs de démonstration des références retenues pour une mission réelle.",
          "Rendre les données et les calculs examinables sans présenter cette capacité comme une certification.",
        ],
      },
      {
        id: "pilotage",
        title: "Passer du tableau de résultats au plan d’action",
        body: [
          "Le tableau de bord fait apparaître les principaux postes, leur répartition par site et les éléments qui expliquent leur évolution. La direction et les équipes opérationnelles disposent d’une base commune pour choisir les investigations et les actions prioritaires.",
          "Chaque action a un responsable, une échéance, une hypothèse de réduction et un indicateur de réalisation. Les scénarios restent séparés des émissions constatées : une économie simulée n’est acquise qu’une fois l’action mise en œuvre et son effet évalué.",
        ],
        bullets: [
          "Lire ensemble émissions absolues, niveau d’activité et indicateurs d’intensité pertinents.",
          "Évaluer les actions selon leur faisabilité, leur effort et leur potentiel estimé.",
          "Préparer la campagne suivante en capitalisant sur les données et les décisions documentées.",
        ],
      },
      {
        id: "trajectoire",
        title: "Un socle solide, puis des extensions",
        body: [
          "La démonstration porte sur les consommations d’électricité et de carburant. Ce périmètre ne représente pas à lui seul la totalité des Scopes 1 et 2 d’une entreprise, qui peut aussi émettre par ses procédés ou ses fluides frigorigènes : la méthode les examine dès le cadrage.",
          "Chaque extension se construit à partir de cas métiers et de règles validées. Les catégories du Scope 3, la préparation des données MACF et les empreintes de produits répondent à des besoins distincts ; chacun a son propre cadrage.",
        ],
        bullets: [
          "Démonstration : données d’exemple d’électricité et de carburant.",
          "Socle : collecte, pièces justificatives, revue, calculs documentés et rapports versionnés.",
          "Extensions : catégories prioritaires du Scope 3, suivi des actions et parcours MACF.",
        ],
      },
    ],
  },
  {
    slug: "solutions",
    kicker: "Solutions & accompagnement",
    title: "Le bon périmètre pour le bon besoin.",
    description:
      "Premier inventaire, chaîne de valeur ou demande d’un client européen : chaque objectif appelle des données, une méthode et des livrables précis. Les parcours SPS-CARBON se construisent à partir de cette réalité.",
    sections: [
      {
        id: "inventaire-essentiel",
        title: "Inventaire essentiel · poser une base opérationnelle",
        body: [
          "Ce parcours vise les entreprises qui souhaitent comprendre leurs émissions directes et celles de l’énergie achetée. Le cadrage commence par les sites, les équipements, les usages de l’énergie et la période de référence. Il permet de repérer les sources à traiter et les informations disponibles.",
          "L’électricité et les combustibles constituent souvent un point de départ pratique. Les procédés industriels, les fuites de fluides frigorigènes et les autres énergies achetées doivent néanmoins être examinés lorsqu’ils concernent l’activité. Leur absence de la première collecte ne justifie pas de les considérer comme nuls.",
        ],
        bullets: [
          "Objectif : établir une première lecture des postes retenus dans les Scope 1 et 2.",
          "Données à préparer : consommations, factures, équipements, véhicules et informations d’exploitation.",
          "Livrables à convenir : périmètre, inventaire chiffré, dossier d’hypothèses et restitution des priorités.",
          "Adapté à un premier exercice ou à une entreprise souhaitant fiabiliser sa base de données énergie.",
        ],
      },
      {
        id: "chaine-de-valeur",
        title: "Chaîne de valeur · élargir la lecture au Scope 3",
        body: [
          "Les achats, le transport, les déchets ou l’usage des produits peuvent représenter des enjeux majeurs au-delà des opérations directes. Ce parcours propose d’abord un examen des catégories pertinentes de la chaîne de valeur, puis un choix argumenté des priorités de collecte et de calcul.",
          "La mission est définie catégorie par catégorie. La disponibilité des données, les attentes du destinataire et les limites des estimations déterminent la méthode. Un inventaire couvrant quelques catégories prioritaires est présenté comme tel, avec une liste claire des éléments traités et des exclusions.",
        ],
        bullets: [
          "Objectif : identifier les postes significatifs et les possibilités de dialogue avec les fournisseurs.",
          "Données possibles : quantités achetées, caractéristiques des matériaux, trajets, tonnages et traitements des déchets.",
          "Livrables à convenir : cartographie des catégories, résultats détaillés et plan d’amélioration des données.",
          "Périmètre de mission confirmé lors du cadrage, catégorie par catégorie.",
        ],
      },
      {
        id: "cbam",
        title: "MACF / CBAM · préparer les données industrielles pertinentes",
        body: [
          "Une demande CBAM exige un examen spécifique des marchandises, de leur classification, des installations et des procédés concernés. L’analyse commence par la demande du client européen et les règles applicables au produit et à la période. Le fait d’exporter vers l’Union européenne ne suffit pas à déterminer le périmètre.",
          "L’accompagnement porte sur la préparation et l’organisation des informations industrielles nécessaires : quantités produites, consommations, intrants, limites des procédés et règles d’allocation. Un inventaire général d’entreprise ne remplace pas ce travail. La déclaration réglementaire et les éventuelles exigences de vérification doivent être traitées avec les parties compétentes.",
        ],
        bullets: [
          "Étape préalable : examiner la marchandise, la demande reçue et les responsabilités de chaque intervenant.",
          "Objectif : préparer un dossier technique cohérent pour le dialogue avec le client européen.",
          "Livrables et limites : à fixer après étude du cas, des données et des exigences applicables.",
          "Un parcours spécialisé, distinct de l’inventaire de l’organisation.",
        ],
      },
      {
        id: "entreprises",
        title: "Des besoins différents selon votre activité",
        body: [
          "Une PME de services, un site industriel et un transporteur ne collectent pas les mêmes données. La démarche doit partir du fonctionnement réel de l’entreprise : qui détient les pièces, quels systèmes existent déjà, quels sites participent et quelles décisions sont attendues à l’issue de l’exercice.",
          "Les interlocuteurs peuvent être la direction, les fonctions QHSE ou RSE, la finance, les achats et les opérations. Il n’est pas nécessaire de disposer dès le départ d’un service carbone dédié ; une répartition claire des responsabilités aide à construire la collecte.",
        ],
        bullets: [
          "Industrie et agroalimentaire : énergie, procédés, réfrigération, matières et production.",
          "Transport et logistique : carburants, flotte, distances, sous-traitance et volumes transportés.",
          "Services et organisations multisites : bâtiments, achats, déplacements et coordination des contributeurs.",
          "Fournisseurs et exportateurs : demandes de données des donneurs d’ordre et périmètres spécifiques aux produits.",
        ],
      },
      {
        id: "livrables",
        title: "Des livrables pensés pour être utilisés",
        body: [
          "Le résultat attendu dépasse un total d’émissions. La restitution doit permettre de comprendre ce qui a été étudié, d’identifier les postes les plus importants et de retrouver les éléments qui expliquent un chiffre. Le contenu exact du dossier est défini dans le cadrage de la mission.",
          "Une synthèse pour la direction et une annexe méthodologique répondent à des usages complémentaires. La première aide à décider ; la seconde décrit les données, les facteurs, les estimations et les limites. Une séance de restitution permet de traduire les constats en prochaines étapes réalistes.",
        ],
        bullets: [
          "Une synthèse des résultats par poste et, lorsque le périmètre le prévoit, par site.",
          "Un dossier de méthode et de références avec les hypothèses et exclusions explicites.",
          "Une liste des données à améliorer pour le prochain exercice.",
          "Des pistes d’action hiérarchisées, à évaluer avec les équipes concernées.",
        ],
      },
      {
        id: "cadrage",
        title: "Une mission définie avant tout engagement",
        body: [
          "Le premier échange sert à préciser l’objectif : pilotage interne, première mesure, réponse à un questionnaire client ou besoin technique particulier. Il permet aussi d’apprécier la taille du périmètre et la disponibilité des informations. Cette étape évite de demander trop de données ou de produire un rapport inadapté à son destinataire.",
          "Le périmètre, les livrables, les responsabilités, le calendrier et le devis sont établis en fonction du besoin réel. Le nombre de sites, la diversité des activités, les catégories retenues et la qualité des données influencent l’effort nécessaire. Aucun délai ni prix standard ne se substitue à ce cadrage.",
        ],
        bullets: [
          "Présenter l’activité, les sites et la raison de la démarche.",
          "Préciser l’année étudiée, le destinataire des résultats et les éventuelles échéances.",
          "Identifier un référent interne et les premières données disponibles.",
          "Valider un périmètre et des livrables sur devis avant le démarrage.",
        ],
      },
    ],
  },
  {
    slug: "methodologie",
    kicker: "Méthode & traçabilité",
    title: "Un résultat solide se construit à chaque étape.",
    description:
      "Définir, collecter, contrôler, calculer et interpréter : la méthode proposée par SPS-CARBON relie les données d’activité à une lecture documentée des émissions et des leviers d’action.",
    sections: [
      {
        id: "perimetre",
        title: "01 · Définir ce que l’on mesure",
        body: [
          "Un inventaire commence par une question précise et des limites cohérentes. Il faut identifier l’organisation, les entités et sites concernés, la période de référence ainsi que l’approche de consolidation. La propriété d’un équipement, son exploitation et le contrôle exercé peuvent influencer son traitement.",
          "Le cadrage recense ensuite les sources applicables et les attentes du destinataire. Cette étape distingue l’inventaire d’une organisation, l’empreinte d’un produit et un dossier réglementaire spécifique. Leurs objectifs et leurs règles ne sont pas interchangeables.",
        ],
        bullets: [
          "Documenter les frontières organisationnelles et opérationnelles.",
          "Choisir la période et identifier les changements importants d’activité.",
          "Lister les sources retenues, les exclusions et leur justification.",
        ],
      },
      {
        id: "sources",
        title: "02 · Identifier les sources avant de collecter",
        body: [
          "Le Scope 1 couvre les émissions directes de sources détenues ou contrôlées, comme la combustion, certains procédés et les fuites de fluides frigorigènes. Le Scope 2 porte sur les émissions liées à la production d’énergie achetée et consommée, notamment l’électricité, la chaleur, la vapeur ou le froid.",
          "Le Scope 3 concerne les autres émissions de la chaîne de valeur en amont et en aval. Le cadre du GHG Protocol distingue quinze catégories. Leur pertinence dépend de l’activité ; l’examen doit aller au-delà des seules données faciles à obtenir.",
        ],
        bullets: [
          "Interroger les usages réels : équipements, véhicules, achats, logistique, produits et services.",
          "Distinguer une source non applicable d’une source applicable dont les données manquent.",
          "Ne pas qualifier un inventaire de complet sur la seule base des factures d’énergie reçues.",
        ],
      },
      {
        id: "qualite",
        title: "03 · Vérifier la qualité et la couverture des données",
        body: [
          "Chaque donnée doit pouvoir être rattachée à une activité, une unité, un lieu et une période. La revue examine les pièces disponibles, les mois absents, les doublons et les éventuels chevauchements. Les données consolidées doivent rester reliées aux éléments qui permettent de les expliquer.",
          "Les estimations peuvent être utiles lorsque l’information manque, à condition d’indiquer leur méthode et leurs limites. Une note de qualité renseigne sur les données ; elle ne constitue pas automatiquement une mesure statistique de confiance. Les incertitudes se traitent selon une méthode explicite.",
        ],
        bullets: [
          "Contrôler les unités et les ordres de grandeur avec les équipes opérationnelles.",
          "Traiter les régularisations de factures sans compter deux fois le même volume.",
          "Signaler les données estimées et établir un plan de remplacement par des informations mieux adaptées.",
        ],
      },
      {
        id: "calcul",
        title: "04 · Choisir les facteurs et documenter le calcul",
        body: [
          "Le calcul courant associe une quantité d’activité à un facteur d’émission compatible. La quantité et le facteur doivent partager des unités cohérentes. Le résultat peut ensuite être exprimé en tonnes d’équivalent CO₂, une unité qui permet de représenter l’effet de différents gaz à effet de serre.",
          "Le choix du facteur tient compte de sa source, de sa version, de sa représentativité géographique et temporelle ainsi que des opérations couvertes. Un facteur de combustion et un facteur couvrant un cycle de vie plus large ne répondent pas au même besoin. Les conversions et les hypothèses doivent être conservées.",
        ],
        bullets: [
          "Vérifier la correspondance entre le combustible, l’énergie ou le matériau et le facteur retenu.",
          "Documenter les références, les années de données et les limites d’utilisation.",
          "Éviter les doubles comptes entre postes et ne pas convertir deux fois un facteur déjà exprimé en CO₂e.",
        ],
      },
      {
        id: "rapport",
        title: "05 · Restituer avec les bonnes clés de lecture",
        body: [
          "Le rapport doit présenter les résultats avec leur périmètre, leurs sources de données, leurs hypothèses et leurs limites. Les chiffres estimés, les données absentes et les exclusions restent visibles. Cette transparence permet au lecteur de comprendre la portée des conclusions et les améliorations à engager.",
          "Les principes du GHG Protocol et les exigences pertinentes d’ISO 14064-1 peuvent guider le cadrage méthodologique retenu. Leur mention ne vaut ni certification de la plateforme ni vérification indépendante du rapport. Une telle vérification relève d’une mission distincte et d’un intervenant compétent.",
        ],
        bullets: [
          "Présenter les résultats par source et par site selon les objectifs convenus.",
          "Associer une synthèse de décision à des annexes permettant la revue des calculs.",
          "Identifier la version du rapport et expliquer toute correction ultérieure.",
        ],
      },
      {
        id: "amelioration",
        title: "06 · Organiser la réduction et préparer la suite",
        body: [
          "Les résultats servent à cibler les investigations : consommation d’un équipement, organisation des déplacements, choix des matières ou qualité des données fournisseurs. Les pistes retenues doivent être confrontées aux contraintes techniques, au budget et aux responsabilités de l’entreprise.",
          "La comparaison dans le temps demande des périmètres et méthodes cohérents. Une baisse des émissions par unité produite peut coexister avec une hausse du total. Les variations d’activité, les changements de méthode et les modifications de périmètre doivent donc accompagner la lecture des indicateurs.",
        ],
        bullets: [
          "Associer à chaque action un responsable, une échéance et un indicateur vérifiable.",
          "Séparer les réductions envisagées des résultats effectivement observés.",
          "Définir les améliorations de collecte et la politique de révision de l’année de référence.",
        ],
      },
    ],
  },
  {
    slug: "cabinet",
    kicker: "Le cabinet",
    title: "La démarche carbone, ancrée dans le management de l’entreprise.",
    description:
      "SPS-CARBON est porté par SAFEPERFORM SOLUTIONS SARL AU, cabinet d’audit, de conseil et de formation en management QHSE et RSE, basé à El Jadida.",
    sections: [
      {
        id: "identite",
        title: "SAFEPERFORM SOLUTIONS, à l’origine du projet",
        body: [
          "SAFEPERFORM SOLUTIONS SARL AU inscrit son activité dans l’audit, le conseil et la formation. Ses domaines d’intervention concernent le management QHSE — qualité, hygiène, sécurité et environnement — ainsi que la responsabilité sociétale des entreprises.",
          "SPS-CARBON porte cette volonté dans le champ des émissions de gaz à effet de serre : donner aux entreprises une démarche structurée pour rassembler leurs informations, comprendre leurs résultats et préparer leurs décisions. Le projet associe une approche de conseil à la conception d’un outil numérique.",
        ],
        bullets: [
          "Raison sociale : SAFEPERFORM SOLUTIONS SARL AU.",
          "Implantation : El Jadida, Maroc.",
          "Activités : audit, conseil et formation en management QHSE et RSE.",
        ],
      },
      {
        id: "conviction",
        title: "Une information environnementale qui aide à agir",
        body: [
          "Notre conviction est qu’une donnée environnementale prend sa valeur lorsqu’elle peut être comprise par ceux qui décident et par ceux qui agissent sur le terrain. Une démarche carbone doit relier la comptabilité, la maintenance, les achats et les opérations autour d’informations cohérentes.",
          "L’ambition de SPS-CARBON est de rendre ce lien plus simple. Les indicateurs doivent aider à poser les bonnes questions : quels postes expliquent le résultat, quelles données restent fragiles, quelles actions méritent une étude et comment suivre les progrès dans le temps.",
        ],
        bullets: [
          "Rendre les résultats lisibles sans effacer leurs limites.",
          "Rapprocher la donnée, la preuve et la décision.",
          "Installer une démarche d’amélioration qui puisse se poursuivre d’un exercice à l’autre.",
        ],
      },
      {
        id: "qhse-rse",
        title: "Relier le carbone aux pratiques QHSE et RSE",
        body: [
          "Le management QHSE apporte des réflexes utiles à un inventaire : définir les responsabilités, maîtriser les documents, examiner les écarts et suivre les actions. Le carbone trouve sa place dans cette organisation lorsqu’il s’appuie sur les données et les processus déjà présents dans l’entreprise.",
          "La RSE élargit cette lecture aux relations avec les fournisseurs, les clients et les autres parties prenantes. L’enjeu est de construire des informations compréhensibles et proportionnées aux demandes, tout en gardant une distinction claire entre objectifs annoncés, actions engagées et résultats démontrés.",
        ],
        bullets: [
          "Utiliser les circuits existants de validation et de conservation documentaire.",
          "Articuler les actions carbone avec les objectifs environnementaux et opérationnels.",
          "Préparer une communication étayée par un périmètre et des éléments vérifiables.",
        ],
      },
      {
        id: "collaboration",
        title: "Un travail organisé avec vos équipes",
        body: [
          "Notre fonctionnement repose sur une répartition explicite des rôles. L’entreprise apporte la connaissance de son activité et les données disponibles. Le cadrage méthodologique, la revue des informations et la restitution sont attribués à des intervenants identifiés dans chaque mission.",
          "La formation et l’explication occupent une place importante dans cette approche. Comprendre pourquoi une unité, une période ou un justificatif est nécessaire permet d’améliorer la collecte et de rendre les prochains exercices plus efficaces.",
        ],
        bullets: [
          "Direction : préciser les objectifs et arbitrer les priorités.",
          "Référent interne : coordonner les contributeurs et centraliser les questions.",
          "Finance, achats et opérations : fournir et expliquer les données de leur périmètre.",
          "Intervenants de la mission : appliquer la méthode convenue et expliciter les résultats.",
        ],
      },
      {
        id: "engagements",
        title: "La transparence comme principe de conception",
        body: [
          "Nous voulons que chaque résultat puisse être accompagné de ses éléments d’explication. Cela implique de montrer les données manquantes, de justifier les estimations et de distinguer une fonctionnalité visible en démonstration d’une capacité opérationnelle mise à disposition.",
          "La même exigence s’applique aux engagements présentés : le périmètre d’une mission, ses livrables et ses conditions doivent être explicites. Une méthode documentée aide à préparer une revue, mais ne vaut pas à elle seule reconnaissance, certification ou vérification indépendante.",
        ],
        bullets: [
          "Décrire clairement ce qui est couvert et ce qui reste à traiter.",
          "Préserver la distinction entre donnée réelle, estimation et démonstration.",
          "Expliquer les décisions méthodologiques et les changements de version.",
        ],
      },
      {
        id: "ancrage",
        title: "Un projet pensé depuis le contexte marocain",
        body: [
          "Depuis El Jadida, le projet SPS-CARBON se construit autour des réalités de collecte des entreprises marocaines : factures de différents fournisseurs, sites aux pratiques variées, consommations en unités physiques et données dispersées entre plusieurs fonctions.",
          "Cette attention au contexte local doit s’accompagner d’une sélection rigoureuse des références de calcul. Un facteur n’est pas adapté au Maroc du seul fait qu’il figure dans une base reconnue. Sa période, sa couverture et sa pertinence pour l’activité doivent être examinées et documentées.",
        ],
        bullets: [
          "Partir des documents et des pratiques réellement disponibles dans l’entreprise.",
          "Privilégier des explications concrètes pour faciliter la participation des équipes.",
          "Construire progressivement les parcours spécialisés à partir de besoins identifiés.",
        ],
      },
    ],
  },
  {
    slug: "ressources",
    kicker: "Repères & ressources pratiques",
    title: "Comprendre la démarche. Préparer les bonnes données.",
    description:
      "Des repères pour lancer un premier inventaire, organiser la collecte et lire un rapport carbone. Un point de départ pratique pour la direction et les équipes qui contribuent à la démarche.",
    sections: [
      {
        id: "premier-inventaire",
        title: "Avant le premier inventaire : cinq décisions utiles",
        body: [
          "Le point de départ est le besoin auquel le résultat doit répondre. Une demande de client, un objectif interne de réduction et un dossier concernant un produit ne conduisent pas nécessairement au même travail. Conserver la demande d’origine aide à préciser le livrable attendu.",
          "Une première collecte devient plus efficace quand la période, les sites et les personnes responsables sont identifiés. Il est préférable de signaler une information indisponible dès le départ plutôt que de remplir une case avec une valeur sans justification.",
        ],
        bullets: [
          "Définir l’objectif et le destinataire des résultats.",
          "Choisir la période étudiée et lister les sites concernés.",
          "Identifier un référent et les contributeurs qui détiennent les données.",
          "Recenser les sources d’émission potentielles, y compris celles encore mal connues.",
          "Préparer un espace de classement par site, période et type de donnée.",
        ],
      },
      {
        id: "scopes",
        title: "Scope 1, 2 et 3 : des frontières pour comprendre",
        body: [
          "Les scopes classent les émissions selon leur relation avec l’organisation. Le Scope 1 concerne les sources directes détenues ou contrôlées. Le Scope 2 concerne la production de l’énergie achetée et consommée. Le Scope 3 rassemble les autres émissions de la chaîne de valeur en amont et en aval.",
          "La bonne catégorie dépend du périmètre retenu et de la réalité de l’activité. Un véhicule utilisé par l’entreprise ou un transport acheté à un prestataire ne se classe pas automatiquement de la même manière. La question du contrôle et la nature du service doivent être examinées.",
        ],
        bullets: [
          "Scope 1 : par exemple, combustion dans des équipements contrôlés et fuites de fluides frigorigènes.",
          "Scope 2 : par exemple, électricité ou chaleur achetée et consommée sur les sites.",
          "Scope 3 : par exemple, achats de matières, transport externe, déchets et déplacements professionnels.",
          "Un total doit toujours indiquer les sources couvertes, la période et les exclusions.",
        ],
      },
      {
        id: "electricite",
        title: "Lire les données d’électricité avant de les additionner",
        body: [
          "Pour l’électricité, relever les kilowattheures, le site, le compteur ou point de livraison et les dates de consommation. Le montant en dirhams, la puissance souscrite et les taxes ne sont pas des quantités d’énergie. Le fournisseur et le type de lecture peuvent aussi être utiles à la revue.",
          "Les factures estimatives et les régularisations demandent une attention particulière : une lecture réelle peut couvrir une période déjà partiellement estimée. Additionner toutes les lignes sans vérifier leur relation peut compter deux fois une consommation. Le détail du document doit permettre de comprendre la correction retenue.",
        ],
        bullets: [
          "Vérifier que l’ensemble de la période est couvert, sans trou ni chevauchement.",
          "Conserver les factures d’origine et identifier les avoirs ou régularisations.",
          "Documenter le facteur retenu, sa période et son adéquation au réseau ou à la méthode applicable.",
        ],
      },
      {
        id: "combustibles",
        title: "Carburants et combustibles : préciser quantité et usage",
        body: [
          "Un relevé utile précise le type de combustible, la quantité et l’unité, la période, le site et l’usage : véhicule, chaudière, groupe électrogène ou procédé. Les achats ne correspondent pas toujours exactement à la consommation de la période lorsque des stocks sont présents.",
          "Les litres, les mètres cubes, les kilogrammes et les unités d’énergie ne sont pas interchangeables. Une conversion peut demander une densité ou un pouvoir calorifique documenté. Le facteur choisi doit ensuite correspondre à l’activité et aux émissions que le calcul cherche à couvrir.",
        ],
        bullets: [
          "Rapprocher factures, cartes carburant, relevés internes et mouvements de stock lorsque nécessaire.",
          "Identifier les équipements et éviter de mélanger plusieurs combustibles sous une même ligne.",
          "Signaler les changements de parc ou d’activité qui expliquent une variation importante.",
        ],
      },
      {
        id: "lire-un-rapport",
        title: "Lire un rapport au-delà du total en tCO₂e",
        body: [
          "La tonne d’équivalent CO₂ permet de présenter l’effet de différents gaz à effet de serre dans une unité commune. Pour interpréter un total, il faut connaître son périmètre, sa période, les sources incluses et la place des estimations. Deux totaux ne sont comparables que si leurs différences méthodologiques sont comprises.",
          "Les principaux postes orientent l’analyse, mais la qualité des données et les contraintes opérationnelles orientent aussi l’action. Un rapport utile explicite les limites et propose les prochains points à approfondir. Le caractère vérifiable d’un dossier ne signifie pas qu’une vérification indépendante a déjà eu lieu.",
        ],
        bullets: [
          "Vérifier les sites, les scopes et les catégories effectivement étudiés.",
          "Repérer les exclusions, les données manquantes et les estimations.",
          "Lire les émissions absolues avec les indicateurs d’activité ou d’intensité.",
          "Retrouver la méthode, les facteurs, la version du rapport et le statut de revue.",
        ],
      },
      {
        id: "checklist",
        title: "La check-list de préparation à partager en interne",
        body: [
          "Cette liste aide à préparer un premier échange et à repérer les informations déjà disponibles. Elle doit être ajustée au périmètre de la mission. Il n’est pas nécessaire de transmettre tous les documents dès le premier contact : commencer par leur disponibilité et leurs détenteurs suffit à organiser le cadrage.",
          "Pour chaque ensemble de données, noter le site, la période couverte, l’unité, la source et la personne à contacter. Ajouter les questions non résolues dans une colonne dédiée. Cette préparation facilite l’attribution des tâches et fait apparaître les points à clarifier avant le calcul.",
        ],
        bullets: [
          "Entreprise : activités, liste des sites et changements de périmètre pendant la période.",
          "Énergie : factures d’électricité, autres énergies achetées et relevés de compteurs.",
          "Combustibles : achats, consommations, stocks et répartition par usage.",
          "Autres sources directes : procédés, équipements de froid et registres de maintenance pertinents.",
          "Chaîne de valeur, selon le périmètre : achats, transport, déchets et déplacements.",
          "Pilotage : volumes d’activité, données de production et actions déjà envisagées.",
          "Demande externe : questionnaire client, cahier des charges ou besoin lié à une marchandise précise.",
        ],
      },
    ],
  },
];
