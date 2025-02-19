// ==UserScript==
// @name         Redlib Dropdown Menu
// @namespace    https://github.com/RilleCode/redlib-dropdown-menu
// @version      1.0
// @description  Adds a custom dropdown menu to switch between Redlibs instances and update Reddit links accordingly. See note below.
// @author       RilleCode
// @match http://red.lpoaj7z2zkajuhgnlltpeqh3zyq7wk2iyeggqaduhgxhyajtdt2j7wad.onion/*
// @match https://l.opnxng.com/*
// @match https://libreddit.bus-hit.me/*
// @match https://red.artemislena.eu/*
// @match https://red.ngn.tf/*
// @match https://reddit.nerdvpn.de/*
// @match https://redlib.baczek.me/*
// @match https://redlib.catsarch.com/*
// @match https://redlib.ducks.party/*
// @match https://redlib.freedit.eu/*
// @match https://redlib.kittywi.re/*
// @match https://redlib.nadeko.net/*
// @match https://redlib.perennialte.ch/*
// @match https://redlib.r4fo.com/*
// @match https://rl.bloat.cat/*
// @match https://safereddit.com/*
// @grant        GM_addStyle
// ==/UserScript==

/*
Note:
1. After selecting an instance (e.g., "example2.com"), links on the page will be updated to reflect that instance.
2. If you are on a page of the selected instance (e.g., "example2.com") and select it again in the dropdown menu, the URLs will be updated correctly.
3. On the first switch to a new instance, the links may not be updated immediately. To ensure the links reflect the new instance, manually choose it again from the dropdown. Once done, the links will stay on the selected instance until a new instance is chosen.
*/

GM_addStyle(`
:root {
  --accented: #d54455;
  --checkmark: #4caf50;
  --bg-color: #1a1a1b;
  --border-color: #444;
  --menu-hover: #333;
  --span-after: #b3b3b3;
  --text-color: #f0f0f0;
}

/* #region dropdown */
.custom-dropdown {
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  display: none;
  font-family: Arial, sans-serif;
  left: 0;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 10;
}

.custom-dropdown:hover {
  border-color: var(--accented);
}

.custom-dropdown.sticky {
  top: 0px;
  z-index: 10;
}

.align-wrapper {
  display: flex;
  justify-content: start;
  width: 100%;
}
/* #endregion */

/* #region hamburger menu */
.hamburger {
  border-radius: 6px;
  border: 1px solid var(--accented);
  cursor: pointer;
  left: 5px;
  padding: 5px;
  position: fixed;
  top: 106px;
  z-index: 10;
}

.hamburger:hover {
  background-color: var(--accented);
  border-color: var(--bg-color);
}

.hamburger span {
  background-color: var(--text-color);
  display: block;
  height: 3px;
  margin: 5px 0;
  transition: 0.3s;
  width: 25px;
}

.hamburger.open span:nth-child(1) {
  position: relative;
  top: 8px;
  transform: rotate(-45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  position: relative;
  top: -8px;
  transform: rotate(45deg);
}
/* #endregion */

/* #region toggle buttons */
.custom-dropdown .toggle-btns {
  align-items: center;
  display: flex;
  padding: 10px 0;
}

.toggle-btns button {
  align-items: center;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  margin-right: 8px;
  padding: 8px;
  width: 30px;
}
#instance-ok-btn {
  color: var(--checkmark);
}

.toggle-btns {
  background-color: transparent !important;
  z-index: 10;
}

.toggle-btns button:hover {
  background-color: var(--menu-hover) !important;
  border-color: var(--accented);
}

.toggle-btns span::after {
  content: none !important;
}
/* #endregion */

/* #region instance selector */
#instance-selector-container {
  align-items: center;
  color: var(--text-color);
  display: flex;
  margin: 0 8px;
}

#instance-selector {
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  padding: 0 8px;
  max-height: 30px;
}

#instance-selector:hover {
  background-color: var(--menu-hover);
  border-color: var(--accented);
}

#instance-popup {
  background-color: #a93745;
  border: 5px solid var(--bg-color);
  border-radius: 8px;
  box-shadow: 0px 4px 15px 4px var(--accented);
  color: #121212;
  font-size: 26px;
  line-height: 100px;
  width: 80%;
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  padding: 0 24px;
}

#instance-popup.show {
  opacity: 1;
  visibility: visible;
}

#instance-popup .popup-text {
  color: #000;
  font-weight: bold;
}

/* #endregion */

/* #region menu */
.menu {
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  position: relative;
}

.menu li a {
  color: var(--text-color);
  display: block;
  text-decoration: none !important;
  transition: color 0.3s ease;
}
/* #endregion */

/* #region submenu */
.menu .submenu {
  background-color: var(--bg-color);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid var(--border-color);
  border-top: none;
  display: none;
  left: 0;
  list-style: none;
  margin: 0;
  max-height: 80vh;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  top: 100%;
  width: auto;
}

.menu .submenu li {
  padding: 8px 12px;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.menu li:hover > .submenu {
  border-color: var(--accented);
  display: block;
}

.menu .submenu li a {
  color: var(--text-color);
  cursor: pointer;
  text-decoration: none;
}

.menu li:hover {
  background-color: var(--menu-hover);
  cursor: default;
}

.menu .submenu li a:hover, .menu li a:hover {
  background-color: transparent;
  color: var(--text-color);
  text-decoration: underline !important;
  text-decoration-color: var(--accented) !important;
}

.menu li > span::after {
  color: var(--span-after);
  content: "\\2193";
  font-size: 12px;
  margin-left: 1px;
}
.menu li:hover > span::after {color: var(--accented) !important;}
/* #endregion */

/*
  Custom styling for Redlib:
  - Hide the navbar
  - Sets all post flairs to the same background and text color
  - Hides GIFs in comments

  To revert to default styling, remove the styles below.
  */

nav.fixed_navbar {
  position: fixed;
  z-index: 1;
}

#feed_list {
  z-index: 20;
}

.post_flair {
  background-color: transparent !important;
  border: 1px solid var(--accented) !important;
  color: var(--text-color) !important;
}

img[src*="/preview/external-pre/"] {
  display: none;
}

/* ----------------- */
`);

