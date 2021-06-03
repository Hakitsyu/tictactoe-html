export default (context) => {
    const line = (fromX, fromY, toX, toY, style) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = 4;
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.strokeStyle = style || '#6665FB';
        context.stroke();
    }

    const x = (boxSize, boxFromX, boxFromY, padding) => {
        // Left Line
        const leftToX = boxFromX + boxSize;
        const leftToY = boxFromY + boxSize;
        line(boxFromX + padding, boxFromY + padding, leftToX - padding, leftToY - padding, 'white');   

        // Right Line
        const rightToX = boxFromX;
        const rightToY = boxFromY + boxSize;
        line(boxFromX + boxSize - padding, boxFromY + padding, rightToX + padding, rightToY - padding, 'white');
    }

    const circle = (line, column, boxSize, boxFromX, boxFromY, style) => {
        const boxCenterX = boxSize / 2;
        const boxCenterY = boxSize / 2;
        const centerX = (column * boxSize) + boxCenterX;
        const centerY = (line * boxSize) + boxCenterY;

        context.beginPath();
        context.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        context.strokeStyle = style || '#6665FB';
        context.stroke();
    }

    return { line, x, circle }
}