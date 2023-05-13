import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Dialogs 1.2
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.12
import QtQuick.Controls.Styles 1.4
import QtQuick.Controls.Material 2.12

Page {
    id: scaleAnimationPage

    Rectangle {
        id: firstDot
        width: 50
        height: 50
        color: "green"
        x: scaleAnimationPage.width*.3
        y: scaleAnimationPage.height/2 - 25
        radius: 100
        SequentialAnimation {
            running: true
            loops: Animation.Infinite
            ScaleAnimator {
                target: firstDot
                from: 1
                to: 0
                duration: 840
            }
            ScaleAnimator {
                target: firstDot
                from: 0
                to: 1
                duration: 840
            }
        }
    }

    Rectangle {
        id: secondDot
        width: 50
        height: 50
        color: "red"
        x: scaleAnimationPage.width*.4
        y: scaleAnimationPage.height/2 - 25
        radius: 100
        SequentialAnimation {
            running: true
            PauseAnimation { duration: 120 }
            SequentialAnimation {
                loops: Animation.Infinite
                ScaleAnimator {
                    target: secondDot
                    from: 1
                    to: 0
                    duration: 840
                }
                ScaleAnimator {
                    target: secondDot
                    from: 0
                    to: 1
                    duration: 840
                }
            }
        }
    }

    Rectangle {
        id: thirdDot
        width: 50
        height: 50
        color: "blue"
        x: scaleAnimationPage.width*.5
        y: scaleAnimationPage.height/2 - 25
        radius: 100
        SequentialAnimation {
            running: true
            PauseAnimation { duration: 240 }
            SequentialAnimation {
                loops: Animation.Infinite
                ScaleAnimator {
                    target: thirdDot
                    from: 1
                    to: 0
                    duration: 840
                }
                ScaleAnimator {
                    target: thirdDot
                    from: 0
                    to: 1
                    duration: 840
                }
            }
        }
    }

    Rectangle {
        id: fourthDot
        width: 50
        height: 50
        color: "orange"
        x: scaleAnimationPage.width*.6
        y: scaleAnimationPage.height/2 - 25
        radius: 100
        SequentialAnimation {
            running: true
            PauseAnimation { duration: 360 }
            SequentialAnimation {
                loops: Animation.Infinite
                ScaleAnimator {
                    target: fourthDot
                    from: 1
                    to: 0
                    duration: 840
                }
                ScaleAnimator {
                    target: fourthDot
                    from: 0
                    to: 1
                    duration: 840
                }
            }
        }
    }


}
