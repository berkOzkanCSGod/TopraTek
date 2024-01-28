# TopraTek: Farmer's Mapping Tool

Demo video: https://youtu.be/rBc-QGZwgxE

[Technical Details (for employers)](#technical-details)

*** Contact berk[[dot]]ozkan[[at]]ug[[dot]]bilkent[[dot]]edu[[dot]]tr for demo with working api keys ***

Welcome to TopraTek! This project aims to provide a comprehensive mapping solution tailored specifically for farmers. With this application, farmers can easily outline their land, label it, categorize locations, and record additional data such as current crop and crop planting history. Whether you're a small-scale farmer or managing large agricultural operations, this tool is designed to streamline your mapping and data recording processes.

## Features
### Land Outlining
- Easily outline and define the boundaries of your land using intuitive drawing tools.
  
<img width="600" style="display: flex;" alt="Screenshot 2024-01-27 at 10 06 56" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/f9f77b20-4935-409e-b976-e0eac63e46a5">

- Precisely mark specific areas, fields, or plots for detailed management.

<img width="600" alt="Screenshot 2024-01-27 at 10 09 19" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/5b440baa-8155-497d-bcad-1d8193eb7dd3">

- Edit changes later

<img width="600" alt="Screenshot 2024-01-27 at 10 20 16" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/cd5e71ba-7e47-40d6-846a-5e06af02239b">

### Labeling and Categorization
- Add labels to different areas of your land to identify specific features such as crops, buildings, water sources, etc.
- Categorize locations based on various attributes like soil type, terrain features, irrigation methods, etc.

<div style="display: flex;">
  <img width="300" alt="Screenshot 2024-01-27 at 10 15 49" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/2b390c1e-cdbf-4454-a07f-f5e1fa695d79">
  <img width="450" alt="Screenshot 2024-01-27 at 10 39 33" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/f8c0aadf-032d-45f9-86d5-cb45772b8117">
</div>


### Crop Management
- Record and track information about the current crop planted in each area of your land.
- Maintain a history of crop rotations and planting schedules for better crop management practices.

### Data Visualization
- Visualize your land and all associated data on an interactive map for easy reference and analysis.
- Gain insights into your farming operations by overlaying different layers of information.

### Getting Started


```diff
@@ This won't work since I removed API and DB Keys @@
```

To get started with TopraTek, follow these steps:

1. Pull repo
2. Navigate to TopraTek folder
```
  cd TopraTek (or TopraTekv3)
```
```
  cd src
```
3. Install dependencies
```
npm install
```
4. Run
```
npm run start
```
5. Go to localhost:3000/login on your browser and use.

# Technical Details <a name="technical-details"></a>

Implemented:
- Authentication via tokens
- Routing
- Frontend-backend communication (MVC)
- backend-database communication (MVC)
- Frontend-Mapbox API communication
- Serverside rendering with PUG and Node JS
- Dynamic component rendering with fetch await promises
- Drawing shapes on the map
- OOP for user structure in MongoDB
- Unit tests
  

1. Utilization of UML for Project Design and Planning:
I used Unified Modeling Language (UML) to plan and design this project. This involved creating diagrams to visualize the project's structure, how they relate to each other, and what they do. Using UML helped me organize the project in a clear and structured way, showing my ability to plan software projects thoughtfully.

2. Embracing Vanilla JavaScript:
I deliberately chose to use vanilla JavaScript and Node JS for this project. Instead of relying on frameworks or libraries, I wanted to understand how JavaScript and frontend-backend interactions work from the ground up. This hands-on approach allowed me to dive into core concepts, learning their details and best practices thoroughly. By doing so, I'm better equipped to handle various challenges in web development and beyond.

** Personal anecdote **
When developing this project I ran into a performance problem. I wanted to update features, such as the sidebar and map live when a user added a location, however, since PUG is a serverside template engine each change required a complete reload of the page. Then, I discovered HTMX, which helped me make some parts dynamic without reloading the page–greatly increasing performance. However, some feature updates required a more tailored approach (or I didn't know htmx well enough), so this led me to do routing and updating manually with vanilla JS fetch and awaits on the frontend. And so, I was able to benefit from the superior performance of server-side rendering while keeping the site dynamic.

In summary, this project reflects my commitment to learning and mastering software development techniques. It demonstrates my ability to plan projects systematically.

### Tools
- Node JS v21.2.0
- PUG (formerly jade)
- HTML/CSS/JS
- Mapbox
- Express
- MongoDB

## UML 
### Use Case Diagram

<img width="797" alt="usecaseTT" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/d7f58ad4-1e58-4f66-8a9e-da07e3af23c8">

### Sequence Diagram (all combined into one for easy reading) 

<img width="553" alt="sqncTT" src="https://github.com/berkOzkanCSGod/TopraTek/assets/82842011/aca1e99e-bee6-4880-b72b-82b46c0a6ebf">

I didn't add (due to time constraints):
- Error indicators
- Editing geometric shapes on the map
- Weather data with OpenWeatherAPI
- Full-screen mode
- View settings
- Navigation on map
- Some details
- Could spend more time on input-checking
