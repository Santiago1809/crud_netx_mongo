import { connect, connection } from 'mongoose'

const con = {
  isConnected: false
}

export default async function dbConnect() {
  if (connect.isConnected) return
  const db = await connect(process.env.MONGODB_URL)
  con.isConnected = db.connections[0].readyState
  console.log(db.connection.db.databaseName)
}
connection.on('connected', () => {
  console.log('MongoDB is connected')
})
connection.on('error', (err) => {
  console.error(err)
})
