import dbConnect from 'utils/mongoose'
import Task from 'models/Task'
dbConnect()
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
    body
  } = req
  switch (method) {
    case 'GET':
      try {
        const taskFinded = await Task.findById(id)
        if (!taskFinded) return res.status(404).json({ msg: 'Task not found' })
        return res.status(200).json(taskFinded)
      } catch (error) {
        res.status(500).json({ mes: error.message })
      }
    case 'PUT':
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body, {
          new: true
        })
        if (!updatedTask) res.status(404).json({ msg: 'Task not found' })
        return res.status(200).json(updatedTask)
      } catch (error) {
        res.status(500).json({ mes: error.message })
      }
    case 'DELETE':
      try {
        const taskDeleted = await Task.findByIdAndDelete(id)
        if (!taskDeleted) res.status(404).json({ msg: 'Task not found' })
        return res.status(204).json({ taskDeleted })
      } catch (error) {
        res.status(500).json({ mes: error.message })
      }
    default:
      return res.status(400).json({ msg: 'Method not supported' })
  }
}
