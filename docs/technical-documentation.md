# Technical Documentation

## Project Purpose
This project is a personal portfolio web application created for Assignment 4. The goal is to present my profile and selected work in a professional web page experience with a distinctive retro RPG visual style.

## File Structure

### `index.html`
Contains the main structure of the website:
- a top navigation
- About section with name, introduction, and contact links
- Projects section with category tabs
- My GitHub Projects section fro my githup projects 
- Contact section with a form
- footer

### `css/styles.css`
Controls the complete visual design and responsive behavior:
- retro pixel-art inspired color system
- panel, button, tab, card styles
- layout grids for desktop and mobile
- HP bar styling for skills
- under-construction effects for Games and Systems
- accessibility improvements such as reduced-motion support

### `js/script.js`
Handles the interactive behavior:
- active navigation highlighting on scroll
- switching between project category tabs
- contact form validation
- helpful success and error messages

## Design System
The website uses a consistent retro RPG interface inspired by classic 16-bit games.

### Color Palette
- Dark Brown: `#2D1B00`
- Medium Brown: `#5D4037`
- Beige / Cream: `#F5F5DC`
- Red Accent: `#B71C1C`
- Off-white Text: `#F8F9FA`

## Main Features

### 1. One-Page Portfolio Layout
The full website works as a single-page application-style portfolio. Navigation links smoothly move the user between sections without loading new pages.

### 2. Projects as a Quest Log
The Projects section is divided into three categories:
- Websites
- Games
- Systems

The Websites tab includes a featured card for my personal project (VelonWeb) followed by client project cards using homepage screenshots from the `assets/images` folder.

### 3. Contact Form Validation
The contact form validates:
- required name field
- required phone number format
- required email format
- required message field

If the form passes validation, the user sees a success message.

## Responsiveness
The layout is designed to adapt across screen sizes:
- desktop uses multi-column grids for content and project cards
- mobile stacks all major cards vertically for readability and easier navigation

## Performance and Quality Notes
- project screenshots are reused from local assets
- styling was consolidated into one organized stylesheet
- JavaScript was simplified to the interactions actually needed in this final version

## Future Improvements
- add real game or system projects when available