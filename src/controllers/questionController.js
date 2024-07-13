import Question from "../models/Question.js";
import Option from "../models/Option.js";
import ApiError from "../utils/apiError.js";

/**
 * Create a new question
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const createQuestion = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Validate input
    if (!title || title.trim() === "") {
      return next(new ApiError("Question title is required", 400));
    }

    // Create new question
    const question = await Question.create({ title });

    res.status(201).json({
      status: "success",
      data: { question },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

/**
 * Get a question by ID with its options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getQuestion = async (req, res, next) => {
  try {
    // Find question and populate its options
    const question = await Question.findById(req.params.id).populate("options");

    if (!question) {
      return next(new ApiError("Question not found", 404));
    }

    // Construct base URL for vote links
    const baseUrl = `${req.protocol}://${req.get("host")}${
      process.env.API_PREFIX
    }`;

    // Format question data
    const formattedQuestion = {
      id: question._id,
      title: question.title,
      options: question.options.map((option) => ({
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: `${baseUrl}/options/${option._id}/add_vote`,
      })),
    };

    res.status(200).json(formattedQuestion);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

/**
 * Delete a question
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new ApiError("Question not found", 404));
    }

    // Check if any options have votes
    const options = await Option.find({ _id: { $in: question.options } });
    const hasVotes = options.some((option) => option.votes > 0);

    if (hasVotes) {
      return next(new ApiError("Cannot delete question with votes", 400));
    }

    // Delete associated options
    await Option.deleteMany({ _id: { $in: question.options } });

    // Delete the question
    await question.remove();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

/**
 * Add an option to a question
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addOption = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new ApiError("Question not found", 404));
    }

    const { text } = req.body;

    // Validate input
    if (!text || text.trim() === "") {
      return next(new ApiError("Option text is required", 400));
    }

    // Create new option
    const option = await Option.create({ text, question: question._id });

    // Add option to question
    question.options.push(option._id);
    await question.save();

    res.status(201).json({
      status: "success",
      data: { option },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};
