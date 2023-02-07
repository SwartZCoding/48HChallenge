// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Question from 'App/Models/Question'

export default class TestsController {
  public async insertQuestion() {
    await Database.table('questions').insert({
      type: 0,
      image: 'https://cdn.pixabay.com/photo/2013/07/13/12/51/lupe-160478_1280.png',
      question: 'Analysez les dossiers',
      description:
        'Vous trouverez ci-dessous 1 ZIP. Trouvez les 2 codes cachés afin de passer à la question suivante. (Séparez les codes par une virgule)',
      response: '3184,111221',
    })
  }

  public async show({ view, params }) {
    const question = await Question.findOrFail(params.id)

    return view.render('question', { question })
  }
}
