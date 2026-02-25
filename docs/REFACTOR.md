# Recipe App — Refactoring Plan

## Priority 1 — Bugs / Correctness

| #   | Issue                                                                                                                              | File(s)                               | Fix                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------ |
| 1   | **Nutrition merge is broken** — last ingredient overwrites all others instead of summing                                           | `services/nutritionAPI.ts`            | Accumulate and sum each nutrient across all ingredient results     |
| 2   | **`isPremium` always false** — reads `localStorage.getItem("currentUser")` which is never written; auth system writes `"demoUser"` | `components/MainLayout.tsx:67`        | Replace with `useAuth()` to read premium status from `AuthContext` |
| 3   | **Mobile search does nothing** — `e.preventDefault()` only, never calls `handleSearch`                                             | `components/Navbar.tsx` (mobile form) | Wire the mobile search form to `handleSearch`                      |
| 4   | **`hasUserSearched` prop accepted but unused**                                                                                     | `components/MainRoutes.tsx`           | Remove from interface and all call sites                           |

---

## Priority 2 — Architecture

| #   | Issue                                                                                                                                 | File(s)                                | Fix                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 5   | **`darkMode` prop-drilled into ~65 components** — `DarkModeContext` already exists                                                    | Virtually every component              | Delete `darkMode` prop; call `useDarkMode()` directly inside each component                                                          |
| 6   | **`App.tsx` is a god component** — handles routing, API calls, halal filtering, nutrition fetch, URL resolution, and toast state      | `App.tsx`                              | Extract search + recipe-resolution logic into a `useRecipeSearch` custom hook                                                        |
| 7   | **`Home.tsx` is two pages in one** — completely different UI when `selected` is null vs. not                                          | `features/recipes/Home.tsx`            | Split into `LandingPage` (featured grid + hero) and keep the recipe-result display separate                                          |
| 8   | **Duplicate recipe detail rendering** — both `Home.tsx` (inline result) and `RecipeDetailsSection.tsx` render the same sub-components | `Home.tsx`, `RecipeDetailsSection.tsx` | Create a shared `<RecipeDetail>` component used by both; consider eliminating the inline mode and always navigating to `/recipe/:id` |

---

## Priority 3 — Code Quality

| #   | Issue                                                                                                                                    | File(s)                                                                                                      | Fix                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| 9   | **Duplicate type definitions** — `Recipe`, `User`, `UserProfileData`, `NutritionGoals` defined in both `global.d.ts` and component files | `hooks/useFavorites.ts`, `components/UserProfile.tsx`, `components/NutritionTracker.tsx`                     | Delete local re-definitions; import from `types/global.d.ts`    |
| 10  | **Loose `unknown` typing in AuthContext** — params typed as `unknown`, immediately cast to `string`                                      | `contexts/AuthContext.tsx`                                                                                   | Type `email`, `password`, `displayName` as `string` directly    |
| 11  | **`alert()` used for feedback** (8 occurrences) — `Toast` component already exists                                                       | `hooks/useFavorites.ts`, `components/RecipeReviews`, `components/PremiumFeatures`, `utils/ratingHelpers.tsx` | Replace all `alert()` calls with the existing `Toast` component |
| 12  | **`console.log` in production paths** (27+ files) — especially `nutritionAPI.ts` (12+ calls)                                             | Various                                                                                                      | Remove or gate behind `import.meta.env.DEV`                     |
| 13  | **Dead code: `getOptimizedImageUrl`** — checks WebP support but always returns the original URL                                          | `services/performanceService.ts`                                                                             | Fix or delete                                                   |
| 14  | **`window.location.href = "/"` on logo click** — triggers full page reload                                                               | `components/Navbar.tsx:198`                                                                                  | Replace with react-router `<Link to="/">`                       |

---

## Priority 4 — Large Files to Split

| File                   | Lines | Suggested Split                                                                                                                                     |
| ---------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Navbar.tsx`           | 661   | Extract `<MobileMenu>`, `<DesktopNav>`, `<UserDropdown>`, `<NotificationsBell>` — desktop and mobile dropdown JSX is currently copy-pasted verbatim |
| `NutritionTracker.tsx` | 807   | Split into `<NutritionLog>`, `<NutritionGoals>`, `<NutritionCharts>`, `<AITips>` — already has a `NutritionTracker/` subfolder ready                |
| `AdvancedSearch.tsx`   | 664   | Extract filter groups into `<DietaryFilters>`, `<CuisineFilter>`, `<IngredientFilter>`, `<TimeFilter>`                                              |

---

## Priority 5 — Minor / Cleanup

| #   | Issue                                                                                          | Fix                                                                                  |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 15  | **Hardcoded Unsplash URL** in `Home.tsx:236`                                                   | Move to a constants file or env var                                                  |
| 16  | **Hardcoded `"3"` notification badge** in mobile Navbar                                        | Drive from actual notification count                                                 |
| 17  | **Inline `style={{}}` scattered across components**                                            | Replace with Tailwind utility classes                                                |
| 18  | **`localStorage` keys scattered** across 15+ files                                             | Centralise all keys in `localStorageHelpers.ts` as named constants; use consistently |
| 19  | **Language switcher is a stub** with no i18n behind it                                         | Either wire up `react-i18next` or remove the UI until implemented                    |
| 20  | **`SecurityWrapper` cosmetic-only** — client-side token / rate-limit provides no real security | Remove or clearly mark as UX-only; move real security to server                      |

Audit remaining components for dark mode class gaps (QuickAccess, Services, AI Features)

---

## Quick Wins (do first, lowest effort / highest impact)

1. Remove `darkMode` prop from all components → call `useDarkMode()` directly _(one sweep, huge noise reduction)_
2. Fix `isPremium` to use `useAuth()` _(1 line fix, actual bug)_
3. Fix mobile search form submit _(2 lines, actual bug)_
4. Fix nutrition sum logic in `nutritionAPI.ts` _(~10 lines, functional bug)_
5. Replace all `alert()` with `Toast` _(8 call sites, improves UX)_
6. Remove duplicate type definitions _(delete lines, no breakage)_
