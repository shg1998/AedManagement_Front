import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Button, DialogContentText, InputLabel, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import React from "react";

interface SaveSearchModalProps {
    openSaveSearchModal: boolean,
    handleSaveAdvanceSearch: any,
    handleCloseSaveSearch: any,
    setTitle: any
}
const SaveSearchModal:React.FC<SaveSearchModalProps> = ({openSaveSearchModal , handleSaveAdvanceSearch , handleCloseSaveSearch , setTitle}) => {

    return(
        <Dialog open={openSaveSearchModal} onClose={handleCloseSaveSearch}>
            <DialogTitle>ذخیره فیلتر</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    در صورت انتخاب گزینه ذخیره، فیلتر جستجو شده توسط شما ذخیره خواهد شد و قابلیت استفاده مجدد را خواهد داشت.
                </DialogContentText>
                <InputLabel sx={{margin:'1rem 0 0.5rem'}} htmlFor={'title'}>عنوان</InputLabel>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label=""
                    type="text"
                    fullWidth
                    sx={{direction:'rtl',textAlign:'right' , marginTop: 0}}
                    onChange={(event)=>setTitle(event?.target?.value ?? '')}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSaveSearch}>انصراف</Button>
                <Button color={'primary'} variant={'contained'} onClick={handleSaveAdvanceSearch}>ذخیره</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SaveSearchModal;