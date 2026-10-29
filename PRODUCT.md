# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

*Déduit du dépôt (recherches, offres, outils) ; l'utilisatrice a délégué cette définition.*

- **Principal :** responsables QHSE / RSE de PME et ETI marocaines, souvent industrielles, qui doivent produire un premier bilan de gaz à effet de serre et le relier aux systèmes de management déjà en place.
- **Décideur :** la direction d'entreprises exportatrices, concernée par le MACF (CBAM) ou par les questionnaires carbone de clients européens, et qui doit choisir à qui confier la mission.
- **Pilotes :** une dizaine d'entreprises invitées à tester la plateforme pendant la phase de développement.

## Product Purpose

SPS-CARBON est la plateforme de comptabilité carbone de SAFEPERFORM SOLUTIONS, cabinet d'audit, de conseil et de formation QHSE et RSE à El Jadida. Elle transforme les données d'activité d'une entreprise (factures, compteurs, véhicules, équipements) en un bilan Scopes 1, 2 et 3 explicable, puis en plan d'action.

Le site de présentation a un seul objectif : faire comprendre pourquoi choisir SPS-CARBON plutôt qu'un autre acteur, et amener les entreprises à travailler avec le cabinet. Le succès se mesure aux demandes de cadrage reçues.

## Positioning

- **Une plateforme adossée à un cabinet d'audit.** L'outil et les auditeurs QHSE/RSE qui accompagnent la mission viennent du même cabinet. Un logiciel seul ne peut pas l'offrir.
- **Intégration aux systèmes ISO.** Le carbone est relié aux démarches ISO 14001, 9001 et 45001 et à la revue de direction, dans le vocabulaire que les responsables QHSE utilisent déjà.
- **Ancrage marocain.** Entreprise basée à El Jadida, réglementation marocaine, et accompagnement MACF pensé pour les exportateurs marocains vers l'Union européenne.

## Operating Context

- Une mission commence par un appel de cadrage. Le prix dépend du nombre de sites, des sources examinées (Scopes 1 et 2 ou chaîne de valeur), de l'état des données et des livrables attendus.
- Les livrables sont un rapport, un plan d'action, une réponse à un client, un dossier technique MACF ou la préparation à une vérification indépendante.
- Les données viennent de factures d'énergie et de carburant, de compteurs et de tableaux internes, souvent réparties entre plusieurs services.

## Capabilities and Constraints

- Offres : Bilan essentiel, Bilan complet et Accompagnement MACF. Options : sites supplémentaires, mise à jour annuelle, atelier plan d'action, formation, préparation à la vérification et lien avec les systèmes ISO.
- **Aucun prix publié :** chaque mission est chiffrée après le cadrage.
- Outils gratuits : calculateur express Scopes 1 et 2 (facteurs sourcés et modifiables) et vérificateur MACF / CBAM.
- Le formulaire de contact prépare un brouillon d'e-mail vers contact@sps-carbon.ma. Il n'y a ni API d'envoi ni backend.
- Espace client : la connexion et l'inscription existent, mais l'accès se fait sur invitation pendant le pilote. Aucune application n'est encore ouverte.
- Terminologie : français d'abord ; « MACF » (avec CBAM entre parenthèses si utile), Scopes 1/2/3, GHG Protocol, ISO 14064-1. Ne pas présenter la méthode comme « Bilan Carbone® » (marque de l'ABC).
- Pages légales : hébergeur, prestataire e-mail, lieux de traitement, durées de conservation et formalités CNDP restent à finaliser.
- **Indécis :** premier secteur cible et méthode de vérification finale.

## Brand Commitments

- Nom : SPS-CARBON, marque de SAFEPERFORM SOLUTIONS SARL AU (El Jadida).
- Logo 2026 (hexagone adouci), kit complet dans `public/brand/`, règles dans `docs/brand/brand-guidelines.md`. L'utilisatrice préfère des angles doux et arrondis plutôt que vifs.
- Un design propre à SPS-CARBON, jamais un modèle générique.
- Ton : expert, concret et honnête sur ce qui est mesuré et ce qui ne l'est pas.

## Evidence on Hand

- Identité légale (RC, ICE, IF, adresse) dans `src/lib/company.ts`.
- Kit logo et charte : `public/brand/`, `docs/brand/`.
- Recherches métier et concurrence : `docs/research/` (domaine carbone, cadre légal marocain, Greenly, SustainCarbon).
- Données du littoral (Natural Earth, domaine public) : `public/data/SOURCES.md`.
- **Absences à ne jamais combler par de l'invention :** aucun client, témoignage, étude de cas, logo partenaire, émission vérifiée, certification, prix ni chiffre d'impact réel. Les chiffres d'aperçu et les facteurs de démonstration sont fictifs et doivent rester signalés comme tels.

## Product Principles

1. Répondre à « pourquoi SPS-CARBON ? » : la plateforme et les auditeurs du même cabinet, au Maroc.
2. Parler le langage des systèmes de management que le responsable QHSE connaît déjà.
3. Chaque chiffre est explicable et chaque manque est visible. Un rapport peut être reproduit à partir de sa version d'origine.
4. Ne rien affirmer que le cabinet ne peut pas prouver aujourd'hui.
5. Le site conduit vers une conversation de cadrage, pas vers un achat en ligne.
