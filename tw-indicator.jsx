export const TailwindIndicator = () => {
    if (process.env.NODE_ENV === 'production'){
        return null;
    }
    return(
        <div className="
        fixed bottom-4  right-4
        bg-gray-100 text-gray-900
        dark:bg-gray-800 dark:text-gray-700
        border border-gray-300 dark:border-gray-700
        px-3 py-1 rounded text-sm z-50 shadow-md
        ">
            <span className="sm:hidden">default</span>
            <span className="hidden sm:inline md:hidden">sm</span>
            <span className="hidden md:inline lg:hidden">md</span>
            <span className="hidden lg:inline xl:hidden">lg</span>
            <span className="hidden xl:inline">xl</span>

        </div>
    )
}