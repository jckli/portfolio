import Link from "next/link";

export const QA = (props: any) => {
    return (
        <>
            <div className={`text-text-color bg-[#1a202c] rounded-lg min-h-[13rem] ${props.cols}`}>
                <div className="px-5 py-5 h-full flex flex-col justify-center">
                    <h1 className="font-bold text-[14px] sm:text-lg">{props.question}</h1>
                    {props.customAnswer ? (
                        props.customAnswer
                    ) : (
                        <p className="mt-2 text-text-darker font-metropolis">{props.answer}</p>
                    )}
                </div>
            </div>
        </>
    );
};
