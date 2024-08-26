const Response = require('../models/response');
const User = require('../models/user');
const Questionnaire = require('../models/questionnaire');


module.exports = {
    Create: async (req, res) => {
        try {

            const userId = req.user._id;

            const questionnaireIds = req.body.questionnaire;


            const newResponse = new Response({
                author: userId,
                questionnaire: questionnaireIds,
                answers: req.body.answers
            });

            await newResponse.save();

            res.status(201).json({
                success: true,
                message: "Response saved successfully",
                response: newResponse
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    ListByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const responses = await Response.find({ author: userId }).populate('questionnaire', 'text options').populate('author', 'userName email');

            res.status(200).json({
                success: true,
                responses
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    ListByQuestinonaire: async (req, res) => {
        try {
            const questionnaireId = req.params.questionnaireId;
            const responses = await Response.find({ questionnaire: questionnaireId }).populate('author', 'userName email').populate('questionnaire', 'text options');

            res.status(200).json({
                success: true,
                responses
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

}

