const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body
    const newTask = new Task({ task, isCompleted })
    await newTask.save()
    res.status(200).json({ status: 'success', data: newTask })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v')
    res.status(200).json({ status: 'success', data: taskList })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

taskController.updateTask = async (req, res) => {
  try {
    const { params, body } = req
    const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true }).select('-__v')
    res.status(200).json({ status: 'success', data: updatedTask })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

taskController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id).select('-__v')
    res.status(200).json({ status: 'success', data: deletedTask })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = taskController
