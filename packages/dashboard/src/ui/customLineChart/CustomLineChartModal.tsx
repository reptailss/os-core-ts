import React from 'react';
import {Button, IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomLineChart from "@ui/customLineChart/CustomLineChart";
import {sx} from './sx'
import {GroupRow} from "@containers/groups/types";
import {LineChartColumn} from "@ui/customLineChart/types";

interface Props<Row extends { date: Date }> {
    initialColumns: LineChartColumn<Row>[],
    data: GroupRow<Row>[]
}

function CustomLineChartModal<Row extends { date: Date }>({
                                                              initialColumns,
                                                              data,
                                                          }: Props<Row>) {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
            >
                Графіки
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                sx={sx.rootModal}
            >
                <Paper
                    sx={sx.contentModal}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={sx.closeModal}
                    >
                        <CloseIcon/>
                    </IconButton>

                    {open && <CustomLineChart
                        data={data}
                        initialColumns={initialColumns}
                    />}
                </Paper>
            </Modal>
        </>
    );
};

export default CustomLineChartModal;