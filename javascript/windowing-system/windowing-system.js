// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */

//1. Define Size for storing the dimensions of the window
export function Size (width = 80, height = 60) {
    this.width = width;
    this.height = height;
}

Size.prototype.resize = function(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
}

// 2. Define  Position to store a window position
export function Position (x = 0, y = 0) {
    this.x = x;
    this.y = y;
};

Position.prototype.move = function(newX, newY) {
    this.x = newX;
    this.y = newY;
}

// 3. Define a ProgramWindow class
// Define the ProgramWindow class
export class ProgramWindow {
    // Constructor to initialize the ProgramWindow instance
    constructor() {
        // screenSize holds a fixed value of type Size with width 800 and height 600
        this.screenSize = new Size(800, 600);
        // size holds a value of type Size, initialized to default values (width 80, height 60)
        this.size = new Size();
        // position holds a value of type Position, initialized to default values (x 0, y 0)
        this.position = new Position();
    }

    // 4. Method to resize the window
    resize(newSize) {
        // Calculate the maximum width the window can have based on its current position
        const maxWidth = this.screenSize.width - this.position.x;
        // Calculate the maximum height the window can have based on its current position
        const maxHeight = this.screenSize.height - this.position.y;

        // Set the new width, ensuring it is within the bounds (minimum 1, maximum maxWidth)
        this.size.width = Math.max(1, Math.min(newSize.width, maxWidth));
        // Set the new height, ensuring it is within the bounds (minimum 1, maximum maxHeight)
        this.size.height = Math.max(1, Math.min(newSize.height, maxHeight));
    }

    // Method to move the window
    move(newPosition) {
        // Calculate the maximum x position the window can have based on its current size
        const maxX = this.screenSize.width - this.size.width;
        // Calculate the maximum y position the window can have based on its current size
        const maxY = this.screenSize.height - this.size.height;

        // Set the new x position, ensuring it is within the bounds (minimum 0, maximum maxX)
        this.position.x = Math.max(0, Math.min(newPosition.x, maxX));
        // Set the new y position, ensuring it is within the bounds (minimum 0, maximum maxY)
        this.position.y = Math.max(0, Math.min(newPosition.y, maxY));
    }
}
// 6. Change a program window
export function changeWindow(programWindow) {
    const newSize = new Size(400, 300);
    const newPosition = new Position(100, 150);

    programWindow.resize(newSize);
    programWindow.move(newPosition);

    return programWindow;
}
