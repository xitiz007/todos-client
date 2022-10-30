import Image from 'next/image'

interface Props {}

const Empty: React.FC<Props> = ({}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative">
        <Image
          src="/icons/blank.png"
          className=""
          alt="icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className='text-lg md:text-xl font-semibold tracking-wide'>You have no todos</p>
    </div>
  );
}

export default Empty