// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChronometersController {
  public async start(response) {
    let startTime = Date.now()

    setInterval(() => {
      const elapsedTime = Date.now() - startTime
      response.send(elapsedTime)
    }, 1000)
  }
}
