
> [!IMPORTANT]
> 🚧 Work in progress ... 

# Achievements tracker

The main goal of this application is to track achievements thanks to a visual layout of a complete year divided into weeks.
## Tech Stack

**Client:** React, @tanstack/router, TailwindCSS, DaisyUI

**Server:** Convex


## Roadmap

- [x] Create a personnal dashboard 
    - [x] Add authentication with Convex
    - [x] Add/Update/Delete achievements
    - [x] Choose what temporality a box represent (day/week/month)
    - [x] Mark a box as succeded or failed

- [x] Display every achievements
- [x] Display informations on boxes hover

- [ ] Achievements
    - [x] Fix pinned button bug 
    - [x] Fix box content not displaying "?" or "!"
    - [x] Allow to update more infos 
    - [ ] Add a progress graph under the boxes
    - [ ] Add a progress graph preview in achievements settings
    - [x] Allow partial failure/success choice
    - [x] Allow deletion

- [ ] Backend
    - [ ] Switch to Bun/Elysia
    - [ ] Postres Database
    - [ ] Find a way to implement auth 

- [ ] Frontend
    - [ ] TanStack Query
    - [ ] Handle loading state 

- [ ] Auth
    - [ ] Add Github login button in login form
    - [ ] Add Google provider
    - [ ] Add appropriate icon on User Settings when user is logged with a provider (currently only github icon)

- [ ] Features
    - [ ] Allow users to create routines (repeated achievements every day/week/month) with auto reset of the achievement and history
    - [ ] Create personnal notes that only the owner of the achievement can see (for each box and for an achievement)
    - [ ] Graphs for different metrics (global achievement -> every achievements, for routines, etc)

- [ ] Landing page

- [ ] Improve UI (very important)
- [ ] Send a reminder to fill the box at every temporality chosen for a given achievement (PWA notification ? Mail ? Other ?)



## Contributing

Contributions are always welcome!

If you have any recommandation feel free to open a PR or contact me on [Twitter(X)](https://x.com/_Raumain)

