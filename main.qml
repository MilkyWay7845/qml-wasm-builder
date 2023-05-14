import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Dialogs 1.2
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.12
import QtQuick.Controls.Styles 1.4
import QtQuick.Controls.Material 2.12

ApplicationWindow {
    id: mainWindow
    width: 640
    height: 480
    visible: true
    title: qsTr("AnimationDemo")

    property real currentTheme: Material.Light
    Material.theme: currentTheme

    Action {
        id: navigateAction
        onTriggered: {
            drawer.open()
        }
    }

    header: ToolBar {
                id: header
                height: 60

                Material.background: Material.theme == Material.Dark ? "#14212a" : "#b2b2b2"

                RowLayout {
                    id: headerLayout
                    anchors.fill: parent
                    anchors.rightMargin: 20

                    RowLayout {
                        ToolButton {
                            action: navigateAction
                            icon.source: "qrc:/icons/icons/burger-menu.svg"
                        }

                        ToolButton {
                            icon.source: Material.theme === Material.Dark ? "qrc:/icons/icons/sun.svg" : "qrc:/icons/icons/moon.svg"
                            onClicked: {
                                mainWindow.currentTheme = Material.theme === Material.Light ? Material.Dark : Material.Light
                            }
                        }
                    }
                }
            }

            Drawer {
                id: drawer
                width: 300
                height: mainWindow.height
                interactive: true


                ListView {
                    id: listView

                    focus: true
                    currentIndex: -1
                    anchors.fill: parent


                    delegate: ItemDelegate {
                        width: listView.width
                        height: 60
                        highlighted: hovered

                        icon.source: model.icon

                        Label {
                            text: model.title
                            anchors.fill: parent
                            anchors.leftMargin: 20
                            verticalAlignment: Text.AlignVCenter
                            elide: Text.ElideRight
                            leftPadding: 30
                            font.family: "ALS Schlange sans"
                            font.pixelSize: 20
                            font.capitalization: Font.Capitalize
                            font.weight: Font.Bold
                        }

                        onClicked: {
                            listView.currentIndex = index
                            stackView.pop()
                            stackView.push(model.source)
                            drawer.close()
                        }


                    }

                    model: ListModel {
                        ListElement { title: "ScaleAnimation"; source: "qrc:/source/ScaleAnimationPage.qml"; icon: "qrc:/icons/icons/scale.svg" }
                        ListElement { title: "SpringAnimation"; source: "qrc:/source/SpringAnimationPage.qml"; icon: "qrc:/icons/icons/spring.svg" }
                        ListElement { title: "ColorAnimation"; source: "qrc:/source/ScaleAnimationPage.qml"; icon: "qrc:/icons/icons/color.svg" }
                        ListElement { title: "OpacityAnimation"; source: "qrc:/source/ScaleAnimationPage.qml"; icon: "qrc:/icons/icons/opacity.svg" }
                    }

                    ScrollIndicator.vertical: ScrollIndicator { }
                }
            }

            StackView {
                id: stackView
                anchors.fill: parent
                initialItem: "qrc:/source/ScaleAnimationPage.qml"

            }
}
