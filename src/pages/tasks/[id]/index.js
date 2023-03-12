import Error from 'next/error'
import { Button, Confirm, Grid, Loader } from 'semantic-ui-react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function TaskDetail({ task, error }) {

  const router = useRouter()

  const [comfirm, setcomfirm] = useState(false)
  const [Load, setLoad] = useState(false)

  const open = () =>{setcomfirm(true)} 
  const close = () =>{setcomfirm(false)} 

  const deleteTask = async()=>{
    const {id} = router.query
    try {
      const deleted = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = () =>{
    setLoad(true)
    deleteTask()
    close()
    alert("Task has been deleted")
    router.push("/")
  }

  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.Text} />
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={1}
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>{task.title}</h1>
          <small>{task.description}</small>
          <div>
            <Button Delete color="red" onClick={open} loading={Load}>
              Delete task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm 
      header="Please think about it"
      content="Are you sure to delete this task?"
      open={comfirm} onConfirm={handleDelete} onCancel={close}>

      </Confirm>
    </Grid>
  )
}
export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`)

  if (res.status === 200) {
    const task = await res.json()
    return {
      props: {
        task
      }
    }
  }

  console.log(id)
  return {
    props: {
      error: {
        statusCode: res.status,
        Text: 'Invalid Id'
      }
    }
  }
}
