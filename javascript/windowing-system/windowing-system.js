// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */

//1
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
export class ProgramWindow {
    constructor() {
        this.screenSize = new Size(800, 600);
        this.size = new Size();
        this.position = new Position();
    }

    // 4. Add a method to resize the window
    resize(newSize) {
        const maxWidth = this.screenSize.width - this.position.x;
        const maxHeight = this.screenSize.height - this.position.y;

        this.size.width = Math.max(1, Math.min(newSize.width, maxWidth));
        this.size.height = Math.max(1, Math.min(newSize.height, maxHeight))
    }

    // 5. Add a method to move the window
    move(newPosition) {
        const maxX = this.screenSize.width - this.size.width;
        const maxY = this.screenSize.height - this.size.height;

        this.position.x = Math.max(0, Math.min(newPosition.x, maxX));
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
