"use client";

import { useState, useEffect } from "react";

interface FoodItem {
  id: string;
  name: string;
  region: string;
  prepMethod: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fibrePer100g: number;
  sodiumPer100g: number;
  potassiumPer100g: number;
}

const AFRICAN_FOOD_DATABASE: FoodItem[] = [
  { id: "1", name: "Jollof Rice", region: "West Africa", prepMethod: "Cooked with vegetable oil", caloriesPer100g: 160, proteinPer100g: 3.2, carbsPer100g: 28.0, fatPer100g: 4.1, fibrePer100g: 1.2, sodiumPer100g: 320, potassiumPer100g: 140 },
  { id: "2", name: "Eba / Garri", region: "West Africa", prepMethod: "Cooked dough (Cassava flour)", caloriesPer100g: 130, proteinPer100g: 0.8, carbsPer100g: 31.0, fatPer100g: 0.3, fibrePer100g: 1.5, sodiumPer100g: 10, potassiumPer100g: 85 },
  { id: "3", name: "Egusi Soup", region: "West Africa", prepMethod: "Cooked with palm oil & melon seeds", caloriesPer100g: 210, proteinPer100g: 7.5, carbsPer100g: 4.2, fatPer100g: 18.0, fibrePer100g: 2.1, sodiumPer100g: 450, potassiumPer100g: 220 },
  { id: "4", name: "Ripe Plantain", region: "Pan-African", prepMethod: "Fried (Dodo)", caloriesPer100g: 240, proteinPer100g: 1.5, carbsPer100g: 38.0, fatPer100g: 10.5, fibrePer100g: 2.3, sodiumPer100g: 180, potassiumPer100g: 450 },
  { id: "5", name: "Plantain", region: "Pan-African", prepMethod: "Boiled", caloriesPer100g: 120, proteinPer100g: 1.2, carbsPer100g: 31.0, fatPer100g: 0.2, fibrePer100g: 2.3, sodiumPer100g: 5, potassiumPer100g: 400 },
  { id: "6", name: "Moi Moi", region: "West Africa", prepMethod: "Steamed bean cake with oil", caloriesPer100g: 155, proteinPer100g: 8.0, carbsPer100g: 16.5, fatPer100g: 6.5, fibrePer100g: 3.8, sodiumPer100g: 290, potassiumPer100g: 310 },
  { id: "7", name: "Ugali / Nshima / Sadza", region: "East & Southern Africa", prepMethod: "Cooked cornmeal dough", caloriesPer100g: 110, proteinPer100g: 2.3, carbsPer100g: 24.0, fatPer100g: 0.5, fibrePer100g: 1.4, sodiumPer100g: 5, potassiumPer100g: 65 },
  { id: "8", name: "Sukuma Wiki", region: "East Africa", prepMethod: "Sautéed collard greens", caloriesPer100g: 70, proteinPer100g: 2.5, carbsPer100g: 6.0, fatPer100g: 4.2, fibrePer100g: 2.8, sodiumPer100g: 210, potassiumPer100g: 350 },
  { id: "9", name: "Injera", region: "East Africa (Ethiopia/Eritrea)", prepMethod: "Fermented teff flatbread", caloriesPer100g: 150, proteinPer100g: 4.5, carbsPer100g: 30.0, fatPer100g: 0.8, fibrePer100g: 2.5, sodiumPer100g: 45, potassiumPer100g: 180 },
  { id: "10", name: "Boiled Beans (Brown)", region: "Pan-African", prepMethod: "Boiled plain", caloriesPer100g: 115, proteinPer100g: 8.2, carbsPer100g: 20.0, fatPer100g: 0.6, fibrePer100g: 6.5, sodiumPer100g: 2, potassiumPer100g: 400 },
];

interface LoggedFood {
  id: string;
  foodName: string;
  prepMethod: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  sodium: number;
  potassium: number;
}

interface RecipeIngredient {
  id: string;
  name: string;
  rawGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  sodium: number;
  potassium: number;
}

