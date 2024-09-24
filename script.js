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
	const remainingPercentage = (remainingTime / totalAbsorptionTime) * 100;

	return `
				<div class="tree-absorption-section mb-6 fade-in-slide-up">
						<h3 class="text-green-600 font-bold text-xl mb-2">Tree Absorption Impact:</h3>
						<p>Total time saved for tree absorption: <strong>${totalAbsorptionTime.toFixed(0)} hours</strong></p>
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

function resetAbsorptionTime() {
	localStorage.removeItem('totalTreeAbsorptionTime');
	localStorage.removeItem('lastUpdateTime');
	alert('Absorption time has been reset!');
	location.reload(); // Reload the page to reflect the changes
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
	updateTreeAbsorptionTime(co2Equivalents.hoursOfTreeAbsorption);
	const totalAbsorptionTime = getTotalTreeAbsorptionTime();
	const remainingTime = getRemainingTreeAbsorptionTime();

	try {
		const resultHTML = generateResultHTML(distance, co2Equivalents, caloriesBurned, suggestedFoods, totalAbsorptionTime, remainingTime);
		resultDiv.innerHTML = resultHTML;
		showInitialStatus();
	} catch (error) {
		console.error("Error in generateResultHTML:", error);
	}
}

function displayRemainingAbsorptionTime(remainingTime, totalAbsorptionTime) {
		const progressPercentage = (remainingTime / totalAbsorptionTime) * 100;

		return `
				<div class="p-4 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-lg shadow-lg text-center">
						<h2 class="text-2xl font-bold mb-2">Tree Absorption Countdown</h2>
						<div class="flex justify-center items-center mb-4">
								<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								<span class="text-4xl font-extrabold" id="time-display">${formatTime(remainingTime)}</span>
						</div>
						<p class="mb-4 text-lg">Remaining CO2 absorption time</p>
						<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div id="progress-bar" class="bg-green-400 h-2.5 rounded-full" style="width: ${progressPercentage}%"></div>
						</div>
				</div>
		`;
}

function formatTime(timeInHours) {
		const totalSeconds = Math.floor(timeInHours * 3600);
		const days = Math.floor(totalSeconds / (3600 * 24));
		const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		let formattedTime = '';
		if (days > 0) formattedTime += `${days}d `;
		if (hours > 0 || days > 0) formattedTime += `${hours}h `;
		if (minutes > 0 || hours > 0 || days > 0) formattedTime += `${minutes}m `;
		formattedTime += `${seconds}s`;

		return formattedTime.trim();
}

function showInitialStatus() {
		const initialStatusDiv = document.getElementById('initialStatus');
		const totalAbsorptionTime = getTotalTreeAbsorptionTime();
		const remainingTime = getRemainingTreeAbsorptionTime();

		if (totalAbsorptionTime > 0) {
				initialStatusDiv.innerHTML = displayRemainingAbsorptionTime(remainingTime, totalAbsorptionTime);
				startAbsorptionCountdown(remainingTime, totalAbsorptionTime, 'time-display', 'progress-bar');
		} else {
				initialStatusDiv.innerHTML = `
						<p class="text-green-600 font-bold">Welcome! Start cycling to become a virtual tree and absorb CO2!</p>
				`;
		}
}

function startAbsorptionCountdown(remainingTime, totalAbsorptionTime, timeElementId, progressElementId) {
		const timeElement = document.getElementById(timeElementId);
		const progressElement = document.getElementById(progressElementId);

		// Check if timeElement exists to avoid null reference errors
		if (!timeElement || !progressElement) {
				console.error(`Element with ID ${timeElementId} or ${progressElementId} not found.`);
				return;
		}

		const countdownInterval = setInterval(() => {
				if (remainingTime <= 0) {
						clearInterval(countdownInterval);
						timeElement.innerText = "00:00:00";
						progressElement.style.width = '0%';
				} else {
						remainingTime -= 1 / 3600; // Decrease time by 1 second
						timeElement.innerText = formatTime(remainingTime);

						// Update progress bar
						const progressPercentage = (remainingTime / totalAbsorptionTime) * 100;
						progressElement.style.width = `${progressPercentage}%`;
				}
		}, 1000); // Update every second
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

document.addEventListener('DOMContentLoaded', () => {
	document.body.addEventListener('click', (event) => {
		if (event.target && event.target.id === 'resetButton') {
			resetAbsorptionTime();
		}
	});
});
