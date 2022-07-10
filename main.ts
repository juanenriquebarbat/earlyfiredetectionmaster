function sendAlert () {
    earlyFireDetection.sendToIFTTT(
    "alertaDoYourBit",
    "i6eXTfs6U4hv0qW6bok_jj9UNQZHbM65bwCA9xwHAyh",
    geo,
    t,
    h
    )
    basic.showLeds(`
        . . # . .
        . . # . .
        . # . # .
        # # # # #
        # . . . #
        `)
    basic.pause(2000)
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
        # # # # #
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    basic.pause(2000)
}
input.onButtonPressed(Button.A, function () {
    thingspeakChannel = "BZWIKCNTMPL35G2P"
    t = "21"
    h = "83"
    geo = "z.8"
    sendThingSpeak()
})
function wifiConnect () {
    earlyFireDetection.setupWifi(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate115200,
    "doyourbit",
    "microbitRules"
    )
    basic.pause(2000)
}
input.onButtonPressed(Button.AB, function () {
    earlyFireDetection.sendToIFTTT(
    "alertaDoYourBit",
    "i6eXTfs6U4hv0qW6bok_jj9UNQZHbM65bwCA9xwHAyh",
    "test_Alert",
    "90",
    "5"
    )
})
radio.onReceivedString(function (receivedString) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # # # # .
        # . . # .
        # # # # .
        # . # . .
        # . . # .
        `)
    values = receivedString.split(";")
    t = values[0]
    h = values[1]
    geo = values[2]
    if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == 838979899) {
        thingspeakChannel = "BZWIKCNTMPL35G2P"
    } else {
        thingspeakChannel = "U9RKX7N2LT2U9PIX"
    }
    sendThingSpeak()
    evalData()
})
input.onButtonPressed(Button.B, function () {
    thingspeakChannel = "U9RKX7N2LT2U9PIX"
    t = "19"
    h = "75"
    geo = "f.3"
    sendThingSpeak()
})
function evalData () {
    if (parseFloat(t) >= maxTemp && parseFloat(h) <= minHum) {
        sendAlert()
        basic.showIcon(IconNames.Umbrella)
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
    . . # . .
    . . . . .
    . . . . .
    `)
wifiConnect()
