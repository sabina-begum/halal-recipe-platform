const DEMO_USER = {
  uid: "demo-user-123",
  email: "demo@culinaria.com",
  displayName: "Demo User",
  photoURL: null,
  demoData: {
    favorites: [
      {
        id: "52772",
        name: "Teriyaki Chicken Casserole",
        image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
        category: "Chicken",
        area: "Japanese",
      },
      {
        id: "52959",
        name: "Baked salmon with fennel & tomatoes",
        image: "https://www.themealdb.com/images/media/meals/1540441275.jpg",
        category: "Seafood",
        area: "British",
      },
    ],
    mealPlan: {
      monday: {
        breakfast: "Oatmeal with berries",
        lunch: "Grilled chicken salad",
        dinner: "Pasta carbonara",
      },
    },
    shoppingList: ["Chicken breast", "Salmon fillet", "Quinoa"],
    nutritionGoals: { calories: 2000, protein: 150, carbs: 200, fat: 65 },
    preferences: {
      dietaryRestrictions: ["Vegetarian-friendly"],
      favoriteCategories: ["Chicken", "Seafood", "Italian"],
      skillLevel: "intermediate",
    },
  },
};

module.exports = async (browser) => {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:4173/login", { waitUntil: "networkidle0" });
  await page.evaluate((demoUser) => {
    localStorage.setItem("demoUser", JSON.stringify(demoUser));
  }, DEMO_USER);
  await page.close();
};
