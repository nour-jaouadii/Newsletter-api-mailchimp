// jshint esversion:6
const express = require(`express`)
const app = express()
const port = 3000
const mailchimp = require(`@mailchimp/mailchimp_marketing`)
 
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: true }))
 
app.get(`/`, (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})
//  0d578c80c33ff3ce4d9699962b85075f-us20
mailchimp.setConfig({
    apiKey: `98d4a682c10a61e222b326e670653c03-us20`,
    server: `us20`,

});
 
app.post(`/`, (req, res) => {
    const firstName = req.body.firstNameInput
    const lastName = req.body.lastNameInput
    const email = req.body.emailInput
 
    // console.log(firstName, lastName, email)
 
    const listId = `53c1b19614`
 
    const run = async () => {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        })
        // console.log(response)
    }
    run()
})
 
 
app.listen(port, () => {
    console.log(`server running on http://www.localhost:${port}`)
})