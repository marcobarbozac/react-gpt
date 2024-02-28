
interface Props {
    text: string;
}


export const MyMessage = ( { text }: Props) => {

    
  return (
    
    <div className="col-start-6 col-end-13 p-3 rouded-lg">
        <div className="flex flex-row-reverse justify-start items-start">
            <div className="flex items-center justify-center h-10 w-10 bg-indigo-500 rounded-full flex-shrink-0">
                F
            </div>

            <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
                <div>{ text }</div>
            </div>
        </div>
    </div>
  )
}
