import {
  Menu,
  Container,
  Button,
  MenuItem,
  Input,
  activeItem
} from 'semantic-ui-react'
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()
  return (
    <Menu style={{ background: '#020220' }} attached stackable>
      <Container>
        <Menu.Item>
          <Link href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png"
              alt="NextJs"
              style={{ filter: 'invert(100%)', width :"8%" }}
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <Button
              primary
              size="mini"
              onClick={() => router.push('/tasks/new')}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
