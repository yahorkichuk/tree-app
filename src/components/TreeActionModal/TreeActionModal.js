import React from 'react';
import {
    Dialog,
    TextField,
    Typography,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box
} from '@mui/material';

const modalText = {
    add: {
        title: 'Add',
        button: 'Add',
        prompt: null,
        buttonColor: 'primary',
    },
    edit: {
        title: 'Edit',
        button: 'Save',
        prompt: null,
        buttonColor: 'primary',
    },
    delete: {
        title: 'Delete',
        button: 'Delete',
        prompt: (nodeName) => `Do you want to delete "${nodeName}"?`,
        buttonColor: 'error',
    },
};

const TreeActionModal = ({open, handleClose, handleAction, modalType, nodeName, setNodeName, errorMessage}) => {
    const settings = modalText[modalType] || {};

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"md"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{m: 0, p: 2}}>{settings.title}</DialogTitle>

            <DialogContent id="alert-dialog-title">
                <Box pt={1}>
                    {(modalType === 'add' || modalType === 'edit') && (
                        <TextField
                            label="Имя узла"
                            value={nodeName}
                            onChange={(e) => setNodeName(e.target.value)}
                            fullWidth
                        />
                    )}
                    {errorMessage ? (
                        <Typography color="error" variant="body1" sx={{mt: 1}}>
                            {errorMessage}
                        </Typography>
                    ) : (
                        settings.prompt ? (
                            <Typography variant="body1">{settings.prompt(nodeName)}</Typography>
                        ) : null
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{m: 0, p: 2}}>
                <Button variant="outlined" color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                {!errorMessage && (
                    <Button variant="contained" color={settings.buttonColor} onClick={handleAction}>
                        {settings.button}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default TreeActionModal;
