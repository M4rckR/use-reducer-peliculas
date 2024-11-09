type TrackerItemProps = {
    text: string,
    total: number
}

export const TrackerItem = ({text,total}:TrackerItemProps) => {
  return (
    <>  
        <div className="flex flex-col items-center text-white border-r pr-8">
            <p className="text-4xl">{total}</p>
            <p className="text-2xl font-bold">{text}</p>
        </div>
    </>
  )
}
