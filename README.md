# qxote-input-app

Input app for inserting flora en fauna data into a database

## Reason for existing

To easily note down and keep track of specific flora en fauna on the property of Qxote

## Note

This app was built during a hackathon-style event, so the codebase is rough and a lot of functionality is still missing. Code quality isn’t great, but I’m documenting a few things that might be useful to others (or to myself later) while the details are still fresh in my mind.

### Notes

Typescript is present in the project but is definitly not being properly used. Might be worth refactoring the app some time down the road to improve code quality but more importantly maintainablity.

## Techstack

- [React](https://react.dev/)
- [ShadCN](https://ui.shadcn.com/)
- [Vite](https://vite.dev/)
- [Vite-PWA](https://vite-pwa-org.netlify.app/)

## Missing Functionality

- [ ] Sending data from the app to a database
- [ ] Each plot can have multiple zones

## Ideas For Functionality

- [ ] Show plot locations on a map
- [ ] A pop-up to show the status of the data being sent to the database
- [ ] Base weather information on user location / coordinates

## Ideas For UI

- [ ] Improve favicon by using SVG & updating design so it looks good on light & dark mode (Vite-PWA has a plugin for Icon generation)
