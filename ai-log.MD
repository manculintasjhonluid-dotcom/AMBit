# AI Development Log — AMBit

## Purpose of Log
This document records how AI pair-programming was used to plan, structure, style, and debug **AMBit** step-by-step using plain HTML5, CSS3, and JavaScript.

---

## Session 1: Project Scoping & User Stories
* **Goal:** Define the problem statement, target users (students), and core user stories with acceptance criteria.
* **What I Did:** Drafted three core user stories covering (1) browsing/filtering skills, (2) offering a skill profile, and (3) posting an "I Need Help" request, including empty-state and validation edge cases.
* **Key Takeaway:** Breaking features into specific acceptance criteria made it clear what HTML elements and validation checks were needed before writing any code.

## Session 2: Multi-Page HTML Structure (`index.html`, `browse.html`, `profile.html`)
* **Goal:** Build semantic, accessible HTML skeletons for all three pages and link them consistently.
* **What I Did:** Created the navigation bar, hero section, category quick-links (`?category=...`), search/filter controls, card grid containers, and two submission forms with `<small>` placeholders for inline validation errors.
* **Key Takeaway:** Using consistent `id` and `class` names across all three pages prevented broken selectors later when styling and scripting.

## Session 3: Responsive Styling (`style.css`)
* **Goal:** Style the layout, skill/request cards, form inputs, validation states, and mobile breakpoints.
* **What I Did:** Applied CSS Grid (`repeat(auto-fit, minmax(...))`) for the card and form layouts, added distinct pill badges for providers vs. seekers, styled `.input-error` / `.error-msg` states, and added a `@media (max-width: 600px)` rule for mobile screens.
* **Key Takeaway:** Using `margin-top: auto` inside flex cards keeps every card footer aligned horizontally regardless of description length.

## Session 4: Dynamic Logic & `localStorage` (`script.js`)
* **Goal:** Make search, filtering, sorting, and form submissions work without a backend server.
* **What I Did:** 
  * Built `getSkills()` / `saveSkills()` and `getRequests()` / `saveRequests()` using `JSON.parse` and `JSON.stringify`.
  * Implemented live search, category/availability filtering, A–Z sorting, URL parameter detection (`URLSearchParams`), and empty-state toggling.
  * Created a reusable `validateField()` helper to validate both forms before saving new entries with `.unshift()`.
* **Key Takeaway:** Guard clauses like `if (!skillsGrid) return;` and `if (offerForm)` allow a single `script.js` file to safely run across multiple HTML pages without console errors.

## Session 5: End-to-End Testing & Documentation
* **Goal:** Verify all acceptance criteria and finalize repository documentation.
* **What I Did:** Tested blank form submissions, data persistence across browser refreshes, keyword/category filters, empty search resets, and mobile responsiveness. Completed `README.md` and `ai-log.md`.

## Session 6: Category Card Background Images (`index.html`, `style.css`)
* **Goal:** Add distinct background photos to each of the 5 Popular Skill Category cards while keeping the images properly framed and the text readable.
* **What I Did:** 
  * Organized the 5 category photos inside an `images/` folder and added unique modifier classes (`cat-programming`, `cat-graphic-design`, etc.) to each `.category-card` link in `index.html`.
  * Updated `.category-card` in `style.css` with `background-size: cover`, `background-position: center`, `overflow: hidden`, and Flexbox bottom-alignment.
  * Applied `linear-gradient` overlays paired with exact case-sensitive `url("images/...")` paths so white text remains high-contrast over every photo.
* **Key Takeaway:** Checking exact filename spelling and capitalization (such as `Programming.jpg` vs. lowercase files) prevents broken images when deploying to case-sensitive hosts like GitHub Pages.