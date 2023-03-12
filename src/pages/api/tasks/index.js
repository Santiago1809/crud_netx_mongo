import dbConnect from 'utils/mongoose'
import Task from 'models/Task.js'

dbConnect()

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
        break
      } catch (error) {
        return res
          .status(500)
          .json({ msg: error.message })
      }
    case 'POST':
      try {
        const newTask = new Task(body)
        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
      } catch (error) {
        return res.status(500).json({ msg: error.message })
      }
    default:
      return res.status(404).json({ msg: 'this method is not supported' })
      break
  }

  console.log(req.method, req.url)
}
