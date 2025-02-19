# Redlib Dropdown Menu

This is a dropdown menu and instance switcher script for Redlib, designed to easily switch between various Redlib instances and update Reddit links accordingly.  
Redlib repository: [Redlib GitHub](https://github.com/redlib-org/redlib).

<img src="https://raw.githubusercontent.com/RilleCode/redlib-dropdown-menu/main/menu-example-1.png" alt="Screenshot 1" width="884" height="279">

<img src="https://raw.githubusercontent.com/RilleCode/redlib-dropdown-menu/main/menu-example-2.png" alt="Screenshot 2" width="881" height="279">

## Compatibility
This script has been tested on Firefox. It should work on other browsers, but it has not been tested extensively outside of Firefox.

## Features
- Customizable dropdown menu, add your favorite subreddits.
- Instance switching for Redlib.
- Supports Tampermonkey for automatic integration with supported Redlib instances.

## Installation
1. **Install Tampermonkey**:
   - Tampermonkey extension for [Chrome](https://tampermonkey.net/chrome) or [Firefox](https://tampermonkey.net/firefox).

2. **Add the Script**:
   - Click the Tampermonkey icon in your browser, then click `Create a new script`.
   - Copy and paste the entire code from `redlib-dropdown-menu.user.js` into the Tampermonkeys script editor.
   - Save the script.

3. **Use the Dropdown**:
- Once installed, you'll see a dropdown menu on supported Redlib instances.
- Select an instance to switch to, and the links on the page will update to reflect the selected instance. **See notes below**.
- You can toggle the position of the dropdown menu: it can either be placed at the top (hiding the Redlib menu) or below the Redlib menu.

## Notes
1. After selecting an instance (e.g., "example2.com"), links on the page will be updated to reflect that instance.
2. If you are on a page of the selected instance (e.g., "example2.com") and select it again in the dropdown menu, the URLs will be updated correctly.
3. On the first switch to a new instance, the links may not be updated immediately. To ensure the links reflect the new instance, manually choose it again from the dropdown. Once done, the links will stay on the selected instance until a new instance is chosen.

## License
MIT License. See LICENSE for details.
