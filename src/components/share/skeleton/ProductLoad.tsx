

const ProductLoad = () => {

    return (
        <div className="animate-pulse w-full">
            <div className="md:flex bg-white py-4">
                <div className="relative md:w-4/12 mx-3 mb-3 max-w-md:max-w-[400px]">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="flex mt-4 gap-3">
                        <span className="h-14 w-1/5 bg-gray-200"></span>
                        <span className="h-14 w-1/5 bg-gray-200"></span>
                        <span className="h-14 w-1/5 bg-gray-200"></span>
                        <span className="h-14 w-1/5 bg-gray-200"></span>
                        <span className="h-14 w-1/5 bg-gray-200"></span>
                    </div>
                </div>
                <div className="relative md:w-8/12 mx-3 mb-3 flex flex-col">
                    <div className="h-20 w-full mb-5 bg-gray-200"></div>
                    <div className="h-7 w-full mb-5 bg-gray-200"></div>
                    <div className="flex flex-wrap mb-7">
                        <span className="h-7 w-1/4 mr-3 bg-gray-200"></span>
                        <span className="h-7 w-1/4 mr-3 bg-gray-200"></span>
                        <span className="h-7 w-1/4 mr-3 bg-gray-200"></span>
                    </div>
                    <div className="h-7 w-full mb-5 bg-gray-200"></div>
                    <div className="h-7 w-full mb-5 bg-gray-200 flex-1"></div>

                    <div className="flex gap-3 mb-7">
                        <span className="h-16 w-1/2 bg-gray-200"></span>
                        <span className="h-16 w-1/2 bg-gray-200"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductLoad;