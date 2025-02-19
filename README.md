# Redlib Dropdown Menu

This is a dropdown menu and instance switcher script for Redlib, designed to easily switch between various Redlib instances and update Reddit links accordingly.

## Features
- Customizable dropdown menu.
- Instance switching for Redlib.
- Supports Tampermonkey userscript for automatic integration with supported Redlib instances.

## Installation
1. **Install Tampermonkey**:
   - Tampermonkey extension for [Chrome](https://tampermonkey.net/chrome) and [Firefox](https://tampermonkey.net/firefox).

2. **Add the Script**:
   - Click the Tampermonkey icon in your browser, then click `Create a new script`.
   - Copy and paste the entire code from the Tampermonkey script above into the new script editor.
   - Save the script.

3. **Use the Dropdown**:
   - Once installed, you'll see a dropdown menu on supported Redlib instances.
   - Select an instance to switch to, and the links on the page will automatically update to reflect the selected instance.

## Notes
1. After selecting an instance (e.g., "example2.com"), links on the page will be updated to reflect that instance.
2. If you are on a page of the selected instance (e.g., "example2.com") and select it again in the dropdown menu, the URLs will be updated correctly.
3. On the first switch to a new instance, the links may not be updated immediately. To ensure the links reflect the new instance, manually choose it again from the dropdown. Once done, the links will stay on the selected instance until a new instance is chosen.

## License
MIT License. See LICENSE for details.
