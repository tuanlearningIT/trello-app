
let getHomePage = async (req, res) => {
    try {
        // let data = await db.User.findAll();
        // return res.render('homePage.ejs', {
        //     data: JSON.stringify({})
        // });
        return res.end('hello world')
    }
    catch (e) {

        console.log(e)
    }

}


module.exports = {
    getHomePage,

}