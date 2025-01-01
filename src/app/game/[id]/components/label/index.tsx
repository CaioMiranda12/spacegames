


export function Label({ name }: { name: string}){
    return (
        <div className="text-white hover:font-bold duration-200 flex items-center justify-center flex-grow sm:flex-grow-0 bg-orange-500 rounded-lg px-3 py-1">
            {name}
        </div>
    )
}