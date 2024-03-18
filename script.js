const container = document.getElementById('panZoomContainer');
const elements = document.querySelectorAll('.colored-element');
const element4 = document.getElementById('element4');
const element5 = document.getElementById('element5');
let isPanning = false;
let startOffsetX = 0;
let startOffsetY = 0;
let zoomScale = 1;
let initialDistance = 0;

function updateElementPositions(offsetX, offsetY) {
    elements.forEach((element, index) => {
        element.style.left = initialPositions[index].left + offsetX + 'px';
        element.style.top = initialPositions[index].top + offsetY + 'px';
    });
}

function updateCanvasSize() {
    const newWidth = Math.max(minWidth, window.innerWidth);
    const newHeight = Math.max(minHeight, window.innerHeight);

    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
}

container.addEventListener('mousedown', (e) => {
    isPanning = true;
    startOffsetX = e.clientX;
    startOffsetY = e.clientY;
});

container.addEventListener('mouseup', () => {
    isPanning = false;
    // Update the initial positions after each pan
    initialPositions.forEach((pos, index) => {
        pos.left = parseInt(elements[index].style.left);
        pos.top = parseInt(elements[index].style.top);
    });
});

container.addEventListener('mousemove', (e) => {
    if (isPanning) {
        const offsetX = (e.clientX - startOffsetX) / zoomScale;
        const offsetY = (e.clientY - startOffsetY) / zoomScale;

        updateElementPositions(offsetX, offsetY);
    }
});

container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    } else {
        isPanning = true;
        startOffsetX = e.touches[0].clientX;
        startOffsetY = e.touches[0].clientY;
    }
});

container.addEventListener('touchend', () => {
    isPanning = false;
    // Update the initial positions after each pan
    initialPositions.forEach((pos, index) => {
        pos.left = parseInt(elements[index].style.left);
        pos.top = parseInt(elements[index].style.top);
    });
});

container.addEventListener('touchmove', (e) => {
    if (isPanning && e.touches.length === 1) {
        const offsetX = (e.touches[0].clientX - startOffsetX) / zoomScale;
        const offsetY = (e.touches[0].clientY - startOffsetY) / zoomScale;

        updateElementPositions(offsetX, offsetY);
    } else if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        const deltaDistance = currentDistance - initialDistance;
        const scaleDelta = deltaDistance * 0.01; // Adjust this multiplier for sensitivity

        zoomScale += scaleDelta;
        zoomScale = Math.max(0.5, Math.min(zoomScale, 3)); // Limit zoom scale

        container.style.transform = `scale(${zoomScale})`;

        initialDistance = currentDistance;
    }
});

// Rest of your code...



function updateElementPositions(offsetX, offsetY) {
    elements.forEach((element, index) => {
        element.style.left = initialPositions[index].left + offsetX + 'px';
        element.style.top = initialPositions[index].top + offsetY + 'px';
    });
}

function updateCanvasSize() {


    const newWidth = Math.max(minWidth, window.innerWidth);
    const newHeight = Math.max(minHeight, window.innerHeight);

    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
}



container.addEventListener('mousedown', (e) => {
    isPanning = true;
    startOffsetX = e.clientX;
    startOffsetY = e.clientY;
});

container.addEventListener('mouseup', () => {
    isPanning = false;
    // Update the initial positions after each pan
    initialPositions.forEach((pos, index) => {
        pos.left = parseInt(elements[index].style.left);
        pos.top = parseInt(elements[index].style.top);
    });
});

container.addEventListener('mousemove', (e) => {
    if (isPanning) {
        const offsetX = (e.clientX - startOffsetX) / zoomScale;
        const offsetY = (e.clientY - startOffsetY) / zoomScale;

        updateElementPositions(offsetX, offsetY);
    }
});



// Add similar touch events for mobile devices if needed

container.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent the default behavior of scrolling

    // Adjust the zoom level based on scroll direction
    const zoomFactor = e.deltaY > 0 ? 0.90 : 1.10;

    // Get the cursor position relative to the container
    const cursorX = e.clientX - container.getBoundingClientRect().left;
    const cursorY = e.clientY - container.getBoundingClientRect().top;

    // Calculate the offset of the cursor position after zoom
    const offsetX = (cursorX - container.clientWidth / 2) * (1 - zoomFactor);
    const offsetY = (cursorY - container.clientHeight / 2) * (1 - zoomFactor);

    // Update the scale factor
    zoomScale *= zoomFactor;

    // Apply the zoom to the container
    container.style.transform = `scale(${zoomScale})`;
    

    // Update the canvas size and element positions
    updateCanvasSize();
    updateElementPositions(offsetX, offsetY);
});




