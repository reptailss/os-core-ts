import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import React, {ReactNode} from 'react'
import sx from './sx'

interface Props {
    steps: {
        anchor?: string | null
        title: string | ReactNode
        subtitle?: string | ReactNode
        children?: string | ReactNode
    }[],
    anchor?: string | null
}

const StepperView = ({
                         steps,
                         anchor,
                     }: Props) => {
    return (
        <Stepper
            id={anchor || ''}
            orientation="vertical"
        >
            {steps?.map((step, index) => (
                <Step
                    active
                    key={index}
                    id={step.anchor || ''}
                >
                    <StepLabel
                        optional={
                            step?.subtitle ?
                                typeof step.subtitle === 'string' ?
                                    <Typography
                                        variant="caption"
                                        dangerouslySetInnerHTML={{
                                            __html: step.subtitle,
                                        }}
                                    /> : step.subtitle
                                : null
                        }
                    >
                        {typeof step.title === 'string' ?
                            <Typography
                                variant={'body1'}
                                sx={sx.title}
                            >
                                {step.title}
                            </Typography> : step.title}
                    </StepLabel>
                    
                    {step.children && <StepContent>
                        {typeof step.children === 'string' ?
                            <Typography
                            
                            >
                                {step.children}
                            </Typography>
                            : step.children}

                    </StepContent>}
                </Step>
            ))}
        </Stepper>
    )
}

export default StepperView
