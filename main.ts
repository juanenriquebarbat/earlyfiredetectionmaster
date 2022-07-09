function playAlert () {
    music.playTone(523, music.beat(BeatFraction.Whole))
}
function sendAlert () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    earlyFireDetection.sendToIFTTT(
    "alertaDoYourBit",
    "i6eXTfs6U4hv0qW6bok_jj9UNQZHbM65bwCA9xwHAyh",
    geo,
    t,
    h
    )
    basic.showIcon(IconNames.Target)
}
function sendThingSpeak () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    earlyFireDetection.sendToThinkSpeak(
    thingspeakChannel,
    parseFloat(t),
    parseFloat(h),
    0,
    0,
    0,
    0,
    0,
    0
    )
    basic.showLeds(`
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    sendThingSpeak()
    basic.showLeds(`
        . . # . .
        . . # . .
        . # . # .
        # # # # #
        # . . . #
        `)
})
function wifiConnect () {
    earlyFireDetection.setupWifi(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate115200,
    "doyourbit",
    "microbitRules"
    )
    if (earlyFireDetection.wifiOK()) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
        wifiConnect()
    }
}
input.onButtonPressed(Button.AB, function () {
    sendAlert()
    basic.showLeds(`
        # # # . .
        # . . . .
        # . . . .
        # . . . .
        # # # . .
        `)
})
radio.onReceivedString(function (receivedString) {
    values = receivedString.split(";")
    t = values[0]
    h = values[1]
    geo = values[2]
    if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == 838979899) {
        thingspeakChannel = "BZWIKCNTMPL35G2P"
    } else {
        thingspeakChannel = "U9RKX7N2LT2U9PIX"
    }
    if (earlyFireDetection.wifiOK()) {
        sendThingSpeak()
        evalData()
    } else {
        basic.showIcon(IconNames.No)
        wifiConnect()
    }
})
input.onButtonPressed(Button.B, function () {
    wifiConnect()
    basic.showLeds(`
        # # # . .
        # . # . .
        # # # # .
        # . . # .
        # # # # .
        `)
})
function evalData () {
    if (parseFloat(t) >= maxTemp && parseFloat(h) <= minHum) {
        playAlert()
        sendAlert()
    }
}
let values: string[] = []
let thingspeakChannel = ""
let h = ""
let t = ""
let geo = ""
let minHum = 0
let maxTemp = 0
radio.setGroup(1)
maxTemp = 60
minHum = 20
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
wifiConnect()
control.inBackground(function () {
    if (earlyFireDetection.wifiOK()) {
        basic.pause(60000)
        wifiConnect()
    }
})
