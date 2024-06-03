const express = require('express')
const { addMessages, getAllMessages } = require('../controllers/messageController')
const router = express.Router()

router.post("/addMessages",addMessages)
router.post("/getAllMessages",getAllMessages)

module.exports = router