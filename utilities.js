function calculateCaloriesBurned(distance) {
	const speedKmPerHour = 20;
	const weightKg = 70;
	const met = 8;
	const timeHours = distance / speedKmPerHour;
	return Math.round(met * weightKg * timeHours);
}

function createSparkles(container, count) {
	for (let i = 0; i < count; i++) {
			const sparkle = document.createElement('div');
			sparkle.classList.add('sparkle');
			sparkle.style.left = `${Math.random() * 100}%`;
			sparkle.style.top = `${Math.random() * 100}%`;
			sparkle.style.animationDelay = `${Math.random() * 2}s`;
			sparkle.style.animation = `sparkle ${1 + Math.random() * 2}s infinite`;
			container.appendChild(sparkle);
	}
}
