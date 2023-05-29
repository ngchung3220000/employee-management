import React from 'react'
import MaterialTable from 'material-table';

function Diploma() {
    return (
        <>
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
        </>
    )
}

export default Diploma