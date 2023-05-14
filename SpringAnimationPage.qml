import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Dialogs 1.2
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.13
import QtQuick.Controls.Styles 1.4
import QtQuick.Controls.Material 2.1

Page {
    id: springAnimationPage

    SplitView {
        id: splitView
        anchors.fill: parent

        Rectangle {
            id: settingsPanel
            implicitWidth: 1 * splitView.width / 4
            anchors.margins: 20
            color: Material.theme == Material.Dark ? "#000439" : "#EBEBEB"

            Column {
                anchors.fill: parent
                anchors.margins: 10
                spacing: 5

                Label {
                    text: "damping:"
                    font.pointSize: 12
                }
                Slider {
                    id: damping
                    implicitWidth: settingsPanel.width - 10
                    value: movingRound.dampingValue
                    from: 0
                    to: 1

                    onValueChanged: {
                        movingRound.dampingValue = value
                    }
                }

                Label {
                    text: "spring:"
                    font.pointSize: 12
                }
                Slider {
                    id: spring
                    implicitWidth: settingsPanel.width - 10
                    value: movingRound.springValue
                    from: 0
                    to: 5

                    onValueChanged: {
                        movingRound.springValue = value
                    }
                }

                Label {
                    text: "epsilon:"
                    font.pointSize: 12
                }
                Slider {
                    id: epsilon
                    implicitWidth: settingsPanel.width - 10
                    value: movingRound.epsilonValue
                    from: 0
                    to: 1

                    onValueChanged: {
                        movingRound.epsilonValue = value
                    }
                }

                Label {
                    text: "mass:"
                    font.pointSize: 12
                }
                Slider {
                    id: mass
                    implicitWidth: settingsPanel.width - 10
                    value: movingRound.massValue
                    from: 0
                    to: 10

                    onValueChanged: {
                        movingRound.massValue = value
                    }
                }
            }
        }

        Rectangle {
            implicitWidth: 3 * splitView.width / 4
            anchors.margins: 20
            border.width: 3
            border.color: "black"
            radius: 5
            color: Material.theme === Material.Light ? "#EBEBEB" : "#000439"
            clip: true

            Label {
                anchors.centerIn: parent
                text: "Click Here!"
                font.pointSize: 22
            }


            Rectangle {
                id: movingRound
                width: 50; height: 50
                color: "red"
                radius: width/2

                property real springValue: 2
                property real dampingValue: 0.2
                property real epsilonValue: 0.01
                property real massValue: 1

                Behavior on x { SpringAnimation {
                        spring: movingRound.springValue;
                        damping: movingRound.dampingValue;
                        epsilon: movingRound.epsilonValue;
                        mass: movingRound.massValue;
                    }
                }
                Behavior on y { SpringAnimation {
                        spring: movingRound.springValue;
                        damping: movingRound.dampingValue;
                        epsilon: movingRound.epsilonValue;
                        mass: movingRound.massValue;
                    }
                }
            }

            MouseArea {
                anchors.fill: parent
                onClicked: (mouse) => {
                    movingRound.x = mouse.x - movingRound.width/2
                    movingRound.y = mouse.y - movingRound.height/2
                }
            }

        }
    }
}
