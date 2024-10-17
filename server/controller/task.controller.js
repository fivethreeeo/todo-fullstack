const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body
    const newTask = new Task({ task, isCompleted })
    await newTask.save()
    res.status(200).json({ status: 'ok', data: newTask })
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err })
  }
}

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v')
    res.status(200).json({ status: 'ok', data: taskList })
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err })
  }
}

taskController.updateTask = async (req, res) => {
  try {
    const { params, body } = req
    const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true }).select('-__v')
    res.status(200).json({ status: 'ok', data: updatedTask })
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err })
  }
}

taskController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id).select('-__v')
    res.status(200).json({ status: 'ok', data: deletedTask })
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err })
  }
}

module.exports = taskController
