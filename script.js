// Import the CO2-related functions
import { calculateCO2Equivalents, updateTreeAbsorptionTime, getTotalTreeAbsorptionTime, getRemainingTreeAbsorptionTime } from './co2Calculations.js';

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

// Modify the existing startAbsorptionCountdown function
function startAbsorptionCountdown(remainingTime, totalAbsorptionTime) {
	const countdownElement = document.getElementById('absorption-countdown');
	if (!countdownElement) return;

	function updateCountdown() {
		const hours = Math.floor(remainingTime);
		const minutes = Math.floor((remainingTime - hours) * 60);
		const seconds = Math.floor(((remainingTime - hours) * 60 - minutes) * 60);

		countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
		updateRemainingProgressBar(remainingTime, totalAbsorptionTime);

		if (remainingTime > 0) {
			remainingTime -= 1 / 3600; // Decrease by 1 second in hours
			setTimeout(updateCountdown, 1000);
		} else {
			countdownElement.textContent = "Completed!";
			updateRemainingProgressBar(0, totalAbsorptionTime);
		}
	}

	updateCountdown();
}

function generateResultHTML(distance, co2Equivalents, caloriesBurned, suggestedFoods, totalAbsorptionTime, remainingTime) {
	console.log("Generating result HTML with parameters:", { distance, co2Equivalents, caloriesBurned, suggestedFoods, totalAbsorptionTime, remainingTime });

	const resultSectionHTML = generateResultSectionHTML(distance, co2Equivalents);
	const treeAbsorptionHTML = generateTreeAbsorptionHTML(totalAbsorptionTime, remainingTime);
	const resetButtonHTML = generateResetButtonHTML();
	const caloriesSectionHTML = generateCaloriesSectionHTML(caloriesBurned);
	const foodSectionHTML = generateFoodSectionHTML(suggestedFoods);

	const resultHTML = `
				${resultSectionHTML}
				${treeAbsorptionHTML}
				${resetButtonHTML}
				${caloriesSectionHTML}
				${foodSectionHTML}
		`;

	console.log("Finished generating result HTML");
	return resultHTML;
}

// Add this function to update the progress bar
function updateRemainingProgressBar(remainingTime, totalAbsorptionTime) {
	const progressBar = document.getElementById('remaining-progress');
	if (progressBar) {
		const remainingPercentage = (remainingTime / totalAbsorptionTime) * 100;
		progressBar.style.width = `${remainingPercentage}%`;
	}
}

function generateResultSectionHTML(distance, co2Equivalents) {
	return `
			<div class="result-section mb-6 fade-in-slide-up">
					<h2 class="text-green-700 font-bold text-2xl mb-4">Congratulations! 🌍💚</h2>
					<p class="text-green-700 font-semibold text-lg">By cycling <strong>${distance} km</strong> instead of riding a motorbike, you saved <span class="highlight-co2 text-3xl">${co2Equivalents.totalCO2Saved.toFixed(2)} kg</span> of CO2!</p>
			</div>
	`;
}

function generateTreeAbsorptionHTML(totalAbsorptionTime, remainingTime) {
	// Calculate the percentage for the remaining time progress bar
	const remainingPercentage = (remainingTime / totalAbsorptionTime) * 100;

	return `
				<div class="tree-absorption-section mb-6 fade-in-slide-up">
						<h3 class="text-green-600 font-bold text-xl mb-2">Tree Absorption Impact:</h3>
						<p>Total time saved for tree absorption: <strong>${totalAbsorptionTime.toFixed(2)} hours</strong></p>
						<p>Remaining absorption time: <span id="absorption-countdown" class="font-bold">${remainingTime.toFixed(2)} hours</span></p>
						<div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
								<div id="remaining-progress" class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
						</div>
				</div>
		`;
}

function generateResetButtonHTML() {
	return `
			<div class="reset-section mb-6 fade-in-slide-up">
					<button id="resetButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							Reset Absorption Time
					</button>
			</div>
	`;
}

