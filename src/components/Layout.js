import Navbar from 'components/Navbar'

export const LayoutComponent = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
