import React, {MouseEvent, ReactNode, useState} from "react";


interface Props {
    children: ReactNode;
    groupValue: string;
    error: boolean;
    required: boolean;
}

const ParamAccordionSwagger = ({
                                   children,
                                   groupValue,
                                   error,
                                   required,
                               }: Props) => {

    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setVisible((prev) => !prev)
    }

    return (
        <>
            <tr>
                <th>
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            color: error ? '#f93e3e' : 'inherit',
                            paddingTop: '10px',
                        }}
                    >
                        <div
                            style={{fontSize: '20px'}}
                            className={required ? 'parameter__name required' : 'parameter__name'}
                        >
                            {groupValue} {!required ? null : <span>&nbsp;*</span>}
                        </div>

                        <button
                            className={`btn ${error ? 'invalid' : ''}`}
                            onClick={toggleVisible}
                        >
                            {visible ? 'hide' : 'show'}
                        </button>
                    </div>
                </th>
            </tr>

            {visible && children}
        </>
    )
}

export default ParamAccordionSwagger
