import { acolhida } from "../pages/acolhidas"


export function Acolhida({nome}: acolhida) {
    return (
        <div className="w-full customHeight flex border">
            {nome}
        </div>
    )
}