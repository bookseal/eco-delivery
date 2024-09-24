import { calculateCO2Equivalents } from './co2Calculations.js';

function setVariables() {
		const distance = parseFloat(document.getElementById('distance').value);
		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = ''; // Clear previous results
		return { distance, resultDiv };
}

function suggestFoods(caloriesBurned) {
		return foodOptions.filter(food => food.calories <= caloriesBurned)
				.sort((a, b) => b.calories - a.calories);
}

function calculateTreesPlanted(co2Saved) {
		const treeAbsorptionPerYear = 22;
		return co2Saved / treeAbsorptionPerYear;
}

function generateResultHTML(distance, co2Equivalents, caloriesBurned, suggestedFoods) {
		const treesPlanted = calculateTreesPlanted(co2Equivalents.totalCO2Saved);

		const resultSectionHTML = generateResultSectionHTML(distance, co2Equivalents, treesPlanted);
		const caloriesSectionHTML = generateCaloriesSectionHTML(caloriesBurned);
		const foodSectionHTML = generateFoodSectionHTML(suggestedFoods);

		return `
				${resultSectionHTML}
				${caloriesSectionHTML}
				${foodSectionHTML}
		`;
}

function generateResultSectionHTML(distance, co2Equivalents) {
		const { totalCO2Saved, leafsEquivalent } = co2Equivalents;

		return `
				<div class="result-section mb-6 fade-in-slide-up">
						<h2 class="text-green-700 font-bold text-2xl mb-4">Congratulations! 🌍💚</h2>
						<p class="text-green-700 font-semibold text-lg">By cycling <strong>${distance} km</strong> instead of riding a motorbike, you saved <span class="highlight-co2 text-3xl">${totalCO2Saved.toFixed(2)} kg</span> of CO2!</p>
						<p class="text-green-600 font-bold text-xl mt-4">This is equivalent to growing <span class="highlight-trees text-3xl">${leafsEquivalent.toFixed(0)}</span> leaves! 🍃</p>
				</div>
		`;
}



function generateCaloriesSectionHTML(caloriesBurned) {
		return `
				<div class="calories-section mb-6 fade-in-slide-up">
				<br><br><br><br>
						<h3 class="text-indigo-700 font-bold text-xl">You've burned <span class="text-3xl">${caloriesBurned}</span> calories! 🔥🚴</h3>
				</div>
		`;
}

function generateFoodSectionHTML(suggestedFoods) {
		return `
				<div class="food-section fade-in-slide-up">
						<h3 class="text-indigo-700 font-semibold mb-3">You've earned one of these: 🎉</h3>
						<div class="grid grid-cols-1 gap-4 food-list">
								${suggestedFoods.map((food, index) => generateFoodCardHTML(food, index)).join('')}
						</div>
				</div>
		`;
}

function generateFoodCardHTML(food, index) {
		return `
				<div class="food-card bg-white rounded-lg shadow-md p-4 flow-up fade-in-slide-up ${index === 0 ? 'first-item' : ''}" style="animation-delay: ${index * 0.1}s;">
						<div class="flex justify-between items-center">
								<span class="text-2xl">${food.emoji}</span>
								<span class="text-indigo-600 font-semibold">${food.calories} cal</span>
						</div>
						<h3 class="text-lg font-medium mt-2">${food.name}</h3>
				</div>
		`;
}

function calculateAndSuggest() {
		console.log("Starting calculateAndSuggest function");
		const { distance, resultDiv } = setVariables();
		console.log("Distance:", distance);

		if (isNaN(distance) || distance <= 0) {
				resultDiv.innerHTML = '<p class="text-red-600 font-medium fade-in">Please enter a valid distance.</p>';
				return;
		}

		const caloriesBurned = calculateCaloriesBurned(distance);
		const co2Equivalents = calculateCO2Equivalents(distance);
		const suggestedFoods = suggestFoods(caloriesBurned);

		try {
				const resultHTML = generateResultHTML(distance, co2Equivalents, caloriesBurned, suggestedFoods);
				resultDiv.innerHTML = resultHTML;
		} catch (error) {
				console.error("Error in generateResultHTML:", error);
		}
}

// Event listeners
document.getElementById('distance').addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
				event.preventDefault();
				calculateAndSuggest();
		}
});

document.getElementById('calculateButton').addEventListener('click', calculateAndSuggest);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
		const initialStatusDiv = document.getElementById('initialStatus');
		initialStatusDiv.innerHTML = `
				<p class="text-green-600 font-bold">Welcome! Start cycling to see how many trees you can plant!</p>
		`;
});