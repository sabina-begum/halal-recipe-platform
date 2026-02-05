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

import React from "react";

// Refactored: All safe import functions now use dynamic import() and return Promises.
export const safeImports = {
  // Safely import React
  async getReact() {
    try {
      const mod = await import("react");
      return mod;
    } catch (error) {
      console.warn(
        "React not available:",
        (error as { message?: string }).message
      );
      return null;
    }
  },

  // Safely import React hooks
  async getReactHooks() {
    const React = await this.getReact();
    if (!React) {
      return {
        useState: () => [null, () => {}],
        useEffect: () => {},
        useContext: () => null,
        useCallback: (fn: () => unknown) => fn,
        useMemo: (fn: () => unknown) =>
          typeof fn === "function" ? fn() : undefined,
        createContext: () => ({
          Provider: ({ children }: { children: React.ReactNode }) => children,
        }),
      };
    }
    return {
      useState: React.useState,
      useEffect: React.useEffect,
      useContext: React.useContext,
      useCallback: React.useCallback,
      useMemo: React.useMemo,
      createContext: React.createContext,
    };
  },

  // Safely import React Router
  async getReactRouter() {
    try {
      const mod = await import("react-router-dom");
      return {
        Link: mod.Link,
        useLocation: mod.useLocation,
        useNavigate: mod.useNavigate,
      };
    } catch (error) {
      console.warn(
        "React Router not available:",
        (error as { message?: string }).message
      );
      return {
        Link: ({ to }: { to: string }) => <a href={to}>{to}</a>,
        useLocation: () => ({ pathname: window.location.pathname }),
        useNavigate: () => (to: string) => (window.location.href = to),
      };
    }
  },

  // Safely import React Helmet
  async getReactHelmet() {
    try {
      const mod = await import("react-helmet-async");
      return {
        Helmet: mod.Helmet,
        HelmetProvider: mod.HelmetProvider,
      };
    } catch (error) {
      console.warn(
        "React Helmet not available:",
        (error as { message?: string }).message
      );
      return {
        Helmet: () => null,
        HelmetProvider: ({ children }: { children: React.ReactNode }) =>
          children,
      };
    }
  },

  // Fallback SVG icons when Lucide is unavailable (real SVG, not emoji)
  _lucideFallbacks: {
    Crown: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        aria-hidden
      >
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M5 16h14" />
      </svg>
    ),
    Search: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    Menu: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        aria-hidden
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    ),
    X: (props: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        aria-hidden
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),
  },

  // Safely import Lucide icons
  async getLucideIcons() {
    const fallbacks = this._lucideFallbacks;
    try {
      const lucide = await import("lucide-react");
      return {
        Crown: lucide.Crown || fallbacks.Crown,
        Search: lucide.Search || fallbacks.Search,
        Menu: lucide.Menu || fallbacks.Menu,
        X: lucide.X || fallbacks.X,
      };
    } catch (error) {
      console.warn(
        "Lucide icons not available:",
        (error as { message?: string }).message
      );
      return {
        Crown: fallbacks.Crown,
        Search: fallbacks.Search,
        Menu: fallbacks.Menu,
        X: fallbacks.X,
      };
    }
  },

  // Safely import Firebase
  async getFirebase() {
    try {
      const mod = await import("firebase/app");
      return mod;
    } catch (error) {
      console.warn(
        "Firebase not available:",
        (error as { message?: string }).message
      );
      return null;
    }
  },

  // Safely import Firebase Auth
  async getFirebaseAuth() {
    try {
      const mod = await import("firebase/auth");
      return mod;
    } catch (error) {
      console.warn(
        "Firebase Auth not available:",
        (error as { message?: string }).message
      );
      return null;
    }
  },

  // Generic safe import function
  async safeRequire(moduleName: string, fallback: unknown = null) {
    try {
      const mod = await import(moduleName);
      return mod;
    } catch (error) {
      console.warn(
        `${moduleName} not available:`,
        (error as { message?: string }).message
      );
      return fallback;
    }
  },

  // Check if a module is available
  async isModuleAvailable(moduleName: string) {
    try {
      await import(moduleName);
      return true;
    } catch {
      return false;
    }
  },

  // Get all available modules
  async getAvailableModules() {
    const modules = [
      "react",
      "react-dom",
      "react-router-dom",
      "react-helmet-async",
      "lucide-react",
      "firebase/app",
      "firebase/auth",
    ];
    const results: Record<string, boolean> = {};
    for (const module of modules) {
      results[module] = await this.isModuleAvailable(module);
    }
    return results;
  },
};

// Export individual safe imports for convenience
export const {
  getReact,
  getReactHooks,
  getReactRouter,
  getReactHelmet,
  getLucideIcons,
  getFirebase,
  getFirebaseAuth,
  safeRequire,
  isModuleAvailable,
  getAvailableModules,
} = safeImports;

export default safeImports;
