'use client'
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"

export function Input(){
    const [input, setInput] = useState('')
    const router = useRouter()

    function handleButton(event: FormEvent){
        event.preventDefault();

        if(input === '') return;

        router.push(`/game/search/${input}`)
    }

    return (
        <form 
        className="my-5 w-full bg-white flex gap-2 justify-between items-center p-2 rounded-lg"
        onSubmit={handleButton}
        >
            <input
                type="text"
                placeholder="Está procurando algum jogo?..."
                className="outline-none w-11/12 bg-white"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />

            <button type="submit">
                <FiSearch size={24} color="orange" />
            </button>
        </form>
    )
}