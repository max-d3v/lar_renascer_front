interface buttonProps {
    name: string;
    title: string;
    onClick?: () => void;
    customCss?: string;
    customCssDiv?: string;
    size?: string;
    form?: string;
    type?: "submit" | "reset" | "button" | undefined;
}

export function Button({name, title, onClick, customCss, size, type, form, customCssDiv}: buttonProps) {
    return (
        <div className={` ${customCssDiv} ${size} w-full flex justify-center`} >
            <button form={form} name={name} onClick={onClick} type={ type ? type : 'button' } className={` ${customCss} hover:scale-105 text-lg bg-custom-dark-pink w-full py-2 rounded-md text-white font-semibold hover:shadow-md transition-all duration-300`}>    
                {title}
            </button>
        </div>
    )
}