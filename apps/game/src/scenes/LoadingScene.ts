import Phaser from 'phaser'
import CircularProgressCanvas from 'phaser3-rex-plugins/plugins/circularprogresscanvas.js'
import constants from '@/constants'

export default class LoadingScene extends Phaser.Scene {
  private circularProgress!: CircularProgressCanvas

  constructor() {
    super(constants.SCENES.LOADING)
  }

  preload() {
    this.load.baseURL = 'assets/'

    this.addLoader()
    this.addLoaderEvents()

    this.loadResources()
  }

  create() {
    this.input.setDefaultCursor(constants.CURSOR.DEFAULT)
  }

  private addLoader() {
    const { width, height } = this.cameras.main
    this.circularProgress = new CircularProgressCanvas(this, {
      x: width / 2,
      y: height / 2,
      radius: 50,

      trackColor: '#2442A4',
      barColor: '#fff',

      textSize: '26px',
      textStyle: 'bold',
      textFormatCallback: function (value) {
        return (100 - Math.floor(value * 100)).toString()
      },
      textColor: constants.FONT.COLOR,
      textFamily: constants.FONT.FAMILY,

      valuechangeCallback(
        newValue: number,
        oldValue: number,
        circularProgress: CircularProgressCanvas
      ): void {},

      value: 0,
    })
    this.add.existing(this.circularProgress)
  }

  private addLoaderEvents() {
    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
      this.circularProgress.easeValueTo(value)
    })

    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.circularProgress.destroy()

      this.scene.stop(constants.SCENES.LOADING)
      this.scene.switch(constants.SCENES.MAIN_MENU)
    })
  }

  private loadResources() {
    this.load.image('cursor-hand', 'images/cursor_hand.png')
    this.load.image('bird_001', 'images/bird_001.png')
  }
}
