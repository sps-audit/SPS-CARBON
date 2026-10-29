# A faire plus tard (mis de cote le 29 octobre 2026)

Formulaire de contact et acces pilote : le code est pret, il manque des informations.

1. Cle d'envoi Web3Forms : aller sur web3forms.com, saisir contact@sps-carbon.ma,
   recevoir la cle par e-mail, la placer dans `formKey` (src/lib/company.ts).
2. Lien de prise de rendez-vous (Calendly, Cal.com ou Google Agenda), facultatif :
   le placer dans `bookingUrl` (src/lib/company.ts).
3. Confirmer que l'acces a la plateforme se fait bien sur invitation, entreprise
   par entreprise (formulation "Programme pilote 2026, acces sur invitation").
4. CNDP : couvrir la collecte des demandes via un service d'envoi externe.
5. Mentions legales : capital social, representant legal, references CNDP.
6. Espace client : quand l'application de la plateforme sera en ligne, placer son
   adresse dans `appUrl` (src/lib/company.ts). La page /connexion y enverra les
   utilisateurs ; d'ici la, elle explique l'acces sur invitation.