const menuHTML = `
<div class="custom-dropdown">
    <ul class="menu">
 <div id="instance-selector-container">
  <select id="instance-selector">
    <option value="https://safereddit.com">safereddit.com</option>
    <option value="https://l.opnxng.com">l.opnxng.com</option>
    <option value="https://libreddit.bus-hit.me">libreddit.bus-hit.me</option>
    <option value="https://redlib.catsarch.com">redlib.catsarch.com</option>
    <option value="https://redlib.freedit.eu">redlib.freedit.eu</option>
    <option value="https://redlib.perennialte.ch">redlib.perennialte.ch</option>
    <option value="https://rl.bloat.cat">rl.bloat.cat</option>
    <option value="https://redlib.ducks.party">redlib.ducks.party</option>
    <option value="https://red.ngn.tf">red.ngn.tf</option>
    <option value="https://red.artemislena.eu">red.artemislena.eu</option>
    <option value="https://redlib.kittywi.re">redlib.kittywi.re</option>
    <option value="https://redlib.privacyredirect.com">redlib.privacyredirect.com</option>
	<option value="https://redlib.r4fo.com">redlib.r4fo.com</option>
    <option value="https://reddit.nerdvpn.de">reddit.nerdvpn.de</option>
    <option value="https://redlib.baczek.me">redlib.baczek.me</option>
    <option value="https://redlib.nadeko.net">redlib.nadeko.net</option>
    <option value="http://red.lpoaj7z2zkajuhgnlltpeqh3zyq7wk2iyeggqaduhgxhyajtdt2j7wad.onion">red.lpoaj7z2.onion</option>
  </select>
 </div>
        <li class="toggle-btns">
            <button id="instance-ok-btn" title="Confirm instance change">✔</button>
            <button id="toggleTop0" title="Fix menu position to the top">📍</button>
            <button id="toggleTop50" title="Offset menu position below Redlib's navbar">📌</button>
        </li>
        <div class="align-wrapper">
            <li><a href="https://safereddit.com/r/all">r/All</a></li>
            <li><a href="https://safereddit.com/r/popular">r/Popular</a></li>
            <li>
                <span>Animals</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/BerneseMountainDogs">r/BerneseMountainDogs</a></li>
                    <li><a href="https://safereddit.com/r/GoldenRetrievers">r/GoldenRetrievers</a></li>
                    <li><a href="https://safereddit.com/r/Cats">r/Cats</a></li>
                </ul>
            </li>
            <li>
                <span>News</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/WorldNews">r/WorldNews</a></li>
                    <li><a href="https://safereddit.com/r/News">r/News</a></li>
                    <li><a href="https://safereddit.com/r/TechnologyNews">r/TechnologyNews</a></li>
                </ul>
            </li>
            <li>
                <span>Humor</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/funny">r/Funny</a></li>
                    <li><a href="https://safereddit.com/r/memes">r/Memes</a></li>
                    <li><a href="https://safereddit.com/r/dankmemes">r/DankMemes</a></li>
                </ul>
            </li>
            <li>
                <span>Gaming</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/gaming">r/Gaming</a></li>
                    <li><a href="https://safereddit.com/r/pcgaming">r/PCGaming</a></li>
                </ul>
            </li>
            <li>
                <span>Knowledge</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/AskReddit">r/AskReddit</a></li>
                    <li><a href="https://safereddit.com/r/TodayILearned">r/TodayILearned</a></li>
                    <li><a href="https://safereddit.com/r/InterestingAsFuck">r/InterestingAsFuck</a></li>
                </ul>
            </li>
            <li>
                <span>Tech</span>
                <ul class="submenu">
                    <li><a href="https://safereddit.com/r/Technology">r/Technology</a></li>
                    <li><a href="https://safereddit.com/r/Science">r/Science</a></li>
                </ul>
            </li>
        </div>
    </ul>
</div>
<div class="hamburger">
    <span></span><span></span><span></span>
</div>
`;
// Injecting the menu into the page (placing it directly beneath the navbar)
document.body.insertAdjacentHTML('afterbegin', menuHTML);

