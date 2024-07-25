const CuisinesList = [
	"Italian",
	"Chinese",
	"Mexican",
	"Indian",
	"Japanese",
	"Thai",
	"French",
	"Greek",
	"Spanish",
	"Korean",
	"Vietnamese",
	"Turkish",
	"Lebanese",
	"Moroccan",
	"Brazilian",
	"American",
	"Ethiopian",
	"German",
	"Argentinian",
	"Russian",
	"Caribbean",
];

export const Cuisines = CuisinesList.map((cuisine, i) => ({
	id: i,
	name: cuisine,
	selected: false,
}));

export const ACTIVE_COLOR = "#EF8E52";
export const INACTIVE_COLOR = "#B3B1B4";
