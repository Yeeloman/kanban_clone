import React from 'react'


type BoardTemplateProps = {
    name : string,
    isActive : boolean
}
export default function BoardTemplate({ name, isActive } : BoardTemplateProps) {
    const nonActive = ""
    return (
            <div className='w-full flex jstify-start cursor-pointer'>
                <div className={`w-[90%] h-[50px] 
                ${isActive ? 'bg-purple text-whiteprime': 'text-grayy hover:bg-lightpurple hover:text-purple dark:hover:bg-whiteprime'}
                flex flex-row transition ease-in delay-100 
                justify-start items-center space-x-4 rounded-r-full `}>
                    <div className='ml-5 h-full w-full flex flex-row items-center'>
                        <BoardLogo/>
                        <p className='font-semibold ml-2'>
                            {name}
                        </p>
                    </div>
                </div>
            </div>
    )
}

function BoardLogo(){
    return(
        <svg className='' width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path className='bg-purple' d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
    )
}