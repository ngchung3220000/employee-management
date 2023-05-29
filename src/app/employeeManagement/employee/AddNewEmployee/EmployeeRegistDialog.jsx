import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core'
import RegistForm from 'app/employeeManagement/components/RegistForm/RegistForm';

import { useSelector, useDispatch } from 'react-redux'

export default function EmployeeRegistDialog(props) {

    const dispatch = useDispatch();
    const { closeRegistDialog } = props;
    const [formEmployee, setFormEmployee] = useState({})

    const formData = useSelector(state => state.employee.formEmployee);
    useEffect(() => {
        setFormEmployee(formData);
    }, [formData])
    //dispatch(addformemployee)

    const handleUpdateFormEmployee = () => {

    }


    return (
        <Dialog open={true} onClose={() => closeRegistDialog()}
            aria-labelledby="form-dialog-title"
            maxWidth='lg'
            fullWidth
        >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent
                style={{ height: '800px' }}

            >
                <RegistForm
                    formEmployee={formEmployee}
                    setFormEmployee={setFormEmployee}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleUpdateFormEmployee()} color="secondary" variant='contained'>
                    Lưu
                </Button>
                <Button onClick={() => { }} color="primary" variant='contained'>
                    Gửi lãnh đạo
                </Button>
                <Button onClick={() => closeRegistDialog()} color="error" variant='contained'>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}