// Call the updateCanvasSize function whenever the window is resized
window.addEventListener('resize', () => {
    updateCanvasSize();
    updateElementPositions(0, 0);
});


function openModal(imagePath) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImage');
  
    modal.style.display = 'block';
    modalImg.src = imagePath;
  }
  
  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
  }
  

function closeModal() {
  const modal = document.getElementById('imageModal');

  modal.style.display = 'none';

  // Enable scrolling on the background content
  document.body.style.overflow = 'auto';
}

// Close the modal if the user clicks outside the image
window.onclick = function (event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
};

let isImagesMode = true;

        const wordTexts = [
            "Your Word 1 Text",
            "Your Word 2 Text",
            // Add more text for other words as needed
        ];

        function showWords() {
            if (isImagesMode) {
                isImagesMode = false;
        
                // Hide image elements
                document.querySelectorAll('.image-element').forEach((element) => {
                    element.style.display = 'none';
                });
        
                // Show text elements
                document.querySelectorAll('.text-element').forEach((element) => {
                    element.style.display = 'block';
                });
        
                updateTextContent(wordTexts);
            }
        }
        
        function showImages() {
            if (!isImagesMode) {
                isImagesMode = true;
        
                // Hide text elements
                document.querySelectorAll('.text-element').forEach((element) => {
                    element.style.display = 'none';
                });
        
                // Show image elements
                document.querySelectorAll('.image-element').forEach((element) => {
                    element.style.display = 'block';
                });
        
                updateTextContent(wordTexts);
            }
        }

        

        // Add this to your existing script.js or in a <script> tag in the body of your HTML
function toggleNavigation() {
    var indexNavigation = document.getElementById('indexNavigation');
    indexNavigation.style.display = (indexNavigation.style.display === 'block') ? 'none' : 'block';
}


document.addEventListener('DOMContentLoaded', function () {
    const fixedLogo = document.getElementById('fixedLogo');

    fixedLogo.addEventListener('click', function () {
        location.reload(true); // Pass true to force a hard refresh
    });
});



// Function to set the initial position of an element
function setInitialPosition(element, offsetX, offsetY) {
    const initialPosition = {
        left: container.clientWidth / 2 - element.clientWidth / 2 + offsetX,
        top: container.clientHeight / 2 - element.clientHeight / 2 + offsetY
    };

    element.style.left = `${initialPosition.left}px`;
    element.style.top = `${initialPosition.top}px`;

    return initialPosition;
}

// Set initial position for element4
const initialPositionElement4 = setInitialPosition(element4, 0, 0);

// Set initial position for element5
const initialPositionElement5 = setInitialPosition(element5, 0, 0);

const initialPositionElement1 = setInitialPosition(element1, -550, 0);
const initialPositionElement6 = setInitialPosition(element6, -380, -220);
const initialPositionElement7 = setInitialPosition(element7, -100, -280);
const initialPositionElement8 = setInitialPosition(element8, 100, -250);
const initialPositionElement9 = setInitialPosition(element9, 320, -150);
const initialPositionElement10 = setInitialPosition(element10, 470, -30);
const initialPositionElement11 = setInitialPosition(element11, 250, 130);
const initialPositionElement12 = setInitialPosition(element12, -450, 140);
const initialPositionElement13 = setInitialPosition(element13, -70, 170);

//words
const initialPositionWordElement1 = setInitialPosition(wordelement1, -650, 0); //a ghost said Collage
const initialPositionWordElement6 = setInitialPosition(wordelement6, -530, -190); //dba
const initialPositionWordElement7 = setInitialPosition(wordelement7, -200, -280); //heaven knows what
const initialPositionWordElement8 = setInitialPosition(wordelement8, 100, -250);
const initialPositionWordElement9 = setInitialPosition(wordelement9, 320, -150);
const initialPositionWordElement10 = setInitialPosition(wordelement10, 470, 0); //more things
const initialPositionWordElement11 = setInitialPosition(wordelement11, 250, 180); //poor thigns
const initialPositionWordElement12 = setInitialPosition(wordelement12, -600, 180); //chatreuse
const initialPositionWordElement13 = setInitialPosition(wordelement13, -70, 240); //a ghost said


// Store the initial positions
const initialPositions = Array.from(elements).map(element => ({
    left: parseInt(element.style.left),
    top: parseInt(element.style.top)
}));




  