function generateCaloriesSectionHTML(caloriesBurned) {
	return `
			<div class="calories-section mb-6 fade-in-slide-up">
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

// The resetAbsorptionTime function and event listener remain the same
function resetAbsorptionTime() {
	localStorage.removeItem('totalTreeAbsorptionTime');
	localStorage.removeItem('lastUpdateTime');
	alert('Absorption time has been reset!');
	location.reload(); // Reload the page to reflect the changes
}

document.addEventListener('DOMContentLoaded', () => {
	document.body.addEventListener('click', (event) => {
		if (event.target && event.target.id === 'resetButton') {
			resetAbsorptionTime();
		}
	});
});

function calculateAndSuggest() {
	console.log("Starting calculateAndSuggest function");
	const { distance, resultDiv } = setVariables();
	console.log("Distance:", distance);

	if (isNaN(distance) || distance <= 0) {
		resultDiv.innerHTML = '<p class="text-red-600 font-medium fade-in">Please enter a valid distance.</p>';
		return;
	}

	const caloriesBurned = calculateCaloriesBurned(distance);
	console.log("Calories burned:", caloriesBurned);

	const co2Equivalents = calculateCO2Equivalents(distance);
	console.log("CO2 Equivalents:", co2Equivalents);

	const suggestedFoods = suggestFoods(caloriesBurned);
	console.log("Suggested foods:", suggestedFoods);

	// New functions for tree absorption calculations
	updateTreeAbsorptionTime(co2Equivalents.hoursOfTreeAbsorption);
	const totalAbsorptionTime = getTotalTreeAbsorptionTime();
	console.log("Total absorption time:", totalAbsorptionTime);

	const remainingTime = getRemainingTreeAbsorptionTime();
	console.log("Remaining time:", remainingTime);

	console.log("About to call generateResultHTML");
	try {
		const resultHTML = generateResultHTML(distance, co2Equivalents, caloriesBurned, suggestedFoods, totalAbsorptionTime, remainingTime);
		console.log("Generated result HTML");
		resultDiv.innerHTML = resultHTML;

		// Start the countdown timer for remaining absorption time
		startAbsorptionCountdown(remainingTime, totalAbsorptionTime);
	} catch (error) {
		console.error("Error in generateResultHTML:", error);
	}
	createSparkles(resultDiv, 30);

	// Start the countdown timer for remaining absorption time
	startAbsorptionCountdown(remainingTime);
	console.log("Finished calculateAndSuggest function");
}

function showInitialStatus() {
	const initialStatusDiv = document.getElementById('initialStatus');
	const totalAbsorptionTime = getTotalTreeAbsorptionTime();
	const remainingTime = getRemainingTreeAbsorptionTime();

	if (totalAbsorptionTime > 0) {
			initialStatusDiv.innerHTML = `
					<h3 class="text-green-600 font-bold text-xl mb-2">Your Tree Status:</h3>
					<p>Total absorption time: <strong>${totalAbsorptionTime.toFixed(2)} hours</strong></p>
					<p>Remaining absorption time: <strong id="initial-countdown">${remainingTime.toFixed(2)} hours</strong></p>
					<div class="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4 dark:bg-gray-700">
							<div id="initial-progress" class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
					</div>
			`;
			startAbsorptionCountdown(remainingTime, totalAbsorptionTime, 'initial-countdown', 'initial-progress');
	} else {
			initialStatusDiv.innerHTML = `
					<p class="text-green-600 font-bold">Welcome! Start cycling to become a virtual tree and absorb CO2!</p>
			`;
	}
}

// Add event listener for the Enter key
document.getElementById('distance').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent form submission if it's in a form
		calculateAndSuggest();
	}
});

// Add event listener for the button click
document.getElementById('calculateButton').addEventListener('click', calculateAndSuggest);


// Add event listener for the Enter key
document.getElementById('distance').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent form submission if it's in a form
		calculateAndSuggest();
	}
});

// Add event listener for the button click
document.getElementById('calculateButton').addEventListener('click', calculateAndSuggest);

document.addEventListener('DOMContentLoaded', showInitialStatus);
