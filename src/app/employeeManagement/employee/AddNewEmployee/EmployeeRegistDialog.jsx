import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core'
import RegistForm from 'app/employeeManagement/components/RegistForm/RegistForm';
import { getFormEmployeeRequested } from 'app/employeeManagement/redux/actions/EmployeeAction';

import { useSelector, useDispatch } from 'react-redux'

export default function EmployeeRegistDialog() {

    const dispatch = useDispatch();
    const employeeInfo = useSelector(state => state.employee.employee);
    // console.log(employeeInfo);
    useEffect(() => {
        dispatch()
    }, [])


    return (
        <Dialog open={true} onClose={() => { }}
            aria-labelledby="form-dialog-title"
            maxWidth='xl    '
            fullWidth
        >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent
                style={{ height: '800px' }}

            >
                <RegistForm
                    employeeInfo={employeeInfo}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }} color="secondary" variant='contained'>
                    Lưu
                </Button>
                <Button onClick={() => { }} color="primary" variant='contained'>
                    Gửi lãnh đạo
                </Button>
                <Button onClick={() => { }} color="error" variant='contained'>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}
