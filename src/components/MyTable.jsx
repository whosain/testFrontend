import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MyTable({ rows, actionDelete, actionEdit, actionModal }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Location Code</TableCell>
                        <TableCell>Location Name</TableCell>
                        <TableCell align="center">Location Type</TableCell>
                        <TableCell align="center">ActionsDelete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row,i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.locCode}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.locName}
                            </TableCell>
                            <TableCell align="center">{row.locType}</TableCell>
                            <TableCell align="center">
                                <Button 
                                    onClick={()=> {
                                        actionEdit(row.locName);
                                        actionModal()
                                    }}
                                >
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Button>
                                {' '}
                                <Button
                                    onClick={()=> actionDelete(row.locName)}
                                >
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
