/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Grid } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function TaskFormPage() {
  const { query, push } = useRouter()
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors = validate()
    if (Object.keys(errors).length) return setErrors(errors)
    query.id ? await updateTask() : await createTask()
  }

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      push('/')
    } catch (error) {
      console.error(err)
    }
  }
  const createTask = async () => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      push('/')
    } catch (err) {
      console.error(err)
    }
  }

  const validate = () => {
    const errors = {}
    if (!newTask.title) errors.title = 'Title is required'
    if (!newTask.description) errors.description = 'Description is required'

    return errors
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const getTask = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`)
    const data = await res.json()
    setNewTask({ title: data.title, description: data.description })
  }

  useEffect(() => {
    if (query.id) {
      getTask()
    }

  }, [])

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? 'Update task' : 'Create task'}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.title, pointing: 'below' }
                  : null
              }
              value={newTask.title}
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              style={{ resize: 'none' }}
              name="description"
              onChange={handleChange}
              error={
                errors.description
                  ? { content: errors.description, pointing: 'below' }
                  : null
              }
              value={newTask.description}
            />
            <Button circular primary>
              {query.id ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
