# AMBit — Campus Peer-to-Peer Skill Exchange Platform

## Project Overview
**AMBit** is a student-focused web prototype designed to connect learners who need academic or creative help with classmates who have the skills to teach or collaborate. Instead of relying on scattered group chats, students can browse available peer skills, post their own skill profiles, or submit "I Need Help" requests in one centralized hub.

## Problem & Solution
* **Problem:** Students often struggle to find reliable peer tutors or collaborators for specific coursework (such as programming, graphic design, or writing) within their campus community.
* **Solution:** A lightweight, searchable directory where students can filter peer providers by category and availability, offer their own skills, and post open help requests.

## Tech Stack
* **HTML5:** Semantic multi-page layout (`index.html`, `browse.html`, `profile.html`)
* **CSS3:** Responsive Flexbox & CSS Grid layout with mobile media queries (`style.css`)
* **Vanilla JavaScript (ES6+):** Dynamic DOM rendering, live search/filtering, form validation, and `localStorage` persistence (`script.js`)

## User Stories & Implemented Features
1. **Browse & Filter Skills (`browse.html`):** Students can search by keyword, filter by skill category or availability, sort alphabetically, and see a clear empty-state message with a reset option when no matches exist.
2. **Offer a Skill (`profile.html`):** Students can create and publish a skill listing with inline form validation and persistent storage.
3. **Request Help (`profile.html`):** Students can post an "I Need Help" card detailing the subject, description, and contact handle.

## File Structure
```text
AMBit/
├── index.html      # Landing page, hero section, and quick category links
├── browse.html     # Searchable directory of skill providers and help requests
├── profile.html    # "Offer a Skill" and "I Need Help" submission forms
├── style.css       # Shared responsive styling and validation states
├── script.js       # Filtering, validation, and localStorage state logic
├── README.md       # Project documentation
└── ai-log.md       # AI-assisted development log