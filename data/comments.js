const { compile } = require("ejs");

const comments = [
    {
        id : 1,
        bookId : 1,
        userId : 1,
        comment : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur"
    },
    {
        id: 2,
        bookId: 3,
        userId: 2,
        comment: "aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est"
    },
    {
        id: 3,
        bookId: 1,
        userId: 1,
        comment: "qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore"
    },
    {
        id: 4,
        bookId: 1,
        userId: 3,
        comment: "magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam"
    },
    {
        id: 5, 
        bookId: 3,
        userId: 2,
        comment: "nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae"
    },
    {
        id: 6,
        bookId: 2,
        userId: 1,
        comment: "consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"
    },
    {
        id: 7,
        bookId: 4,
        userId: 3,
        comment: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum"
    },
    {
        id: 8,
        bookId: 5,
        userId: 1,
        comment: "deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati "
    },
    {
        id: 9,
        bookId: 6,
        userId: 2,
        comment: "cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi"
    }
]

module.exports = comments;