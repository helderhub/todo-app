// Function to create the heading elements
function createHeading() {
    const headingContainer = document.getElementById('headingContainer');
    const headingText = 'TO DO LIST'; // Add spaces between the words
    for (let char of headingText) {
        if (char === ' ') {
            // Create a span element for spaces
            const spaceElement = document.createElement('span');
            spaceElement.className = 'space';
            spaceElement.innerHTML = '&nbsp;'; // Non-breaking space
            headingContainer.appendChild(spaceElement);
        } else {
            const headingElement = document.createElement('h1');
            headingElement.className = 'card';
            headingElement.innerText = char;

            // Apply a random rotation between -15 and 15 degrees
            const randomRotation = Math.floor(Math.random() * 31) - 15;
            headingElement.style.transform = `rotate(${randomRotation}deg)`;

            headingContainer.appendChild(headingElement);
        }
    }
}

// Call the functions to create the heading elements and random cards
createHeading();