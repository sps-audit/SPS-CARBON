export type DemoView = "overview" | "electricity" | "fuel";
export const months = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
export const electricityKwh = [
  8000, 7500, 10000, 9500, 11000, 10500, 12000, 10500, 10500, 10000, 11000,
  9500,
];
export const fuelLitres = [
  1200, 1000, 1400, 1200, 1300, 1500, 1600, 1400, 1300, 1400, 1400, 1300,
];
// Synthetic factors, deliberately not suitable for an actual Moroccan inventory.
export const illustrativeFactors = { electricity: 0.5, fuel: 2.5 };
export const monthlyTonnes = (view: DemoView) =>
  months.map(
    (_, index) =>
      ((view !== "fuel"
        ? electricityKwh[index] * illustrativeFactors.electricity
        : 0) +
        (view !== "electricity"
          ? fuelLitres[index] * illustrativeFactors.fuel
          : 0)) /
      1000,
  );
export const formatNumber = (number: number, fraction = 1) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: fraction }).format(
    number,
  );
export const viewContent = {
  overview: {
    title: "Votre empreinte, à portée de vue.",
    label: "Total du périmètre illustré",
    unit: "Deux sources renseignées",
    total: 100,
  },
  electricity: {
    title: "L’énergie derrière vos activités.",
    label: "Émissions liées à l’électricité",
    unit: "120 000 kWh renseignés",
    total: 60,
  },
  fuel: {
    title: "Chaque déplacement compte.",
    label: "Émissions liées aux carburants",
    unit: "16 000 litres renseignés",
    total: 40,
  },
};
