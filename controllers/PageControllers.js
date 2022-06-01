const viewMain = (req,res) =>{
    res.render('home')
}

const viewTables = (req,res) =>{
    res.render('tables')
}

const viewNotifications = (req,res) =>{
    res.render('notifications')
}

const viewMapGiant = (req,res) => {
    res.render('index')
}

module.exports = {
    viewMain,
    viewTables,
    viewNotifications,
    viewMapGiant
}