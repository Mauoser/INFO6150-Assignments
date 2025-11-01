# Better Student Hub

## Overview

Better Student Hub is a two-page website designed to provide students with a clear, organized, and visually appealing interface for accessing university tools and resources. The website features a modern dark mode theme with consistent navigation, interactive buttons, and responsive layouts for mobile, tablet, and desktop devices.

---

## SASS/SCSS Features Implemented

The project makes use of advanced SASS/SCSS features to improve maintainability, modularity, and dynamic styling:

1. **Variables**

   - Defined colors, fonts, spacing, and breakpoints as SASS variables for consistency.
   - Example: `$primary-color: #1f2937; $secondary-color: #ef4444; $spacing-unit: 1rem;`

2. **CSS Custom Properties**

   - Used alongside SASS variables for dynamic theming.
   - Example: `--border-radius: 10px;`

3. **Nesting**

   - Styles are nested hierarchically to mirror HTML structure.
   - Example:
     ```scss
     header {
       h1 {
         font-size: 2rem;
       }
       .nav {
         display: flex;
       }
     }
     ```

4. **Interpolation**

   - Used dynamic class naming for buttons and other reusable components.
   - Example:
     ```scss
     $themes: (primary, secondary);
     @each $theme in $themes {
       .button-#{$theme} { ... }
     }
     ```

5. **Placeholder Selectors**

   - Reusable card and button styles defined using `%card` and `%button-base`.
   - Example:
     ```scss
     %card {
       padding: 1rem;
       border-radius: 10px;
       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
     }
     ```

6. **Mixins**

   - Reusable layout helpers for Flexbox and Grid.
   - Example:
     ```scss
     @mixin flex-center {
       display: flex;
       justify-content: center;
       align-items: center;
     }
     ```

7. **Functions**

   - SASS functions used for calculations and dynamic styling.
   - Example:
     ```scss
     @function scale-font($size) {
       @return $size * 1.2rem;
     }
     ```

8. **Additional Features**
   - **Media Queries with Mixins**: Responsive design with `@include respond-to("tablet")`.
   - **Animations**: Fade-in animation for sections.
   - **Object-fit for Images**: Consistent section images using `.section-image { object-fit: contain; }`.

---

## Setup and Running Instructions

### 1. Install SASS

Make sure you have SASS installed on your computer.

### 2. Compile SCSS to CSS

Use a compiler like the Live Sass Compiler extension or install and run sass.

### 3. Open in Browser

Open index.html in your preferred browser.
Navigate to resources.html via the navigation links.
