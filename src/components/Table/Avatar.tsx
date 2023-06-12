export function Avatar({ src, alt = "avatar" }:{src:string, alt?:string}) {
    return (
        <img src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" />
    );
}