// Toggle the dropdown menu when the hamburger is clicked
const hamburger = document.querySelector('.hamburger');
const dropdownMenu = document.querySelector('.custom-dropdown');

// Restore menu position from localStorage on page load
const savedTop = localStorage.getItem('menuTop');
if (savedTop) {
    dropdownMenu.style.top = savedTop;
    dropdownMenu.style.position = savedTop === '0px' ? 'fixed' : 'absolute';
} else {
    dropdownMenu.style.top = '50px'; // Default position
    dropdownMenu.style.position = 'absolute';
}

// Save menu state (open/closed) to localStorage
const savedMenuState = localStorage.getItem('menuOpen');
if (savedMenuState === 'true') {
    dropdownMenu.style.display = 'block';
    hamburger.classList.add('open');
} else {
    dropdownMenu.style.display = 'none';
}

// Toggle menu visibility
hamburger.addEventListener('click', () => {
    const isMenuOpen = dropdownMenu.style.display === 'block';
    hamburger.classList.toggle('open');
    dropdownMenu.style.display = isMenuOpen ? 'none' : 'block';
    localStorage.setItem('menuOpen', !isMenuOpen); // Save open/closed state
});

// Buttons to toggle the top margin of the menu
const toggleTop0 = document.getElementById('toggleTop0');
const toggleTop50 = document.getElementById('toggleTop50');

// Save menu position when buttons are clicked
toggleTop0.addEventListener('click', () => {
    dropdownMenu.style.top = '0px';
    dropdownMenu.style.position = 'fixed';
    localStorage.setItem('menuTop', '0px');
});

toggleTop50.addEventListener('click', () => {
    dropdownMenu.style.top = '50px';
    dropdownMenu.style.position = 'fixed';
    localStorage.setItem('menuTop', '50px');
});

// Scroll detection to hide the menu when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        hamburger.style.display = 'none'; // Hide hamburger on scroll down
    } else {
        // Scrolling up
        hamburger.style.display = 'block'; // Show hamburger on scroll up
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});

(function() {
    'use strict';

    // Add popup div
    const popup = document.createElement('div');
    popup.id = 'instance-popup';
    document.body.appendChild(popup);

    // Function to show popup
    function showPopup(message) {
        popup.innerHTML = message; // Use innerHTML to allow HTML content
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 2000);
    }

    // Function to update all links to use the selected instance
    function updateLinks(instance) {
        const links = document.querySelectorAll('a[href*="/r/"]');
        const urlRegex = /^https?:\/\/[^/]+/;
        links.forEach(link => {
            link.href = link.href.replace(urlRegex, instance);
        });
    }

    // Restore instance from localStorage and update links
    const storedInstance = localStorage.getItem('selectedInstance');
    if (storedInstance) {
        updateLinks(storedInstance);
        document.getElementById('instance-selector').value = storedInstance; // Update selector
    }

    // Handle instance selection
    document.getElementById('instance-ok-btn').addEventListener('click', () => {
        const selectedInstance = document.getElementById('instance-selector').value;

        // Save the selected instance to localStorage
        localStorage.setItem('selectedInstance', selectedInstance);

        // Update all relevant links
        updateLinks(selectedInstance);

        // Show confirmation popup with bold text on the selected instance
        showPopup(`Instance changed to <span class="popup-text">${selectedInstance}</span>`);
    });

    // Ensure links are updated on initial page load and page navigation
    function applyInstanceLinks() {
        const storedInstance = localStorage.getItem('selectedInstance');
        if (storedInstance) {
            updateLinks(storedInstance);
        }
    }

    // Immediately update links when the DOM is fully loaded (including any page load or reload)
    window.addEventListener('load', applyInstanceLinks);

    // Listen to hash change (for single-page apps or when using browser history navigation)
    window.addEventListener('hashchange', applyInstanceLinks);

    // Listen to popstate (for back and forward button navigation)
    window.addEventListener('popstate', applyInstanceLinks);

    // Force update links when navigating or reloading
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('selectedInstance', document.getElementById('instance-selector').value);
    });

    // Intercept all clicks on links to ensure they have the correct instance before navigating
    document.body.addEventListener('click', (event) => {
        const target = event.target;

        // If the clicked element is a link
        if (target && target.tagName.toLowerCase() === 'a' && target.href.includes('/r/')) {
            const selectedInstance = localStorage.getItem('selectedInstance');
            if (selectedInstance) {
                // Modify the link href before navigating
                target.href = target.href.replace(/^https?:\/\/[^/]+/, selectedInstance);
            }
        }
    });

})();