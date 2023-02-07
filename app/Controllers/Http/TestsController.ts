// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Question from 'App/Models/Question'

export default class TestsController {
  public async insertQuestion() {
    await Database.table('questions').insert({
      type: 0,
      image:
        'https://cdn.discordapp.com/attachments/888041306075594752/1072167843614961675/rick-roll.gif',
      question: 'Trouvez le code ?',
      description: 'Dernière question avant la fin du test !',
      response: 'trouvé',
    })
  }

  public async verify({ params, request, response }) {
    // eslint-disable-next-line eqeqeq
    if (params.id == 1) {
      const question = await Question.findOrFail(1)
      const input = request.input('response')

      // eslint-disable-next-line eqeqeq
      if (input == question.response) {
        response.redirect().toPath('/question/' + (question.id + 1))
      } else {
        response.redirect().toPath('/question/1')
      }
    }
  }

  public async show({ view, params }) {
    // eslint-disable-next-line eqeqeq
    if (params.id == 5) {
      return view.render('buttons')
      // eslint-disable-next-line eqeqeq
    } else if (params.id == 6) {
      return view.render('buttons-2')
      // eslint-disable-next-line eqeqeq
    }  else if (params.id == 7) {
      return view.render('troll')
    } else {
      const question = await Question.findOrFail(params.id)
      return view.render('question', { question })
    }
  }
}
