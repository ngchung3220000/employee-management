import React, { useState, useEffect } from 'react'
import {
    Grid,
    Avatar,
    TextField,
    Typography,
    styled,
    IconButton, Icon
} from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange';
import "./Profile.css"

const MyTitle = styled(Typography)({
    color: 'inherit',
    fontSize: '1.5em',
    marginBottom: '0.5em'
})

function Profile(props) {
    const { cvData, setCvData, employeeInfo } = props;

    useEffect(() => {

    }, [])

    const handleIncrementWorkExperiences = () => {
        let newArray = [...(cvData?.workExperiances || []), {
            company: null,
            position: null,
            details: null,
            startDate: null,
            endDate: null
        }]
        setCvData({
            ...cvData,
            workExperiances: newArray
        })
    }

    const handleDecrementWorkExperiences = (index) => {
        // debugger
        cvData.workExperiances.splice(index, 1);
        // console.log(newArray, cvData.workExperiances);
        setCvData({
            ...cvData,
            workExperiances: cvData.workExperiances
        })
    }

    const handleChangeInput = (e, index) => {
        // debugger
        // console.log(index);
        if (typeof (index) === 'number') {
            let newArray = cvData.workExperiances;
            newArray[index][e.target.name] = e.target.value;
            console.log(newArray[index][e.target.name]);
            setCvData({
                ...cvData,
                workExperiances: newArray
            })
        } else {
            setCvData({
                ...cvData,
                [e.target.name]: e.target.value
            })
        }
    }

    return (
        <Grid container xs={12} spacing={3} justifyContent='space-between'>
            <Grid item container xs={4} direction='column' style={{ backgroundColor: '#2b324c', color: '#fff' }} spacing={3}>
                <Grid item container justifyContent='center'>
                    <Avatar
                        src={employeeInfo.photoUrl}
                        style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            marginBottom: "20px",
                        }}
                    />
                </Grid>

                <Grid item>
                    <MyTitle>THÔNG TIN CÁ NHÂN</MyTitle>
                    <Grid container spacing={2}>
                        <Grid item container justifyContent='flex-end'>
                            <Grid item xs={2}> <PersonIcon /> </Grid>
                            <Grid item xs={9}>{employeeInfo.fullName}</Grid>
                        </Grid>
                        <Grid item container justifyContent='flex-end'>
                            <Grid item xs={2}> <DateRangeIcon /> </Grid>
                            <Grid item xs={9}>{employeeInfo.dateOfBirth}</Grid>
                        </Grid>
                        <Grid item container justifyContent='flex-end'>
                            <Grid item xs={2}> <MailIcon /> </Grid>
                            <Grid item xs={9}>{employeeInfo.email}</Grid>
                        </Grid>
                        <Grid item container justifyContent='flex-end'>
                            <Grid item xs={2}> <PhoneIcon /> </Grid>
                            <Grid item xs={9}>{employeeInfo.phone}</Grid>
                        </Grid>
                        <Grid item container justifyContent='flex-end'>
                            <Grid item xs={2}> <RoomIcon /> </Grid>
                            <Grid item xs={9}>{employeeInfo.address}</Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container>
                    <MyTitle>KỸ NĂNG</MyTitle>

                    <TextField
                        className='darkTextField'
                        fullWidth
                        multiline
                        value={cvData?.skill || ''}
                        name='skill'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </Grid>

                <Grid item container>
                    <MyTitle>SỞ THÍCH</MyTitle>

                    <TextField
                        className='darkTextField'
                        fullWidth
                        multiline
                        value={cvData?.hobby || ''}
                        name='hobby'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </Grid>
            </Grid>
            <Grid item container xs={8} spacing={4} direction='column'>
                <Grid item>
                    <MyTitle>MỤC TIÊU</MyTitle>
                    <TextField
                        fullWidth
                        multiline
                        value={cvData?.careerGoal || ''}
                        name='careerGoal'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </Grid>
                <Grid item container direction='column' >
                    <MyTitle>KINH NGHIỆM LÀM VIỆC</MyTitle>
                    {
                        (cvData?.workExperiances || []).map((element, index) => {
                            return <Grid item container style={{ border: '1px dashed #ccc', padding: '10px', margin: '10px 0', position: 'relative' }}>
                                <IconButton
                                    style={{
                                        position: 'absolute',
                                        bottom: '-0.6em',
                                        right: '-1.6em'
                                    }}
                                    onClick={() => handleDecrementWorkExperiences(index)}
                                >
                                    <Icon color='error'>remove_circle</Icon>
                                </IconButton>
                                <Grid item container spacing={3} justifyContent='flex-end'>
                                    <Grid item>
                                        <label>Từ: &nbsp;</label>
                                        <TextField type='date' variant='standard' size='small' />
                                    </Grid>
                                    <Grid item>
                                        <label>Đến: &nbsp;</label>
                                        <TextField type='date' variant='standard' size='small' />
                                    </Grid>
                                </Grid>
                                <Grid item container direction='column' spacing={2}>
                                    <Grid item>
                                        <label>Công ty: </label>
                                        <TextField fullWidth multiline size='small'
                                            value={element?.company || ''}
                                            name="company"
                                            onChange={(e) => handleChangeInput(e, index)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <label>Vị trí công việc: </label>
                                        <TextField fullWidth multiline size='small'
                                            value={element?.position || ''}
                                            name="position"
                                            onChange={(e) => handleChangeInput(e, index)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <label>Chi tiết: </label>
                                        <TextField fullWidth multiline size='small'
                                            value={element?.details || ''}
                                            name="details"
                                            onChange={(e) => handleChangeInput(e, index)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        })
                    }
                    <IconButton onClick={() => handleIncrementWorkExperiences()}>
                        <Icon>add</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile