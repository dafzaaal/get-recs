export default function VideoComponent({rec, videoURL}: any) {
    return (
        <div className='flex flex-row border rounded-md border-black p-3 font-consolas font-medium mt-5 text-lg hover:shadow-2xl'>
            <img src={rec["thumbnail"]} className='w-[250px] h-[160px]'></img>
            <div className='ml-5'>
                <a href={videoURL + rec["videoId"]} target='_blank' className='hover:cursor-pointer'>
                    {rec["title"]}
                </a>
                <p className='font-light mt-2'>
                    {rec["desc"]}
                </p>
                <p className='font-bold mt-2'>
                    {rec["channelName"]}
                </p>
            </div>
        </div>
    )
}