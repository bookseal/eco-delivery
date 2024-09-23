# 🚴 Eco-Delivery: Burn Calories, Save the Planet! 🌍💚

**Eco-Delivery** is a dynamic web application designed to encourage Foodpanda delivery riders to track their cycling performance. By measuring the calories burned and comparing CO2 emissions saved by cycling instead of using a motorbike, this app aims to promote health and environmental benefits.

## 💡 Hackathon: **Foodpanda Hackathon 2024**

This project was built for the **Foodpanda Hackathon** as an innovative solution to promote eco-friendly deliveries.

## 🎯 Key Features

- **Calories Burned Calculation**: Riders can input the distance cycled, and the app calculates the total calories burned based on predefined metrics.
- **CO2 Emission Savings**: The app calculates the CO2 saved by cycling, providing equivalent real-world impact comparisons (e.g., driving distances, plastic bags produced, tree absorption).
- **Food Rewards Suggestions**: Based on the calories burned, the app suggests food items with equal or fewer calories, creating a fun, motivational reward system for cyclists.

## 🚀 Demo

[Add a demo link here if you host the app on platforms like GitHub Pages, Vercel, or Netlify.]

## 🛠️ Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
		```bash
		git clone https://github.com/your-username/eco-delivery.git
		```

2. **Navigate to the project directory**:
		```bash
		cd eco-delivery
		```

3. **Open `index.html` in your browser**:
		Simply open the `index.html` file in your browser to run the app. No backend is required for this project.

## 🌱 How It Works

1. **Input Distance**: The user enters the distance cycled (in kilometers).
2. **Calculate Impact**: The app calculates:
	 - Calories burned.
	 - CO2 emissions saved by not using a motorbike.
	 - Equivalent real-world comparisons (tree absorption, driving distance, plastic bags).
3. **Food Suggestion**: Based on the calories burned, the app suggests food rewards with equal or lower calories to motivate the rider.
4. **Visual Effects**: Enjoy smooth animations and celebratory sparkles to enhance the user experience.

## 🎨 Technologies Used

- **HTML5**: Structure of the app.
- **CSS3**: For styling and animations (using TailwindCSS).
- **JavaScript**: For calculating calories burned, CO2 savings, and rendering food suggestions dynamically.

## ✨ Key Features (Code Highlights)

- **Real-time calorie and CO2 savings calculation**:
		```javascript
		function calculateAndSuggest() {
				// ... code to calculate calories and CO2 savings
		}
		```

- **Food suggestion based on calories burned**:
		```javascript
		const suggestedFoods = foodOptions.filter(food => food.calories <= caloriesBurned);
		```

- **Smooth animations**:
		```css
		.fade-in-slide-up {
				opacity: 0;
				transform: translateY(20px);
				animation: fadeInSlideUp 1s forwards ease-in-out;
		}
		```

## 🌍 Environmental Impact

By promoting cycling instead of motorbikes, the app helps riders visualize the environmental benefits in a tangible way—whether by showing how much CO2 was saved or comparing it to real-world equivalents like driving or plastic bag production.

## 💻 Project Structure

```bash
├── index.html        # Main HTML file
├── style.css         # Styles for the application
├── script.js         # Main JavaScript file for logic and interactivity
└── README.md         # Project overview (this file)
