import React, { useState } from 'react'
import {
    Grid,
    // CustomAvatar,
    Typography,
    Box,
    Icon,
    TextField,
    Button,
    Input,
    MenuItem,
    InputAdornment,
    Avatar,
} from '@material-ui/core'
import MaterialTable from 'material-table'
function Resume(props) {
    const { formEmployee, setFormEmployee } = props.props;

    return (
        <Grid container spacing={2}>
            <Grid item container direction='column' alignItems='center'>
                <Grid item>
                    <Typography variant="h5">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Độc lập - Tự do - Hạnh phúc </Typography>
                </Grid>
                <Grid item>
                    <Typography>-------------------------------------</Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={14} padding={4} alignItems={"center"}>
                <Grid item xs={5} textAlign="center">
                    <Avatar
                        src={formEmployee?.resume.photoUrl}
                        style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            marginBottom: "20px",
                        }}
                    />
                </Grid>
                <Grid item xs={7} textAlign='center'>
                    <Typography variant="h5" textAlign='center'>SƠ YẾU LÝ LỊCH</Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={4}>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" paddingBottom={1}>
                            I. BẢN THÂN
                        </Typography>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={8}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={
                                    <InputAdornment position="start">1. Họ và tên:</InputAdornment>
                                }
                                name="fullName"
                                value={formEmployee?.resume.fullName}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Giới tính:</InputAdornment>,
                                }}
                                fullWidth
                                select
                                variant="standard"
                                name="gender"
                                values={formEmployee?.resume.abc}
                                onChange={(event) => {
                                }}
                            >
                                {[].map((item) => (
                                    <MenuItem key={item.id} value={item.gender}>
                                        {item.gender}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            type="date"
                            id="standard-adornment-amount"
                            fullWidth
                            startAdornment={<InputAdornment position="start">2. Sinh ngày:</InputAdornment>}
                            name="dateOfBirth"
                            values={formEmployee?.resume.dateOfBirth}
                            onChange={(event) => {
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            id="standard-adornment-amount"
                            fullWidth
                            startAdornment={<InputAdornment position="start">3. Chỗ ở hiện nay:</InputAdornment>}
                            name="address"
                            values={formEmployee?.resume.address}
                            onChange={(event) => {
                            }}
                        />
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">4. Điện thoại:</InputAdornment>}
                                name="phone"
                                values={formEmployee?.resume.phone}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">Email:</InputAdornment>}
                                name="email"
                                values={formEmployee?.resume.email}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">5. Dân tộc:</InputAdornment>}
                                name="ethnicity"
                                values={formEmployee?.resume.ethnicity}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">Tôn giáo:</InputAdornment>}
                                name="religion"
                                values={formEmployee?.resume.religion}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Input
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">6. Số CCCD:</InputAdornment>}
                                name="citizenId"
                                values={formEmployee?.resume.citizenId}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                type="date"
                                id="standard-adornment-amount"
                                fullWidth
                                startAdornment={<InputAdornment position="start">Cấp ngày:</InputAdornment>}
                                name="citizenIdIssuanceDate"
                                values={formEmployee?.resume.citizenIdIssuanceDate}
                                onChange={(event) => {
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Nơi cấp:</InputAdornment>,
                                // readOnly: status,
                            }}
                            fullWidth
                            variant="standard"
                            name='citizenIdIssuingAuthority'
                            value={formEmployee?.resume.citizenIdIssuingAuthority}
                            onChange={(event) => {
                            }}
                        >
                            {[].map((item) => (
                                <MenuItem key={item.id} value={item.place}>
                                    {item.place}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Typography variant="h5" paddingBottom={2}>
                            II. QUAN HỆ GIA ĐÌNH
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            options={{
                                rowStyle: (rowData, index) => {
                                    return {
                                        backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                                        height: "48px",
                                    };
                                },
                                paging: false,
                                exportButton: true,
                                exportAllData: true,
                                maxBodyHeight: "500px",
                                minBodyHeight: "370px",
                                headerStyle: {
                                    // backgroundColor: "#000",
                                    backgroundColor: "#262e49",
                                    color: "#000",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Resume