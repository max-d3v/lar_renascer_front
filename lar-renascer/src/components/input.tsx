interface inputProps {
    errors?: string;
    name: string;
    placeholder: string;
    title: string;
    customCss?: string;
    register: any;
    rules?: string;
    tipo?: string;
    valueHandler?: (e: any) => void;
}

export function  Input({name, customCss, rules, placeholder, title, register, errors, valueHandler, tipo = "text"}: inputProps) {
    return (
        <div className={`${customCss} w-full  `} >
            <label className=" text-white font-semibold " htmlFor={name}>{title} </label>
            <input  
                {
                    ...(valueHandler ?
                        (register ? register(name, { onChange: (e: any) => valueHandler(e) }) : '') :
                        (register ? register(name,  rules) : ''))
                }
                className=" w-full rounded-md outline-none border-none px-2 text-black py-2 text-md" 
                type={tipo}
                placeholder={placeholder}  
                name={name} />
            <p className=" font-semibold text-red-700" >{ errors }</p>
        </div>
    )
}