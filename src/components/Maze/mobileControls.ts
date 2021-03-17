import React from 'react'
import { isIfStatement } from 'typescript';

let isSwiping = false;
let startPosition: (null | { x: number; y: number }) = null;

// when user first touches screen
export const handleScreenTouch = (e: TouchEvent) => {
    let position = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY,
    }
    startPosition = position;
}

// when user is moving their finger on the screen
export const handleSwipe = (e: TouchEvent) => {
    isSwiping = true;
}

// when user takes their finger off the screen
export const handleScreenTouchEnd = (e: TouchEvent) => {
    const position = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
    }
    // if use wasn't swiping, return false
    if (!isSwiping || !startPosition) return false

    // calculating slope looks different due to smaller y values being at top of page
    const slope = (position.y - startPosition.y) / (startPosition.x - position.x)
    
    isSwiping = false

    if (slope <= -1 || slope >= 1) {
        if (position.y < startPosition.y) return 'up'
        else return 'down'
    } else {
        if (position.x > startPosition.x) return 'right'
        else return 'left'
    }

}
