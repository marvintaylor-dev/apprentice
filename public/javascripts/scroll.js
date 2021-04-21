const move = document.querySelectorAll('.navigation')

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            const left = () => move[0].click()
            left()
            break;
        case "ArrowRight":
            // Right pressed
            const right = () => move[1].click()
            right()
            break;
    }
})

