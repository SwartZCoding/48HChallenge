// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class TestsController {
  public async insertQuestion() {
    await Database.table('questions').insert({
      type: 0,
      image:
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/329184434_6197413313602101_8651905967376759687_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=88pi4y-0_UAAX9P6zbl&_nc_ht=scontent-cdt1-1.xx&oh=00_AfA6xve1FelXLmvp7HvOvRUM5b5S1nBnoihhE0sN_5FIDQ&oe=63E66892',
      question: 'Trouvez le mot de passe de Henry Xazetui',
      description: '',
      response: 'Max',
    })
  }
}
