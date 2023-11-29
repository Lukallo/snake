function appleEat () {
    if (applex == xsnake[0] && appley == ysnake[0]) {
        snakelength = snakelength + 1
        led.unplot(applex, appley)
        while (applex == xsnake[0] && appley == ysnake[0]) {
            applex = randint(0, 4)
            appley = randint(0, 4)
        }
        led.plot(applex, appley)
    }
}
function plotall () {
    while (plotIterator <= xsnake.length - 1) {
        led.plot(xsnake[plotIterator], ysnake[plotIterator])
        plotIterator = plotIterator + 1
    }
    plotIterator = 0
}
function unPlot () {
    while (unPlotIterator <= xsnake.length - 1) {
        led.unplot(xsnake[unPlotIterator], ysnake[unPlotIterator])
        unPlotIterator = unPlotIterator + 1
    }
    unPlotIterator = 0
}
function gyro () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
}
function lengthShift () {
    while (shiftIterator <= snakelength - 1) {
        xsnake[shiftIterator] = xsnake[shiftIterator - 1]
        ysnake[shiftIterator] = ysnake[shiftIterator - 1]
        shiftIterator = shiftIterator + 1
    }
    shiftIterator = 1
}
function start () {
    xsnake = [1]
    ysnake = [2]
    plotIterator = 0
    applex = 3
    appley = 2
    snakelength = 1
    appleEatIterator = 0
    shiftIterator = 1
    led.plot(applex, appley)
}
function direction () {
    if (Math.abs(pitch) > Math.abs(roll)) {
        if (0 > pitch) {
            ysnake[0] = ysnake[0] - 1
        } else if (0 < pitch) {
            ysnake[0] = ysnake[0] + 1
        }
    } else if (Math.abs(pitch) < Math.abs(roll)) {
        if (0 < roll) {
            xsnake[0] = xsnake[0] + 1
        } else if (0 > roll) {
            xsnake[0] = xsnake[0] - 1
        }
    }
}
function gameover () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(500)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(500)
    basic.showNumber(snakelength)
    basic.clearScreen()
    basic.showString("Game Over")
}
let appleEatIterator = 0
let shiftIterator = 0
let roll = 0
let pitch = 0
let unPlotIterator = 0
let plotIterator = 0
let snakelength = 0
let ysnake: number[] = []
let appley = 0
let xsnake: number[] = []
let applex = 0
start()
basic.forever(function () {
    if (xsnake[plotIterator] >= 0 && xsnake[plotIterator] <= 4 && (ysnake[plotIterator] >= 0 && ysnake[plotIterator] <= 4)) {
        unPlot()
        gyro()
        lengthShift()
        direction()
        appleEat()
        plotall()
        basic.pause(500)
    } else {
        gameover()
    }
})
