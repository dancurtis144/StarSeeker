# Welcome to the StarSeeker app 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Add .env.local file

   Within the file add these 2 properties
   EXPO_PUBLIC_API_URL=API URL provided in task
   EXPO_PUBLIC_TOKEN=API Token provided in task

3. Start the app

   ```bash
   npm start
   ```

   This can be run on iOS and Android simulators or real devices. Follow commands in terminal

4. To run simple tests

   ```bash
   npm test
   ```

## Reasoning

State is all currently managed within each individual component. As in this example there was no need to transfer state
across the app on a temporary level, app wide state management was left out however in usual work I would use React Context
to manage this.

Any app permeance needed (eg. previous gates) is currently stored in AsyncStorage as a simple data management resource and allows
it to be viewed in an offline format. If I were to develop the project further, I would move from AsyncStorage to a database format
such as Watermelon for better management and interaction.

I've added the use of dark mode via the device settings as it is heavily advised by both Android and iOS to include for usability and
accessibility. For navigation, I've used expo-route to manage the tabs and stacks and to add some animation when navigating across.
This is actually a first for me as I have used react-navigation for all other projects in the past.

The app makes use of a parallax scroll view for animations. I find this best on a home screen only as it makes for an interesting entry point into the app but this could also be transferred to the other screens as they are both lists which could use the
pull down to refresh functionality for interactivity.

There are some things that I would plan on developing on next to improve the app:

- More intuitive error handling: there are UI error messages for pressing the route finder with no routes selected but the rest are
  logs to the console. There is also no clear API error handling to the user at this time.
- UI: Apart from the parallax scroll view, there is very little colour and imagery to the app. I'd like to add more to this along with animations to complement interaction.
- Testing: Whilst some tests have been added, due to time I did not flesh these out further. It would be good to add more for better coverage
- CI/CD: Currently the necessary tokens are stored in the .env file. I'd like to move this to be included in a pipeline when building the app. I've also added the expo-secure-store package ready for login functionality
