# Shopper

**Shopper, let’s go haul! 🚀🛍️**

**Shopper** is your ultimate shopping companion, designed to streamline and simplify the way you manage your shopping lists. Whether you’re organizing items for daily needs or planning for special occasions, Shopper lets you create, categorize, and sort your shopping lists—all in one convenient place. With a clean and intuitive interface, you can effortlessly track your wants and needs, ensuring a smarter and more organized shopping experience.

<i>Shopper is a mobile application for the MOBDEVE class at De La Salle University.</i>

![shopper-app-mockups](https://github.com/user-attachments/assets/d3280fa3-25c8-440b-bf91-d0665039aa5c)

# Project 
Shopper is developed with React Native, Expo, Supabase, Firebase Cloud, Typescript, and Nativewind.

# Requirements
Here is the list of requirements needed:
- NodeJS
- npm

## For Android
- Android SDK
- Android NDK
- Android Device (to make the push notifications work, it doesn't work on emulator)
- Android Emulator (to test other features, except push notifs)

<i>All requirements for Android can be installed through Android Studio</i>

## For iOS
TBA!

# Installation
Follow these set of instructions to build and run the app locally (for Android):
1. Clone the repository
2. After cloning the repository, open the terminal and `cd` to the repo's directory. Follow the example below:
   ```bash
   cd Documents/Shopper-main
   ```
4. If you're in the repository's directory, run the following command below to install the packages listed in `package.json`:
   ```bash
   npm install # or npm i
   ```
5. After everything is installed, get the `.env` file from one of the developers and paste it to the root directory. This is needed to access the app's database.
6. Run the app (through Expo) by entering this command:
   ```bash
   npx expo start --go
   ```
7. Press `A` for Android. (Follow other necessary instructions requested by Expo)
8. Done! You can run the app via Expo.

**Alternative:** If you do not want to build and install the app directly, go to [Releases](https://github.com/thekovie/Shopper/releases) and download the latest `.apk` file.

## Building the App (for Android)
1. Follow the instructions above from 1 to 4.
2. You need to get your physical or emulator Android device ready to install the build. Make sure USB debugging and allow installs from USB is allowed for physical devices.
3. If you're ready, run the command below:
   ```bash
   npx expo run:android --variant release
   ```
   Note: This process takes a very long, depending on whether you're using a physical or emulator device and your device's specs. You may also run into issues like lack of heap memory or unsupported sdk or ndk versions.
4. After building, the Metro Builder will setup and Select Android (or it will open your app automatically)

