// CO2 calculation constants
const CO2_PER_KM_MOTORBIKE = 103; // grams of CO2 per kilometer for a motorbike
const TREE_ABSORPTION_RATE = 21.77; // kg of CO2 absorbed by a tree per year
const CAR_EMISSIONS_PER_KM = 0.121; // average car emits 0.121 kg of CO2 per km
const PLASTIC_BAG_CO2 = 0.01; // CO2 generated by producing 1 plastic bag (in kg)

function calculateCO2Equivalents(distance) {
		const totalCO2Saved = (CO2_PER_KM_MOTORBIKE * distance) / 1000; // converting grams to kilograms
		const hoursOfTreeAbsorption = (totalCO2Saved / TREE_ABSORPTION_RATE) * 365 * 24; // convert to hours
		const carEquivalentKm = (totalCO2Saved / CAR_EMISSIONS_PER_KM).toFixed(1); // km of driving equivalent
		const plasticBagsEquivalent = Math.round(totalCO2Saved / PLASTIC_BAG_CO2); // number of plastic bags produced

		return {
				totalCO2Saved,
				hoursOfTreeAbsorption,
				carEquivalentKm,
				plasticBagsEquivalent
		};
}

function updateTreeAbsorptionTime(hours) {
		console.log("Updating tree absorption time:", hours);
		const currentTotal = getTotalTreeAbsorptionTime();
		const newTotal = currentTotal + hours;
		localStorage.setItem('totalTreeAbsorptionTime', newTotal.toString());
		localStorage.setItem('lastUpdateTime', Date.now().toString());
}

function getTotalTreeAbsorptionTime() {
		const total = parseFloat(localStorage.getItem('totalTreeAbsorptionTime') || '0');
		console.log("Getting total tree absorption time:", total);
		return total;
}

function getRemainingTreeAbsorptionTime() {
		const totalTime = getTotalTreeAbsorptionTime();
		const lastUpdate = parseInt(localStorage.getItem('lastUpdateTime') || Date.now());
		const elapsedHours = (Date.now() - lastUpdate) / (1000 * 60 * 60);
		const remaining = Math.max(0, totalTime - elapsedHours);
		console.log("Getting remaining tree absorption time:", remaining);
		return remaining;
}

function resetAbsorptionTime() {
		localStorage.removeItem('totalTreeAbsorptionTime');
		localStorage.removeItem('lastUpdateTime');
		console.log("Absorption time has been reset");
}

// Helper function to convert hours to a more readable format
function formatHours(hours) {
		const days = Math.floor(hours / 24);
		const remainingHours = Math.floor(hours % 24);
		const minutes = Math.floor((hours * 60) % 60);

		let result = '';
		if (days > 0) result += `${days}d `;
		if (remainingHours > 0) result += `${remainingHours}h `;
		if (minutes > 0) result += `${minutes}m`;

		return result.trim() || '0m';
}

export {
		calculateCO2Equivalents,
		updateTreeAbsorptionTime,
		getTotalTreeAbsorptionTime,
		getRemainingTreeAbsorptionTime,
		resetAbsorptionTime,
		formatHours
};