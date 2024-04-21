import Image from 'next/image'

const Loader = ({wid=30, hei=30}) => {
  return (
    <Image src={'/loader.svg'} width={wid} height={hei} alt='loader...' />
  )
}

export default Loader