import { useDarkMode } from "@/contexts/DarkModeContext";
/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Activity,
  Mic,
  Lightbulb,
  RefreshCw,
  Clock,
  Sparkles,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import HeadManager from "../components/HeadManager";
import VoiceSearch from "../components/VoiceSearch";
import AIRecommendations from "../components/AIRecommendations";
import AISubstitutions from "../components/AISubstitutions";
import Nutrition, { NutritionData } from "../components/Nutrition";

interface AIFeaturesPageProps {
  onSearch: (query: string) => void;
}

function AIFeaturesPage({ onSearch }: AIFeaturesPageProps) {
  const { darkMode } = useDarkMode()!;
  const location = useLocation();
  const [selectedRecipe] = useState<unknown>(null);
  const [nutritionData] = useState<unknown>(null);

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <HeadManager
        title="AI Features - CULINARIA"
        description="Explore CULINARIA's AI-powered cooking features: voice search, smart recommendations, ingredient substitutions, and nutrition analysis."
      />

      <div
        className={`min-h-screen transition-colors duration-300 relative ${
          darkMode
            ? "bg-stone-900 text-stone-100"
            : "bg-stone-200 text-stone-800"
        }`}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl font-extrabold text-center text-green-900">
              AI-Powered Cooking Features
            </h1>
            <p
              className={`text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mt-4 ${
                darkMode ? "text-stone-200" : "text-stone-600"
              }`}
            >
              Discover the future of cooking with our intelligent features
              designed to make your culinary journey easier, faster, and more
              enjoyable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-12 sm:space-y-16">
            {/* Voice Search Section */}
            <section id="voice-search" className="scroll-mt-20">
              <div
                className={`p-8 rounded-xl border shadow-lg mb-8 ${
                  darkMode
                    ? "bg-neutral-900 border-stone-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
                    <Mic className="w-6 h-6 text-white" />
                  </div>

                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-orange-300" : "text-orange-900"
                    }`}
                  >
                    Voice Search
                  </h2>
                </div>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-stone-200" : "text-stone-600"
                  }`}
                >
                  Search for recipes hands-free while you cook. Perfect for when
                  your hands are messy!
                </p>

                <div
                  className={`p-6 rounded-xl border shadow-lg ${
                    darkMode
                      ? "bg-black border-stone-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <VoiceSearch onSearch={onSearch} />
                </div>
              </div>
            </section>

            {/* AI Recommendations Section */}
            <section id="ai-recommendations" className="scroll-mt-20">
              <div
                className={`p-8 rounded-xl border shadow-lg mb-8 ${
                  darkMode
                    ? "bg-neutral-900 border-stone-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-orange-300" : "text-orange-900"
                    }`}
                  >
                    Smart Recommendations
                  </h2>
                </div>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-stone-200" : "text-stone-600"
                  }`}
                >
                  Get personalized recipe suggestions based on your preferences,
                  cooking history, and dietary needs.
                </p>

                <div
                  className={`p-6 rounded-xl border shadow-lg ${
                    darkMode
                      ? "bg-black border-stone-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <AIRecommendations
                    userPreferences={{
                      favoriteCategories: selectedRecipe
                        ? [
                            (selectedRecipe as { strCategory?: string })
                              .strCategory || "",
                          ]
                        : [],
                      dietaryRestrictions: [],
                      skillLevel: "beginner",
                    }}
                  />
                </div>
              </div>
            </section>

            {/* AI Substitutions Section */}
            <section id="ai-substitutions" className="scroll-mt-20">
              <div
                className={`p-8 rounded-xl border shadow-lg mb-8 ${
                  darkMode
                    ? "bg-neutral-900 border-stone-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg mr-4">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-orange-300" : "text-orange-900"
                    }`}
                  >
                    Ingredient Substitutions
                  </h2>
                </div>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-stone-200" : "text-stone-600"
                  }`}
                >
                  Find perfect substitutes for ingredients you don&apos;t have.
                  Never let a missing ingredient stop you from cooking!
                </p>

                <div
                  className={`p-6 rounded-xl border shadow-lg ${
                    darkMode
                      ? "bg-black border-stone-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <AISubstitutions ingredients={[]} />
                </div>
              </div>
            </section>

            {/* Nutrition Analysis Section */}
            <section id="nutrition-analysis" className="scroll-mt-20">
              <div
                className={`p-8 rounded-xl border shadow-lg mb-8 ${
                  darkMode
                    ? "bg-neutral-900 border-stone-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg mr-4">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-orange-300" : "text-orange-900"
                    }`}
                  >
                    Nutrition Analysis
                  </h2>
                </div>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-stone-200" : "text-stone-600"
                  }`}
                >
                  Get detailed nutritional information for any recipe. Track
                  your nutrition goals and get personalized suggestions.
                </p>

                <div
                  className={`p-6 rounded-xl border shadow-lg ${
                    darkMode
                      ? "bg-black border-stone-700"
                      : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
                  }`}
                >
                  <Nutrition
                    nutrition={nutritionData as NutritionData}
                    loading={false}
                  />
                </div>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section>
              <div
                className={`p-8 rounded-xl border shadow-lg ${
                  darkMode
                    ? "bg-neutral-900 border-stone-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-blue-300" : "text-blue-900"
                    }`}
                  >
                    Coming Soon
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    className={`p-6 rounded-lg border shadow-md transition-all duration-200 hover:shadow-lg ${
                      darkMode
                        ? "bg-neutral-800 border-stone-700 hover:border-stone-600"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 shadow-md mr-3">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h3
                        className={`font-semibold text-lg ${
                          darkMode ? "text-blue-300" : "text-blue-700"
                        }`}
                      >
                        Step-by-Step Cooking Mode
                      </h3>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      Voice-guided cooking with timers and progress tracking
                    </p>
                  </div>
                  <div
                    className={`p-6 rounded-lg border shadow-md transition-all duration-200 hover:shadow-lg ${
                      darkMode
                        ? "bg-neutral-800 border-stone-700 hover:border-stone-600"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 shadow-md mr-3">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </div>
                      <h3
                        className={`font-semibold text-lg ${
                          darkMode ? "text-blue-300" : "text-blue-700"
                        }`}
                      >
                        Smart Shopping Lists
                      </h3>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      Automatically generate shopping lists from your meal plan
                    </p>
                  </div>
                  <div
                    className={`p-6 rounded-lg border shadow-md transition-all duration-200 hover:shadow-lg ${
                      darkMode
                        ? "bg-neutral-800 border-stone-700 hover:border-stone-600"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 shadow-md mr-3">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h3
                        className={`font-semibold text-lg ${
                          darkMode ? "text-blue-300" : "text-blue-700"
                        }`}
                      >
                        AI Meal Planner
                      </h3>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      Generate weekly meal plans based on your diet and
                      preferences
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-6 text-sm ${
                    darkMode ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  These cutting-edge features are currently in development and
                  will be rolled out to users soon. Stay tuned!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIFeaturesPage;
