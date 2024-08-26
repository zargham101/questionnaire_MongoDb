const Questionnaire = require('../models/questionnaire');
const User = require('../models/user');

module.exports = {
    Create: async (req, res) => {
        try {

            const userId = req.user._id;


            const newQuestionnaire = new Questionnaire({
                text: req.body.text,
                options: req.body.options,
                createdBy: userId
            });

            await newQuestionnaire.save();

            res.status(201).json({
                success: true,
                message: "Questionnaire created successfully",
                questionnaire: newQuestionnaire
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    List: async (req, res) => {
        try {
            const questionnaires = await Questionnaire.find().populate('createdBy', 'userName email');
            res.status(200).json({ success: true, questionnaires });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    Read: async (req, res) => {
        try {
            const questionnaire = await Questionnaire.findById(req.params.id).populate('createdBy', 'userName email');
            if (!questionnaire) {
                return res.status(404).json({ success: false, message: 'Questionnaire not found' });
            }
            res.status(200).json({ success: true, questionnaire });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    Update: async (req, res) => {
        try {
            const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, {
                text: req.body.text,
                options: req.body.options
            }, { new: true });

            if (!updatedQuestionnaire) {
                return res.status(404).json({ success: false, message: 'Questionnaire not found' });
            }

            res.status(200).json({
                success: true,
                message: "Questionnaire updated successfully",
                questionnaire: updatedQuestionnaire
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    Delete: async (req, res) => {
        try {
            const deletedQuestionnaire = await Questionnaire.findByIdAndDelete(req.params.id);
            if (!deletedQuestionnaire) {
                return res.status(404).json({ success: false, message: 'Questionnaire not found' });
            }
            res.status(200).json({ success: true, message: "Questionnaire deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}