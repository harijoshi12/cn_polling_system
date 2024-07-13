import Option from "../models/Option.js";
import Question from "../models/Question.js";
import ApiError from "../utils/apiError.js";

/**
 * Delete an option
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteOption = async (req, res, next) => {
  try {
    const option = await Option.findById(req.params.id);
    if (!option) {
      return next(new ApiError("Option not found", 404));
    }

    if (option.votes > 0) {
      return next(new ApiError("Cannot delete option with votes", 400));
    }

    // Remove the option from the associated question
    await Question.findByIdAndUpdate(option.question, {
      $pull: { options: option._id },
    });

    // Delete the option
    await Option.findByIdAndDelete(option._id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

/**
 * Add a vote to an option
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addVote = async (req, res, next) => {
  try {
    const option = await Option.findById(req.params.id);
    if (!option) {
      return next(new ApiError("Option not found", 404));
    }

    option.votes += 1;
    await option.save();

    res.status(200).json({
      status: "success",
      data: { option },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};