interface WeightLogEntry {
  id: string;
  date: string;
  weightKg: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "recipe" | "weight" | "export" | "profile">("dashboard");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(28);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("lose_05");
  const [foodLog, setFoodLog] = useState<LoggedFood[]>([]);
  const [weightLog, setWeightLog] = useState<WeightLogEntry[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("african_nutrition_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.age) setAge(parsed.age);
        if (parsed.weight) setWeight(parsed.weight);
        if (parsed.height) setHeight(parsed.height);
        if (parsed.activity) setActivity(parsed.activity);
        if (parsed.goal) setGoal(parsed.goal);
      }

      const savedLogs = localStorage.getItem("african_nutrition_food_log");
      if (savedLogs) setFoodLog(JSON.parse(savedLogs));

      const savedWeights = localStorage.getItem("african_nutrition_weight_log");
      if (savedWeights) setWeightLog(JSON.parse(savedWeights));
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        "african_nutrition_profile",
        JSON.stringify({ name, gender, age, weight, height, activity, goal })
      );
    } catch {}
  }, [name, gender, age, weight, height, activity, goal, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("african_nutrition_food_log", JSON.stringify(foodLog));
    } catch {}
  }, [foodLog, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("african_nutrition_weight_log", JSON.stringify(weightLog));
    } catch {}
  }, [weightLog, isLoaded]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [gramInput, setGramInput] = useState<number>(150);

  const [recipeName, setRecipeName] = useState("");
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recipeSelectedFood, setRecipeSelectedFood] = useState<FoodItem | null>(null);
  const [recipeIngGrams, setRecipeIngGrams] = useState<number>(100);
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [finalCookedWeight, setFinalCookedWeight] = useState<number>(1000);
  const [portionEatenGrams, setPortionEatenGrams] = useState<number>(250);

  const [newWeightInput, setNewWeightInput] = useState<number>(70);
  const [weightDateInput, setWeightDateInput] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const calculateTargets = () => {
    let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    if (gender === "male") bmr += 5;
    else bmr -= 161;

    let multiplier = 1.2;
    if (activity === "light") multiplier = 1.375;
    if (activity === "moderate") multiplier = 1.55;
    if (activity === "active") multiplier = 1.725;

    const tdee = bmr * multiplier;

    let targetCalories = tdee;
    if (goal === "lose_025") targetCalories -= 275;
    if (goal === "lose_05") targetCalories -= 550;

    const safeMin = gender === "male" ? 1500 : 1200;
    targetCalories = Math.max(Math.round(targetCalories), safeMin);

    const proteinGrams = Math.round(Number(weight) * 1.6);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const carbGrams = Math.round((targetCalories - proteinGrams * 4 - fatGrams * 9) / 4);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: targetCalories,
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
      fibre: gender === "male" ? 38 : 25,
      sodium: 2300,
      potassium: 3400,
    };
  };

  const targets = calculateTargets();

  const filteredFoods = AFRICAN_FOOD_DATABASE.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecipeFoods = AFRICAN_FOOD_DATABASE.filter((item) =>
    item.name.toLowerCase().includes(recipeSearch.toLowerCase()) ||
    item.region.toLowerCase().includes(recipeSearch.toLowerCase())
  );

  const handleAddFood = () => {
    if (!selectedFood || gramInput <= 0) return;
    const factor = gramInput / 100;
    const newEntry: LoggedFood = {
      id: Date.now().toString(),
      foodName: selectedFood.name,
      prepMethod: selectedFood.prepMethod,
      grams: gramInput,
      calories: Math.round(selectedFood.caloriesPer100g * factor),
      protein: Number((selectedFood.proteinPer100g * factor).toFixed(1)),
      carbs: Number((selectedFood.carbsPer100g * factor).toFixed(1)),
      fat: Number((selectedFood.fatPer100g * factor).toFixed(1)),
      fibre: Number((selectedFood.fibrePer100g * factor).toFixed(1)),
      sodium: Math.round(selectedFood.sodiumPer100g * factor),
      potassium: Math.round(selectedFood.potassiumPer100g * factor),
    };

    setFoodLog([...foodLog, newEntry]);
    setSelectedFood(null);
    setSearchQuery("");
    setGramInput(150);
  };

  const handleAddRecipeIngredient = () => {
    if (!recipeSelectedFood || recipeIngGrams <= 0) return;
    const factor = recipeIngGrams / 100;
    const newIngredient: RecipeIngredient = {
      id: Date.now().toString(),
      name: recipeSelectedFood.name,
      rawGrams: recipeIngGrams,
      calories: Math.round(recipeSelectedFood.caloriesPer100g * factor),
      protein: Number((recipeSelectedFood.proteinPer100g * factor).toFixed(1)),
      carbs: Number((recipeSelectedFood.carbsPer100g * factor).toFixed(1)),
      fat: Number((recipeSelectedFood.fatPer100g * factor).toFixed(1)),
      fibre: Number((recipeSelectedFood.fibrePer100g * factor).toFixed(1)),
      sodium: Math.round(recipeSelectedFood.sodiumPer100g * factor),
      potassium: Math.round(recipeSelectedFood.potassiumPer100g * factor),
    };

    setRecipeIngredients([...recipeIngredients, newIngredient]);
    setRecipeSelectedFood(null);
    setRecipeSearch("");
    setRecipeIngGrams(100);
  };

  const rawBatchTotals = recipeIngredients.reduce(
    (acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: Number((acc.protein + curr.protein).toFixed(1)),
      carbs: Number((acc.carbs + curr.carbs).toFixed(1)),
      fat: Number((acc.fat + curr.fat).toFixed(1)),
      fibre: Number((acc.fibre + curr.fibre).toFixed(1)),
      sodium: acc.sodium + curr.sodium,
      potassium: acc.potassium + curr.potassium,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0, sodium: 0, potassium: 0 }
  );

  const portionFactor = finalCookedWeight > 0 ? portionEatenGrams / finalCookedWeight : 0;
  const portionNutrients = {
    calories: Math.round(rawBatchTotals.calories * portionFactor),
    protein: Number((rawBatchTotals.protein * portionFactor).toFixed(1)),
    carbs: Number((rawBatchTotals.carbs * portionFactor).toFixed(1)),
    fat: Number((rawBatchTotals.fat * portionFactor).toFixed(1)),
    fibre: Number((rawBatchTotals.fibre * portionFactor).toFixed(1)),
    sodium: Math.round(rawBatchTotals.sodium * portionFactor),
    potassium: Math.round(rawBatchTotals.potassium * portionFactor),
  };

  const handleLogRecipePortion = () => {
    if (portionNutrients.calories <= 0 || portionEatenGrams <= 0) return;
    const newEntry: LoggedFood = {
      id: Date.now().toString(),
      foodName: recipeName ? `Recipe: ${recipeName}` : "Custom Cooked Recipe",
      prepMethod: `Portion from ${finalCookedWeight}g batch`,
      grams: portionEatenGrams,
      calories: portionNutrients.calories,
      protein: portionNutrients.protein,
      carbs: portionNutrients.carbs,
      fat: portionNutrients.fat,
      fibre: portionNutrients.fibre,
      sodium: portionNutrients.sodium,
      potassium: portionNutrients.potassium,
    };

    setFoodLog([...foodLog, newEntry]);
    setActiveTab("dashboard");
  };

  const totalConsumed = foodLog.reduce(
    (acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: Number((acc.protein + curr.protein).toFixed(1)),
      carbs: Number((acc.carbs + curr.carbs).toFixed(1)),
      fat: Number((acc.fat + curr.fat).toFixed(1)),
      fibre: Number((acc.fibre + curr.fibre).toFixed(1)),
      sodium: acc.sodium + curr.sodium,
      potassium: acc.potassium + curr.potassium,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0, sodium: 0, potassium: 0 }
  );

  const handleDownloadSummary = () => {
    const summaryText = `
=== AFRICAN NUTRITION & WEIGHT PROGRESS SUMMARY ===
Name: ${name || "User"}
Goal: ${goal}
Target Calories: ${targets.calories} kcal (BMR: ${targets.bmr} kcal, TDEE: ${targets.tdee} kcal)

--- TODAY'S CONSUMED TOTALS ---
Calories: ${totalConsumed.calories} kcal
Protein: ${totalConsumed.protein}g / ${targets.protein}g
Carbs: ${totalConsumed.carbs}g / ${targets.carbs}g
Fat: ${totalConsumed.fat}g / ${targets.fat}g
Fibre: ${totalConsumed.fibre}g / ${targets.fibre}g
Sodium: ${totalConsumed.sodium}mg
Potassium: ${totalConsumed.potassium}mg

--- WEIGHT LOG HISTORY ---
${weightLog.map((w) => `${w.date}: ${w.weightKg} kg`).join("\n") || "No weight logs recorded."}
    `.trim();

    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nutrition_Summary_${new Date().toISOString().split("T")[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoaded) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f4f6f8", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "system-ui, sans-serif" }}>
        <p style={{ color: "#2e7d32", fontWeight: "bold", fontSize: "16px" }}>Loading African Nutrition App...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f4f6f8", paddingBottom: "40px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ backgroundColor: "#1b5e20", color: "white", padding: "20px 16px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>African Nutrition Tracker</h1>
        <p style={{ margin: "4px 0 0 0", fontSize: "13px", opacity: 0.9 }}>Authentic Portion & Macro Management</p>
      </header>

      {/* NAVIGATION TABS */}
      <div style={{ maxWidth: "600px", margin: "15px auto 0 auto", padding: "0 12px", display: "flex", gap: "4px" }}>
        {[
          { id: "dashboard", label: "🍎 Log" },
          { id: "recipe", label: "🍲 Batch" },
          { id: "weight", label: "⚖️ Weight" },
          { id: "export", label: "📊 Export" },
          { id: "profile", label: "⚙️ Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              padding: "10px 2px",
              fontSize: "11px",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === tab.id ? "#2e7d32" : "#ffffff",
              color: activeTab === tab.id ? "#ffffff" : "#444444",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "600px", margin: "15px auto 0 auto", padding: "0 12px" }}>
        {/* TAB 1: DASHBOARD & LOG */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#1b5e20" }}>
                {name ? `${name}'s Daily Summary` : "Daily Progress"}
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "26px", fontWeight: "bold", color: "#2e7d32" }}>{totalConsumed.calories}</span>
                  <span style={{ fontSize: "14px", color: "#666" }}> / {targets.calories} kcal</span>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: targets.calories - totalConsumed.calories >= 0 ? "#2e7d32" : "#c62828" }}>
                  {targets.calories - totalConsumed.calories >= 0 ? `${targets.calories - totalConsumed.calories} left` : `${Math.abs(targets.calories - totalConsumed.calories)} over`}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px", textAlign: "center" }}>
                <div style={{ background: "#f9f9f9", padding: "8px 4px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Protein</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "2px" }}>{totalConsumed.protein}/{targets.protein}g</div>
                </div>
                <div style={{ background: "#f9f9f9", padding: "8px 4px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Carbs</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "2px" }}>{totalConsumed.carbs}/{targets.carbs}g</div>
                </div>
                <div style={{ background: "#f9f9f9", padding: "8px 4px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Fat</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "2px" }}>{totalConsumed.fat}/{targets.fat}g</div>
                </div>
                <div style={{ background: "#f9f9f9", padding: "8px 4px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Fibre</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "2px" }}>{totalConsumed.fibre}/{targets.fibre}g</div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>Add Food</h3>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food (Jollof, Eba, Egusi, Injera)..."
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" }}
              />

              {searchQuery && (
                <div style={{ maxHeight: "160px", overflowY: "auto", border: "1px solid #eee", borderRadius: "6px", marginTop: "8px" }}>
                  {filteredFoods.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedFood(item)}
                      style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #f0f0f0", backgroundColor: selectedFood?.id === item.id ? "#e8f5e9" : "white" }}
                    >
                      <strong style={{ fontSize: "13px" }}>{item.name}</strong>
                      <span style={{ fontSize: "11px", color: "#777", marginLeft: "6px" }}>({item.region})</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedFood && (
                <div style={{ marginTop: "12px", background: "#f1f8e9", padding: "12px", borderRadius: "8px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "13px", color: "#2e7d32", marginBottom: "8px" }}>{selectedFood.name}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="number"
                      value={gramInput}
                      onChange={(e) => setGramInput(Number(e.target.value))}
                      placeholder="Grams"
                      style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <button
                      onClick={handleAddFood}
                      style={{ backgroundColor: "#2e7d32", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      + Log
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "16px" }}>Today's Log</h3>
                {foodLog.length > 0 && (
                  <button onClick={() => confirm("Clear log?") && setFoodLog([])} style={{ border: "none", background: "none", color: "#d32f2f", fontSize: "12px", cursor: "pointer" }}>
                    Clear All
                  </button>
                )}
              </div>

              {foodLog.length === 0 ? (
                <p style={{ color: "#888", fontSize: "13px", textAlign: "center", margin: "20px 0" }}>No foods logged yet today.</p>
              ) : (
                foodLog.map((entry) => (
                  <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "bold" }}>{entry.foodName} ({entry.grams}g)</div>
                      <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                        {entry.calories} kcal | P: {entry.protein}g | C: {entry.carbs}g | F: {entry.fat}g
                      </div>
                    </div>
                    <button onClick={() => setFoodLog(foodLog.filter((f) => f.id !== entry.id))} style={{ border: "none", background: "none", color: "#c62828", cursor: "pointer", fontSize: "14px" }}>
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: RECIPE BATCH COOKER */}
        {activeTab === "recipe" && (
          <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            <h3 style={{ margin: "0 0 6px 0", fontSize: "16px", color: "#f57f17" }}>Cooked Batch Calculator</h3>
            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 14px 0" }}>Calculate portions from cooked pot recipes.</p>

            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe Name (e.g., Big Pot Egusi)"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "12px", boxSizing: "border-box" }}
            />

            <input
              type="text"
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              placeholder="Search ingredient to add..."
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />

            {recipeSearch && (
              <div style={{ maxHeight: "140px", overflowY: "auto", border: "1px solid #eee", borderRadius: "6px", marginTop: "6px" }}>
                {filteredRecipeFoods.map((item) => (
                  <div key={item.id} onClick={() => setRecipeSelectedFood(item)} style={{ padding: "8px", cursor: "pointer", backgroundColor: recipeSelectedFood?.id === item.id ? "#fffde7" : "white" }}>
                    <span style={{ fontSize: "13px" }}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}

            {recipeSelectedFood && (
              <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  value={recipeIngGrams}
                  onChange={(e) => setRecipeIngGrams(Number(e.target.value))}
                  placeholder="Raw weight (g)"
                  style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button onClick={handleAddRecipeIngredient} style={{ backgroundColor: "#f57c00", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold" }}>
                  + Add
                </button>
              </div>
            )}

            {recipeIngredients.length > 0 && (
              <div style={{ marginTop: "14px", background: "#fffde7", padding: "10px", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Batch Ingredients:</div>
                {recipeIngredients.map((ing) => (
                  <div key={ing.id} style={{ fontSize: "12px", display: "flex", justifyContent: "space-between", margin: "4px 0" }}>
                    <span>{ing.name} ({ing.rawGrams}g)</span>
                    <button onClick={() => setRecipeIngredients(recipeIngredients.filter((i) => i.id !== ing.id))} style={{ border: "none", background: "none", color: "red", cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "11px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Final Pot Weight (g):</label>
                <input type="number" value={finalCookedWeight} onChange={(e) => setFinalCookedWeight(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "11px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Your Portion (g):</label>
                <input type="number" value={portionEatenGrams} onChange={(e) => setPortionEatenGrams(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginTop: "14px", padding: "10px", background: "#f5f5f5", borderRadius: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>{portionNutrients.calories} kcal in {portionEatenGrams}g portion</div>
              <button onClick={handleLogRecipePortion} style={{ width: "100%", backgroundColor: "#f57c00", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginTop: "8px" }}>
                + Log Portion to Daily Log
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WEIGHT TRACKER */}
        {activeTab === "weight" && (
          <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#00838f" }}>Weight Tracker</h3>

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <input type="number" value={newWeightInput} onChange={(e) => setNewWeightInput(Number(e.target.value))} placeholder="Weight (kg)" style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input type="date" value={weightDateInput} onChange={(e) => setWeightDateInput(e.target.value)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
            </div>

            <button onClick={() => {
              if (newWeightInput <= 0) return;
              setWeightLog([{ id: Date.now().toString(), date: weightDateInput, weightKg: newWeightInput }, ...weightLog]);
              setWeight(newWeightInput);
            }} style={{ width: "100%", backgroundColor: "#00838f", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginBottom: "16px" }}>
              + Log Weight Entry
            </button>

            <div>
              {weightLog.map((entry) => (
                <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee", fontSize: "13px" }}>
                  <span><strong>{entry.weightKg} kg</strong> on {entry.date}</span>
                  <button onClick={() => setWeightLog(weightLog.filter((w) => w.id !== entry.id))} style={{ border: "none", background: "none", color: "red", cursor: "pointer" }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXPORT & WEEKLY SUMMARIES */}
        {activeTab === "export" && (
          <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#283593" }}>Export Progress Report</h3>
            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 16px 0" }}>
              Download a text summary of your daily nutrition intake and weight history for review or tracking.
            </p>

            <div style={{ background: "#e8eaf6", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
              <div><strong>Profile Name:</strong> {name || "Not set"}</div>
              <div><strong>Current Goal:</strong> {goal}</div>
              <div><strong>Logged Foods Count:</strong> {foodLog.length} items today</div>
              <div><strong>Weight Entries Recorded:</strong> {weightLog.length} entries</div>
            </div>

            <button
              onClick={handleDownloadSummary}
              style={{ width: "100%", backgroundColor: "#3f51b5", color: "white", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              📥 Download Weekly Summary (.txt)
            </button>
          </div>
        )}

        {/* TAB 5: PROFILE & CALCULATIONS */}
        {activeTab === "profile" && (
          <div style={{ background: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>Profile & TDEE Calculation</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
              </div>
              
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Sex:</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Age:</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Weight (kg):</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>Height (cm):</label>
                  <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>Activity Level:</label>
                <select value={activity} onChange={(e) => setActivity(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}>
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Lightly Active (1-3 days/week)</option>
                  <option value="moderate">Moderately Active (3-5 days/week)</option>
                  <option value="active">Very Active (6-7 days/week)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>Goal:</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}>
                  <option value="maintain">Maintain Weight</option>
                  <option value="lose_025">Gentle Loss (~0.25 kg/wk)</option>
                  <option value="lose_05">Standard Loss (~0.5 kg/wk)</option>
                </select>
              </div>
            </div>

            {/* LIVE CALCULATION BREAKDOWN BOX */}
            <div style={{ background: "#e8f5e9", padding: "14px", borderRadius: "8px", border: "1px solid #c8e6c9" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#2e7d32", fontSize: "14px" }}>Mifflin-St Jeor Calculation Breakdown</h4>
              <div style={{ fontSize: "12px", color: "#333", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div><strong>Basal Metabolic Rate (BMR):</strong> {targets.bmr} kcal/day</div>
                <div><strong>Total Daily Energy Expenditure (TDEE):</strong> {targets.tdee} kcal/day</div>
                <div style={{ borderTop: "1px dashed #a5d6a7", paddingTop: "6px", marginTop: "4px", color: "#1b5e20", fontWeight: "bold" }}>
                  Target Daily Calories: {targets.calories} kcal
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}